import { test, expect } from '@playwright/test';
import path from 'path';

test.describe("Home page with no auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  })


  test("check sign in", async ({ page }) => {

    await expect(page.locator('[data-test="nav-sign-in"]')).toHaveText("Sign in");
  })

  test("validate page title", async ({ page }) => {
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
  })

  test("grid loads with 9 items", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);
  })

  test("search for Thor Hammer", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    const searchInput = page.locator('[data-test="search-query"]').fill("Thor Hammer");
    await page.locator('[data-test="search-submit"]').click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  })
})

test.describe("Home page with customer 01 auth", () => {
  test.use({
    storageState: path.resolve(__dirname, '../../../.auth/customer-01.json')
  });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  })

  test("check customer 01 sign in", async ({ page }) => {
    await expect(page.locator('[data-test="nav-sign-in"]')).not.toBeVisible();
    await expect(page.locator('#menu')).toContainText("Jane Doe");
  })
})