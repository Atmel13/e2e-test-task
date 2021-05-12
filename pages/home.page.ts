import {browser, by, ElementFinder} from 'protractor';
import {Page} from './page';

export class HomePage extends Page {
    private container: ElementFinder = this.browserInstance.element(by.css('.container:first-of-type'));

    private pageContainer = this.container.element(by.css(".ssls-home-page"));

    async isHomePageOpen () {
        try {
            await this.browserInstance.wait(this.EC.presenceOf(this.pageContainer), 10000, 'The "Home" page was not opened');

            return true;
        }
        catch (e) {
            return false;
        }
    }

    async visit () {
        await this.browserInstance.get(browser.baseUrl);
    }
}
