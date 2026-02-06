describe("Test 350", function () {
    it('Test 350 should be successful', async ({ browser }) => {
        const URL = "https://ru.api.rip/?secret_key=euNhV2";
        const urlBlog = "https://ru.api.rip/blog";
        const urlMain = "https://ru.api.rip/";

        // const URL = "https://smsfast.guru/auth/telegram/callback?id=1813487413&first_name=%D0%A7%D0%B5%D1%80%D0%BD%D1%8B%D0%B9&last_name=%D0%9C%D0%B5%D1%87%D0%BD%D0%B8%D0%BA&username=blackknight132&photo_url=https://t.me/i/userpic/320/Dd4sR6hXRcfPGdDb0WLuJLEPG5hMQygYeE99Smx_yEs.jpg&auth_date=1770385350&hash=5ca2c76e86922697a1b358b91b4c525cac2b31a1b990f523dc8a38882b9c4528";
        // const urlMain = "https://smsfast.guru/";
        // const urlBlog = "https://smsfast.guru/blog/";

        const CREDENTIALS = {
            email: "123@123.com",
            password: "123456"
        };

        const SELECTORS = {
            blogArticleLikeBtnRemove: '[data-test-tp="blog_article_like-remove"]',
            blogCardMain: '[data-test-tp="blog_card-main"]',
            blogArticleLikeAdd: '[data-test-tp="blog_article_like-add"]',
            navbarBlogLink: '[data-test-tp="navbar-blog-link"]',
            headerLoginBtn: '[data-test-tp="header-login-button"]',
            modalEmail: '[data-test-tp="modal-login_email-field"]',
            modalPassword: '[data-test-tp="modal-login_password-field"]',
            modalLoginBtn: '[data-test-tp="modal-login_login-button"]',
            headerUserMenuBtn: '[data-test-tp="header-user-menu-button"]',
            blogLikeCardAdd: '[data-test-tp="blog_card_like-add"]',
            blogLikeCardRemove: '[data-test-tp="blog_card_like-remove"]'
        };


        // 1. Setup window
        await browser.setWindowSize(1920, 1080);
        // 2. Open page
        await browser.url(URL);
        // console.log('✅ URL opened');

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

        await browser.url(urlBlog);
        console.log('✅ Blog opened');

        // //7 В хедере кликнуть на кнопку Блог
        // const navbarBlogLink = await browser.$(SELECTORS.navbarBlogLink);
        // await navbarBlogLink.waitForDisplayed({ timeout: 10000 });
        // await navbarBlogLink.click();
        // console.log('✅ Blog button clicked');

        //8 Найти первый попавшийся блок статьи
        const blogCardMain = await browser.$(SELECTORS.blogCardMain);
        await blogCardMain.waitForDisplayed({ timeout: 10000 });
        await browser.execute(el => el.click(), blogCardMain);
        console.log('✅ Blog card clicked');

        //9 Найти кнопку лайка и кликнуть на нее
        const blogArticleLikeAdd = await browser.$(SELECTORS.blogArticleLikeAdd);
        await blogArticleLikeAdd.waitForDisplayed({ timeout: 10000 });
        await browser.execute(el => el.click(), blogArticleLikeAdd);
        console.log('✅ Blog article like clicked');
        await browser.pause(5000);

        //10 Найти кнопку лайка и кликнуть на нее повторно
        const blogArticleLikeBtnRemove = await browser.$(SELECTORS.blogArticleLikeBtnRemove);
        await blogArticleLikeBtnRemove.waitForDisplayed({ timeout: 10000 });
        await blogArticleLikeBtnRemove.waitForClickable({ timeout: 10000 });
        await browser.execute(el => el.click(), blogArticleLikeBtnRemove);
        console.log('✅ Blog article like clicked again');

        //11 Вернуться на главную страницу Блога
        await browser.url(urlBlog);

        //12 Навести курсор на блок статьи
        const blogCardHover = await browser.$(SELECTORS.blogCardMain);
        await blogCardHover.waitForDisplayed({ timeout: 10000 });
        await blogCardHover.moveTo();
        await browser.pause(2000);

        const blogLikeCardAdd = await browser.$(SELECTORS.blogLikeCardAdd);
        await blogLikeCardAdd.waitForDisplayed({ timeout: 10000 });
        console.log('✅ Blog card hovered, like button visible');

        await browser.pause(5000);

        //13 Кликнуть кнопку лайка
        await browser.execute(el => el.click(), blogLikeCardAdd);
        console.log('✅ Blog main page blog like clicked');

        await browser.pause(5000);

        //14 Кликнуть кнопку лайка повторно
        const blogLikeCardRemove = await browser.$(SELECTORS.blogLikeCardRemove);
        await blogLikeCardRemove.waitForDisplayed({ timeout: 10000 });
        await browser.execute(el => el.click(), blogLikeCardRemove);
        console.log('✅ Blog main page blog like clicked again');

        await browser.pause(5000);

        //15 Вернуться на главную страницу
        await browser.url(urlMain);

        const element = await browser.$('//*[@class="overflow-hidden rounded-3xl relative duration-300"]');
        await element.waitForDisplayed({ timeout: 5000 });
        await element.scrollIntoView({ block: 'center' });
        console.log('✅ Element found');

        //17 Найти блок статьи
        const blogCartOnMainPage = await browser.$('[class="flex gap-4 md:gap-4 flex-col md:flex-row"]');
        console.log('✅ Blog cart on main page found');
        await blogCartOnMainPage.waitForDisplayed({ timeout: 10000 });
        await blogCartOnMainPage.scrollIntoView({ block: 'center' });
        await blogCartOnMainPage.moveTo();
        await browser.pause(5000);

        //18 Кликнуть кнопку лайка
        const blogLikeCardAddMain = await browser.$(SELECTORS.blogLikeCardAdd);
        await blogLikeCardAddMain.waitForDisplayed({ timeout: 5000 });
        await blogLikeCardAddMain.waitForClickable({ timeout: 5000 });
        await browser.execute(el => el.click(), blogLikeCardAddMain);
        console.log('✅ Blog main page like clicked');

        await browser.pause(5000);

        //19 Кликнуть кнопку лайка повторно
        const blogLikeCardRemoveMain = await browser.$(SELECTORS.blogLikeCardRemove);
        await blogLikeCardRemoveMain.waitForDisplayed({ timeout: 5000 });
        await blogLikeCardRemoveMain.waitForClickable({ timeout: 5000 });
        await browser.execute(el => el.click(), blogLikeCardRemoveMain);
        console.log('✅ Blog main page like clicked');

        await browser.pause(5000);

        console.log("✅Test done")
    });
})