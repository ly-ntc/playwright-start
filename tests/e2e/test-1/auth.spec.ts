import {test as setup, expect} from '@playwright/test';

setup("Create customer 01 auth", async({page, context}) => {
    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01";
    const customer01AuthFile = ".auth/customer-01.json";

    await page.goto("https://practicesoftwaretesting.com/auth/login");

    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('[data-test="login-submit"]').click();

    await expect(page.locator('#menu')).toContainText("Jane Doe");
    await context.storageState({path: customer01AuthFile});
})