import test, { expect } from "@playwright/test";
import { glob } from "tinyglobby";
import { joinURL, withoutTrailingSlash } from "ufo";

const pages = await glob("src/**/*.md");

pages.forEach((page) => {
  const link = page.replace("src", "").replace(".md", "").replace("index", "");

  test(`should have metadata (${page})`, async ({ page, request }) => {
    // Arrange

    // Act
    await page.goto(link);

    // Assert
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.endsWith(" | Garabit")).toBeTruthy();

    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    expect(ogTitle).toBeTruthy();
    const twitterTitle = await page
      .locator('meta[name="twitter:title"]')
      .getAttribute("content");
    expect(twitterTitle).toBeTruthy();

    expect(title.startsWith(ogTitle!)).toBeTruthy();
    expect(ogTitle).toBe(twitterTitle);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toBeTruthy();
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    expect(ogDescription).toBeTruthy();
    const twitterDescription = await page
      .locator('meta[name="twitter:description"]')
      .getAttribute("content");
    expect(twitterDescription).toBeTruthy();

    expect(description).toBe(ogDescription);
    expect(description).toBe(twitterDescription);

    const twitterSite = await page
      .locator('meta[name="twitter:site"]')
      .getAttribute("content");
    expect(twitterSite).toBe("@soubiran_");
    const twitterCard = await page
      .locator('meta[name="twitter:card"]')
      .getAttribute("content");
    expect(twitterCard).toBe("summary_large_image");

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toBe(
      withoutTrailingSlash(joinURL("https://garabit.barbapapazes.dev", link)),
    );

    const ogMetaTags = [
      { name: "og:image:width", value: "1200" },
      { name: "og:image:height", value: "630" },
      { name: "og:image:type", value: "image/png" },
      { name: "og:site_name", value: "Garabit" },
      { name: "og:type", value: "website" },
      { name: "og:url", value: "https://garabit.barbapapazes.dev" },
    ];

    for (const { name, value } of ogMetaTags) {
      const metaTag = await page
        .locator(`meta[property="${name}"]`)
        .getAttribute("content");
      expect(metaTag).toBe(value);
    }

    const url = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(url).toBeTruthy();

    const image = await request.get(
      url!.replace("https://garabit.barbapapazes.dev", "http://localhost:4173"),
    );
    expect(image.ok()).toBeTruthy();
    expect(image.headers()["content-type"]).toBe("image/png");
  });
});
