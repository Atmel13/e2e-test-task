import {browser, by, ElementFinder} from 'protractor';
import {Page} from './page';
import {URLs} from "../data/urls";
import {Header} from "./partials/header";

export class AuthorizationPage extends Page {
    private container: ElementFinder = this.browserInstance.element(by.css('.authorization-page'));
    private header = new Header(this.browserInstance);

    private emailInputField = this.container.element(by.name("email"));
    private passwordInputField = this.container.element(by.name("password"));
    private loginButton = this.container.element(by.xpath("//button[contains(., 'Login')]"));
    private showPasswordButton = this.container.element(by.css(".btn-input-block"));
    private hidePasswordButton = this.container.element(by.xpath("//span[contains(@class,'icon-eye ng-hide')]"));
    private popUpMessage = this.browserInstance.element(by.css(".noty_text"));

    async visit () {
        await this.browserInstance.get(URLs.AuthorizationPage);
    }

    async isAuthorizationPageOpen () {
        try {
            await this.browserInstance.wait(this.EC.visibilityOf(this.loginButton), 10000, 'The "Login" page was not opened1.');

            return true;
        }
        catch (e) {
            return false;
        }
    }

    async loginWithCredentials (email: string, password: string) {
        await this.fillInCredentials(email, password);
        await this.submitLoginCredentials();
    }

    async fillInCredentials(email: string, password: string) {
        await this.isAuthorizationPageOpen();
        await this.emailInputField.sendKeys(email);
        await this.passwordInputField.sendKeys(password);
    }

    async submitLoginCredentials() {
        await this.loginButton.click();
    }

    async getEnteredPassword() {
        await this.browserInstance.wait(this.EC.elementToBeClickable(this.showPasswordButton), 10000, 'Show password button did not appear.');
        await this.showPasswordButton.click();
        await this.browserInstance.wait(this.EC.presenceOf(this.hidePasswordButton), 10000, 'Hide password button did not appear.');

        return await this.passwordInputField.getAttribute('value');
    }

    async getPopUpMessageText() {
        await this.browserInstance.wait(this.EC.visibilityOf(this.popUpMessage), 10000, 'Pop-up message did not appear.');

        return this.popUpMessage.getText();
    }

    async logIn(email: string, password: string) {
        await this.visit();
        await this.browserInstance.wait(this.EC.visibilityOf(this.loginButton), 10000, 'The "Authorization" page was not opened.');
        await this.loginWithCredentials(email, password);
        await this.submitLoginCredentials();
        await this.browserInstance.wait(this.EC.visibilityOf(this.header.loggedEmail), 10000, 'User was not signed in.');
    }
}
