import {browser, protractor, ProtractorBrowser} from 'protractor';

export class Page {
    constructor(public browserInstance: ProtractorBrowser) { }

    public EC = protractor.ExpectedConditions;

}
