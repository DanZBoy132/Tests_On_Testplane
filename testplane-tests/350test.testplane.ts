describe("Test 350", function () {
    it('Test 350 should be successful', async ({ browser }) => {
        const URL = "https://ru.api.rip/?secret_key=euNhV2";
        const urlBlog = "https://ru.api.rip/blog";
        const urlMain = "https://ru.api.rip/";

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
            headerUserMenuBtn: '[data-test-tp="header-user-menu-button"]'
        };

        // 1. Setup window
        await browser.setWindowSize(1920, 1080);

        const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTJiNjE3OTg0YzlkYTQxOGUxNzBlOTZhMDFhM2Q4N2VkYTQ0MjI3YjE3ZTBiOTZlNjE5ZDdmNzU0YTY2YWZiMzVlZGUzZDFiNzNiMzIyYzQiLCJpYXQiOjE3NzAzNzgwOTIuNjM2MTE5LCJuYmYiOjE3NzAzNzgwOTIuNjM2MTIsImV4cCI6MTgwMTkxNDA5Mi42MzI0MzUsInN1YiI6IjE0NiIsInNjb3BlcyI6W119.y6fkHCrqnSXtt-8BLhv_FlSt1MXHGuok_p4WlZcRvSJRHtNUqMAEW01TXvp9pW2-cqq_QOLS0AJkAfeHJiPUDsLzWsrkE9tjia5ERE4t4gvpnNJxm5x2bl46xjyRycvnE_UosHgoVyHqrUJHzyBguSadT5sTgiWVw5KmqaZL3doJn68t51zc9af5jPMCPB4E-kpGo3ZT1LnL6Z3e0HWLeRuWK311EC7HinnSlScfmytmr7dmxKj3B-UC4_wJMMFIv5Q2_mlChsfarzm2O_lsdXQKVYButIuOcCUgZWGFd6GheMro_4CFEBNugTayLtdfG7fHPSxPvqgSEQwXyjGxb1EJg8ZfrKCqj9crbJuJnocjFFICLNuG8X0HJy64LQwCd9ibaFA32FZbpHAHNmQ-bAmqkl0UyjlA_7JwyB60F9Hxe0QLzh-IJ8sKmWs2aD1q6j-DnBia6Oww9B9SLez_ie-D0AnzNU_ZX38Dc6CZr6ki_Kp811Ydva8n0_1I7dSNtguWfx1dQCWvR73CuOgwYAzLHlxVMKfI_Uw2MIaaLgUCyvyBbpuMsnOi4FqYcDfWNtrOHv3AElCevnOpcort4Rr6nso1HpISHTjCj7IO7Bn8j_VseetUWE20ZI3RLp_CXSLK5Zb6iqZE3Lh0-Yn5xsRqXYNuc5NIPem_DpiJKVc';

        await browser.url(URL);

        // ждём загрузку (ВАЖНО)
        await browser.waitUntil(async () => (await browser.getTitle()).length > 0);

        // ставим cookie БЕЗ domain
        await browser.setCookies([{
            name: 'auth.token',
            value: TOKEN,
            path: '/',
            secure: true
        }]);

        // перезагрузка
        await browser.refresh();

        // дебаг — проверим реально ли cookie появилась
        const cookies = await browser.getCookies();
        console.log(cookies);

        // теперь ждём профиль
        const userMenuBtn = await browser.$('[data-test-tp="header-user-menu-button"]');
        await userMenuBtn.waitForDisplayed({ timeout: 15000 });

        console.log('✅ Авторизация через cookie успешна');

        // // 2. Open page
        // await browser.url(URL);

        // // 3. Open modal (using JS click for reliability as requested)
        // const headerLoginBtn = await browser.$(SELECTORS.headerLoginBtn);
        // await headerLoginBtn.waitForDisplayed({ timeout: 5000 });
        // await browser.execute(el => el.click(), headerLoginBtn);
        // console.log('✅ Modal opened');

        // // 4. Fill form
        // const emailField = await browser.$(SELECTORS.modalEmail);
        // const passField = await browser.$(SELECTORS.modalPassword);

        // // Wait for animation if needed, though waitForDisplayed is usually enough
        // await emailField.waitForDisplayed({ timeout: 5000 });

        // await emailField.setValue(CREDENTIALS.email);
        // await passField.setValue(CREDENTIALS.password);

        // // 5. Submit login
        // const modalLoginBtn = await browser.$(SELECTORS.modalLoginBtn);
        // await modalLoginBtn.waitForEnabled({ timeout: 5000 });

        // // JS click as requested for reliability
        // await browser.execute(el => el.click(), modalLoginBtn);
        // console.log("✅ Login button clicked");

        // // 6. Verify assertions
        // const userMenuBtn = await browser.$(SELECTORS.headerUserMenuBtn);

        // // Wait for login to complete (server response)
        // // Using built-in assertion which handles waiting internally
        // await expect(userMenuBtn).toBeDisplayed({
        //     wait: 10000,
        //     message: "User profile button did not appear; authorization might have failed."
        // });

        //7 В хедере кликнуть на кнопку Блог
        const navbarBlogLink = await browser.$(SELECTORS.navbarBlogLink);
        await navbarBlogLink.waitForDisplayed({ timeout: 5000 });
        await browser.execute(el => el.click(), navbarBlogLink);
        console.log('✅ Blog button clicked');

        //8 Найти первый попавшийся блок статьи
        const blogCardMain = await browser.$(SELECTORS.blogCardMain);
        await blogCardMain.waitForDisplayed({ timeout: 5000 });
        await browser.execute(el => el.click(), blogCardMain);
        console.log('✅ Blog card clicked');

        //9 Найти кнопку лайка и кликнуть на нее
        const blogArticleLikeAdd = await browser.$(SELECTORS.blogArticleLikeAdd);
        await blogArticleLikeAdd.waitForDisplayed({ timeout: 5000 });
        await browser.execute(el => el.click(), blogArticleLikeAdd);
        console.log('✅ Blog article like clicked');

        await browser.pause(5000);

        //10 Найти кнопку лайка и кликнуть на нее повторно
        const blogArticleLikeBtnRemove = await browser.$(SELECTORS.blogArticleLikeBtnRemove);
        await blogArticleLikeBtnRemove.waitForDisplayed({ timeout: 5000 });
        await browser.execute(el => el.click(), blogArticleLikeBtnRemove);
        console.log('✅ Blog article like clicked again');

        await browser.pause(5000);

        //11 Вернуться на главную страницу Блога
        await browser.url(urlBlog);

        //12 Навести курсор на блок статьи
        const overlay = await browser.$('[class*="group-hover:bg-black"]');
        await overlay.moveTo();
        await blogArticleLikeAdd.waitForDisplayed({ timeout: 5000 });
        console.log('✅ Blog card hovered, like button visible');

        //13 Кликнуть кнопку лайка
        await browser.execute(el => el.click(), blogArticleLikeAdd);
        console.log('✅ Blog article like clicked');

        await browser.pause(5000);

        //14 Кликнуть кнопку лайка повторно
        await browser.execute(el => el.click(), blogArticleLikeBtnRemove);
        console.log('✅ Blog article like clicked');

        await browser.pause(5000);

        //15 Вернуться на главную страницу
        await browser.url(urlMain);

        //16 Пролистать до текста Похожие статьи
        const similarArticlesText = await browser.$('//*[contains(text(), "Похожие статьи")]');
        await similarArticlesText.waitForDisplayed({ timeout: 5000 });
        await browser.execute(el => el.scrollIntoView({ block: 'center' }), similarArticlesText);
        console.log('✅ Similar articles text found');

        await browser.pause(5000);

        //17 Найти блок статьи
        const blogCartOnMainPage = await browser.$('class="flex gap-4 md:gap-4 flex-col md:flex-row"')
        console.log('✅ Blog cart on main page found');
        await blogCartOnMainPage.waitForDisplayed({ timeout: 5000 });
        await blogCartOnMainPage.moveTo();

        //18 Кликнуть кнопку лайка
        await browser.execute(el => el.click(), blogArticleLikeAdd);
        console.log('✅ Blog article like clicked');

        await browser.pause(5000);

        //19 Кликнуть кнопку лайка повторно
        await browser.execute(el => el.click(), blogArticleLikeAdd);
        console.log('✅ Blog article like clicked');

        await browser.pause(5000);
    });
})