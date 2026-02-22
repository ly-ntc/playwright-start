import {Page, expect} from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async waitForUrlContains(text: string) {
        await expect(this.page).toHaveURL(new RegExp(text));
    }

    async verifyTextVisible(text: string) {
        await expect(this.page.locator(`text=${text}`)).toBeVisible();
    }
}