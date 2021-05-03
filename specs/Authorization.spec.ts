import {browser} from 'protractor';
import {HomePage} from '../pages/home.page';
import {DataGenerator} from "../helpers/dataGenerator";
import {AuthorizationPage} from "../pages/authorization.page";
import {Credentials} from "../data/credentials";
import {GeneralHelper} from "../helpers/generalHelper";
import {Header} from '../pages/partials/header';
import {loginErrorMessage} from "../data/authorization.page/authorization.data";

describe('Authorization page. ', () => {
    let homePage = new HomePage(browser);
    let authorizationPage = new AuthorizationPage(browser);
    let helper = new GeneralHelper(browser);
    let header = new Header(browser)

    beforeAll(async () => {
        await browser.waitForAngularEnabled(false);
    });

    afterEach(async () => {
        await helper.clearBrowserData(browser);
    });

    it('Login with invalid credentials', async () => {
        await homePage.visit();
        expect(homePage.isHomePageOpen()).toBeTruthy('1. The "Home" page is not open.');

        const invalidEmail: string =  DataGenerator.getRandomEmail();
        const invalidPassword: string =  DataGenerator.getRandomPassword();

        await header.openAuthorizationPage();
        expect(authorizationPage.isAuthorizationPageOpen).toBeTruthy('2. The "Authorization" page is not open.');

        await authorizationPage.fillInCredentials(invalidEmail,invalidPassword);
        expect(await authorizationPage.getEnteredPassword()).toEqual(invalidPassword, '3. Entered password does not match to displayed password.');

        await authorizationPage.submitLoginCredentials();
        expect(await authorizationPage.getPopUpMessageText()).toEqual(loginErrorMessage, '4. Incorrect login error message');
    });

    it('Login with valid credentials', async () => {
        await homePage.visit();
        expect(homePage.isHomePageOpen()).toBeTruthy('1. The "Home" page is not open.');

        await header.openAuthorizationPage();
        expect(authorizationPage.isAuthorizationPageOpen).toBeTruthy('2. The "Authorization" page is not open.');

        await authorizationPage.fillInCredentials(Credentials.email, Credentials.password);
        expect(await authorizationPage.getEnteredPassword()).toEqual(Credentials.password, '3. Entered password does not match to displayed password.');

        await authorizationPage.submitLoginCredentials();
        await header.isUserLogged();
        expect(await header.getUserEmail()).toEqual(Credentials.email, '4. Entered email is not equal to Email used for Sign in.');
    });
});
