describe("Test Authorization Tests", function () {
    it('Authorization should be successful', async ({ browser }) => {
        const URL = "https://ru.api.rip/?secret_key=euNhV2";

        const CREDENTIALS = {
            email: "123@123.com",
            password: "123456"
        };
        const SELECTORS = {
            headerLoginBtn: '[data-test-tp="header-login-button"]',
            modalEmail: '[data-test-tp="modal-login_email-field"]',
            modalPassword: '[data-test-tp="modal-login_password-field"]',
            modalLoginBtn: '[data-test-tp="modal-login_login-button"]',
            headerUserMenuBtn: '[data-test-tp="header-user-menu-button"]'
        };

        // 1. Setup window
        await browser.setWindowSize(1920, 1080);

        // 2. Open page
        await browser.url(URL);

        await browser.pause(5000);

        // 3. Open modal (using JS click for reliability as requested)
        const headerLoginBtn = await browser.$(SELECTORS.headerLoginBtn);
        await headerLoginBtn.waitForDisplayed({ timeout: 5000 });
        await browser.execute(el => el.click(), headerLoginBtn);
        console.log('✅ Modal opened');

        // 4. Fill form
        const emailField = await browser.$(SELECTORS.modalEmail);
        const passField = await browser.$(SELECTORS.modalPassword);

        // Wait for animation if needed, though waitForDisplayed is usually enough
        await emailField.waitForDisplayed({ timeout: 5000 });

        await emailField.setValue(CREDENTIALS.email);
        await passField.setValue(CREDENTIALS.password);

        // 5. Submit login
        const modalLoginBtn = await browser.$(SELECTORS.modalLoginBtn);
        await modalLoginBtn.waitForEnabled({ timeout: 5000 });

        // JS click as requested for reliability
        await browser.execute(el => el.click(), modalLoginBtn);
        console.log("✅ Login button clicked");

        // 6. Verify assertions
        const userMenuBtn = await browser.$(SELECTORS.headerUserMenuBtn);

        // Wait for login to complete (server response)
        // Using built-in assertion which handles waiting internally
        await expect(userMenuBtn).toBeDisplayed({
            wait: 10000,
            message: "User profile button did not appear; authorization might have failed."
        });

        console.log("🎉 TEST PASSED: User menu is visible");
    });
})