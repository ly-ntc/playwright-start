import {test} from '@playwright/test';
import { RegisterPage } from '../../../pages/RegisterPage';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('Successful Registration', () => {
    test('Verify Successful Registration', async ({page}) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);

        const username = 'lylyly1234';
        const password = 'camly123@';

        await registerPage.goToRegisterPage();
        await registerPage.register(username, password);

        await loginPage.verifyRedirectedToLoginPage();
        await loginPage.verifySuccessMessage();
    })

    test('Registration with Missing Username', async ({page}) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goToRegisterPage();

        const password = 'camly123@';

        await registerPage.enterPassword(password);
        await registerPage.enterConfirmPassword(password);

        await registerPage.clickRegisterButton();
        await registerPage.verifyMissingMessage();
        
        await page.waitForTimeout(5000);
    })
})