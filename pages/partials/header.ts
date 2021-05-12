import {by, ElementFinder} from 'protractor';
import {Page} from "../page";
import {GeneralHelper} from "../../helpers/generalHelper";

export class Header extends Page {
    headerContainer = this.browserInstance.element(by.css(".ssls-header"));

    loginButton = this.headerContainer.element(by.xpath("//span[text() = 'Log in']"));
    loggedEmail = this.headerContainer.element(by.xpath("//div[contains(@class, 'sls-dropdown')]//i[contains(@class, 'ssls-icon-user-circle')]/following-sibling::span"));
    profileMenu: ElementFinder = this.headerContainer.element(by.css('.ssls-header-dropdown-nav.ssls-header-user-nav'));
    profileItemInProfileMenu = this.profileMenu.element(by.xpath("//a[text()=' Profile']"));
    logOuttemInProfileMenu = this.profileMenu.element(by.xpath("//button[text()=' Log out']"));

    async openAuthorizationPage () {
        await this.browserInstance.wait(this.EC.visibilityOf(this.loginButton), 10000, 'The "Log in" button did not appear.');
        await this.loginButton.click();
    }

    async getUserEmail() {
        await this.browserInstance.wait(this.EC.visibilityOf(this.loggedEmail), 10000, 'The user Email did not appear in the header.');

        return GeneralHelper.stringToLowerCase(await this.loggedEmail.getText());
    }

    async isUserLogged () {
        try {
            await this.browserInstance.wait(this.EC.visibilityOf(this.loggedEmail), 10000, 'The "Log in" button did not appear.');

            return true;
        }
        catch(e) {
            return false;
        }
    }

    async openProfileDropdownMenu () {
        await this.loggedEmail.click().then(function() {},
        function (err) {
            console.log('My errors: ' + err)
        });
        await this.browserInstance.wait(this.EC.visibilityOf(this.profileMenu), 10000, 'The Profile dropdown menu was not opened.');
    }

    async selectOptionInProfileMenu (menuOption: ElementFinder) {
        await this.openProfileDropdownMenu();
        await this.browserInstance.wait(this.EC.visibilityOf(menuOption), 10000, `The ${menuOption} menu dropdown item did not appear.`);
        await menuOption.click();
    }

    async logOut() {
        await this.browserInstance.wait(this.EC.visibilityOf(this.loggedEmail), 10000, 'The user Email did not appear in the header.');
        await this.selectOptionInProfileMenu(this.logOuttemInProfileMenu);
        await this.browserInstance.wait(this.EC.visibilityOf(this.loginButton), 10000, `The login button did not appear in the header.`);
    }
}