import { expect, test } from "@playwright/test";

test("should have a link to the homepage", async ({ page }) => {
  // Arrange

  // Act
  await page.goto("/");

  // Assert
  const headerHomeLink = page
    .getByRole("banner")
    .getByRole("link", { name: "Garabit", exact: true });

  await expect(headerHomeLink).toBeVisible();
  await expect(headerHomeLink).toHaveAttribute("href", "/");
});

test("should have a link to the blog", async ({ page }) => {
  // Arrange

  // Act
  await page.goto("/");

  // Assert
  const headerBlogLink = page
    .getByRole("banner")
    .getByRole("link", { name: "Blog", exact: true });

  await expect(headerBlogLink).toBeVisible();
  await expect(headerBlogLink).toHaveAttribute("href", "/blog");
});

test("should have a link to the projects", async ({ page }) => {
  // Arrange

  // Act
  await page.goto("/");

  // Assert
  const headerProjectsLink = page
    .getByRole("banner")
    .getByRole("link", { name: "Projects", exact: true });

  await expect(headerProjectsLink).toBeVisible();
  await expect(headerProjectsLink).toHaveAttribute("href", "/projects");
});
