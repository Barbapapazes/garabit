import { expect, test } from "@playwright/test";
import { glob } from "tinyglobby";

const posts = await glob("src/blog/*.md");

test.describe("index", () => {
  test("should have a link to the homepage", async ({ page }) => {
    // Arrange

    // Act
    await page.goto("/blog");

    // Assert
    const headerHomeLink = page.getByRole("link", {
      name: "Back to Home",
      exact: true,
    });

    await expect(headerHomeLink).toBeVisible();
    await expect(headerHomeLink).toHaveAttribute("href", "/");
  });
});

test.describe("show", () => {
  posts.forEach((post) => {
    const link = post.replace("src", "").replace(".md", "").replace(".md", "");

    test(`should have a link to the blog index (${post})`, async ({ page }) => {
      // Arrange

      // Act
      await page.goto(link);

      // Assert
      const headerBlogLink = page.getByRole("link", {
        name: "Back to Blog",
        exact: true,
      });

      await expect(headerBlogLink).toBeVisible();
      await expect(headerBlogLink).toHaveAttribute("href", "/blog");
    });
  });
});
