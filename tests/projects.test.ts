import { expect, test } from "@playwright/test";

test("should have a link to the homepage", async ({ page }) => {
  // Arrange

  // Act
  await page.goto("/projects");

  // Assert
  const headerHomeLink = page.getByRole("link", {
    name: "Back to Home",
    exact: true,
  });

  await expect(headerHomeLink).toBeVisible();
  await expect(headerHomeLink).toHaveAttribute("href", "/");
});
