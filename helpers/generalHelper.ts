import {ElementFinder, ProtractorBrowser} from "protractor";
import {Page} from "../pages/page";

export class GeneralHelper extends Page{
    static stringToLowerCase (receivedString: string) {
        return receivedString.toLowerCase()
    }

    public async clearBrowserData (browserInstance: ProtractorBrowser) {
        await browserInstance.executeScript('window.localStorage.clear();');
        await browserInstance.executeScript('window.sessionStorage.clear();');
        await browserInstance.driver.manage().deleteAllCookies();
    }

}

/*
    const message = `Failed to click element ${webElement.locator()} during ${timeout} ms.`;
    const browserInstance = webElement.browser_;
    return await browserInstance.wait(() => {
        return webElement.click().then(() => true, () => false);
    }, timeout, message);
 */