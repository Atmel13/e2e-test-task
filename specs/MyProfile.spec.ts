import {browser} from "protractor";
import {AuthorizationPage} from "../pages/authorization.page";
import {GeneralHelper} from "../helpers/generalHelper";
import {Credentials} from "../data/credentials";
import {Header} from "../pages/partials/header";
import {UserProfilePage} from "../pages/user.profile.page";
import {IUserProfileButtonItem, IUserProfileItems} from "../pages/user.profile.interfaces";

describe('My profile. Client Area.', () => {
    let loginpage = new AuthorizationPage(browser);
    let helper = new GeneralHelper(browser);
    let header = new Header(browser);
    let userProfile = new UserProfilePage(browser);
    let userProfileDetailsPreconditions: IUserProfileItems;

    beforeAll(async () => {
        await browser.waitForAngularEnabled(false);
    });

    afterEach(async () => {
        await helper.clearBrowserData(browser);
    });

    it('Checking user profile details', async () => {
        // Start preconditions block
        await loginpage.logIn(Credentials.email, Credentials.password);
        await header.selectOptionInProfileMenu(header.profileItemInProfileMenu);
        userProfileDetailsPreconditions = await userProfile.getAllItemsProperties();
        await header.logOut();
        // Finish preconditions block

        await loginpage.logIn(Credentials.email, Credentials.password);
        await header.selectOptionInProfileMenu(header.profileItemInProfileMenu);
        await expect(await userProfile.isProfilePageOpen()).toBeTruthy('1. The "Profile" page is not opened');
        const userProfileDetailsCase: IUserProfileItems = await userProfile.getAllItemsProperties();

        expect(userProfileDetailsPreconditions).toEqual(userProfileDetailsCase, '2. Objects are not equal')
    }, 60000)
});
