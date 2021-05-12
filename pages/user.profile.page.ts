import {Page} from "./page";
import {By, by, ElementFinder} from "protractor";
import {ProfileItems} from "./user.profile.enums";
import {IUserProfileButtonItem, IUserProfileItems} from "./user.profile.interfaces";

export class UserProfilePage extends Page {
    private container: ElementFinder = this.browserInstance.element(by.css('.profile-page.ng-scope'));

    async isProfilePageOpen(): Promise<boolean> {
        try {
            await this.browserInstance.wait(this.EC.presenceOf(this.container), 10000, 'The "Profile" page was not opened');

            return true;
        } catch (e) {
            return false;
        }
    }

    async getProfileItemProperties(item: ProfileItems) {
        await this.browserInstance.wait(this.EC.presenceOf(this.container), 10000, 'The "Profile" page was not opened');

        let itemValue: string = '';

        itemValue = await this.browserInstance.element.all(by.xpath(`//span[text()='${item}']/parent::div[@class = 'terms']/following-sibling::*/span[contains(@class, 'text')]`)).getText();

        try {
            await this.container.element(by.xpath(`//span[text()='${item}']/parent::div[@class = 'terms']/following-sibling::*/button[contains(@class, 'toggle-btn')]`)).getWebElement();
        } catch (e) {
            return itemValue;
        }

        const enabledButton = await this.browserInstance.element.all(by.xpath(`//span[text()='${item}']/parent::div[@class = 'terms']/following-sibling::*/button[contains(@class, 'on')]`));
        const profileProperty: IUserProfileButtonItem = { text : itemValue };

        profileProperty.buttonState = enabledButton.length > 0;

        return profileProperty;
    }

    async getAllItemsProperties() {
        let properties: IUserProfileItems = {};

        for (const item of Object.values(ProfileItems)) {
            properties[item] = await this.getProfileItemProperties(item)
        }

        return properties;
    }
}
