import {Config} from 'protractor';
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
let reporter = new HtmlScreenshotReporter({
    dest: 'screenshots',
    filename: 'my-report.html',
    captureOnlyFailedSpecs: true,
    reportOnlyFailedSpecs: false,
    showSummary: true,
    reportFailedUrl: true,
    inlineImages: true
});

export const config: Config = {
    directConnect: true, //seleniumAddress: 'http://localhost:4444/wd/hub',
    SELENIUM_PROMISE_MANAGER: false,
    capabilities: {
        browserName: "chrome",
        shardTestFiles: true,
        maxInstances: 2,
        chromeOptions: {
            args: [ "--headless", "--window-size=800,600" ]
        }
    },
    specs: [
        "specs/*.spec.js",
    ],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 180000
    },

    baseUrl: 'https://www.sbzend.ssls.com',

    // Setup the report before any tests start
    beforeLaunch: function() {
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
    },
/*
// Close the report after all tests finish
    afterLaunch: function (exitCode) {
        return new Promise(function (resolve) {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },
*/
    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: {
                    displayStacktrace: false,
                },
            })
        ),
        jasmine.getEnv().addReporter(reporter);
    }
}
