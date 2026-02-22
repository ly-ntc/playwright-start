import {Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage  {
    private successMessage = 'Successfully registered, you can log in now.';
    constructor(page: Page) {
        super(page);
    }

    async verifyRedirectedToLoginPage()  {
        await this.waitForUrlContains('/login');
    }

    async verifySuccessMessage()  {
        await this.verifyTextVisible(this.successMessage);
    }
    
}