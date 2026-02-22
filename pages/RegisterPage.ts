import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
    private userNameInput = '#username';
    private passwordInput = '#password';
    private confirmPasswordInput = '#confirmPassword';
    private registerBtn = 'button[type="submit"]';
    private missingMessage = 'All fields are required.';

    constructor(page: Page) {
        super(page);
    }

    async goToRegisterPage() {
        await this.navigateTo('https://practice.expandtesting.com/register');
    }

    async enterUserName(username: string) {
        await this.page.fill(this.userNameInput, username);
    }

    async enterPassword(password: string) {
        await this.page.fill(this.passwordInput, password);
    }

    async enterConfirmPassword(confirmPassword: string) {
        await this.page.fill(this.confirmPasswordInput, confirmPassword);
    }

    async clickRegisterButton() {
        await this.page.click(this.registerBtn);
    }

    async register(username: string, password: string) {
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.enterConfirmPassword(password);
        await this.clickRegisterButton();
    }

    async verifyMissingMessage()  {
        await this.verifyTextVisible(this.missingMessage);
    }
}