describe("Test 352", function () {
    const SELECTORS = {
        blogSearchInput: '[data-test-tp="header-search-input"]',
        blogSearchResult: '[data-test-tp="blog_search-article-0"]',
        blogSearchList: '[data-test-tp="search-result-0"]',
        blogSearchInputNotValidText: '[class="text-lg-xl leading-8 lg:text-2.5xl font-bold lg:leading-[2.75rem]"]'
    }

    const CREDENTIALS = {
        blogSearchInput: 'test',
        blogSearchInputNotValid: 'dsadasdadq'
    }

    it("Test 352 should be successful", async ({ browser }) => {
        await browser.setWindowSize(1920, 1080);

        //1. Позитивный поиск
        await browser.url("https://smsfast.guru/blog");
        console.log('✅ Blog opened');

        const blogSearchInput = await browser.$(SELECTORS.blogSearchInput);
        await blogSearchInput.waitForDisplayed({ timeout: 5000 });
        await blogSearchInput.setValue(CREDENTIALS.blogSearchInput);
        console.log('✅ Blog search input filled');

        await browser.keys('Enter');
        console.log('✅ Blog search input submitted');

        await browser.pause(5000);

        const blogSearchResult = await browser.$(SELECTORS.blogSearchResult);
        await blogSearchResult.waitForDisplayed({ timeout: 5000 });
        console.log('✅ Blog search result displayed');

        await browser.pause(5000);

        //2. Проверка выпадающего списка
        await browser.url("https://smsfast.guru/blog");
        console.log('✅ Blog opened for check dropdown list');

        await blogSearchInput.waitForDisplayed({ timeout: 5000 });
        await blogSearchInput.setValue(CREDENTIALS.blogSearchInput);
        console.log('✅ Blog search input filled');

        const blogSearchList = await browser.$(SELECTORS.blogSearchList);
        await blogSearchList.waitForDisplayed({ timeout: 5000 });
        console.log('✅ Blog search list displayed');

        await browser.pause(5000);


        //3. Негативный поиск
        await browser.url("https://smsfast.guru/blog");
        console.log('✅ Blog opened after search');

        const blogSearchInputNotValid = await browser.$(SELECTORS.blogSearchInput);
        await blogSearchInputNotValid.waitForDisplayed({ timeout: 5000 });
        await blogSearchInputNotValid.setValue(CREDENTIALS.blogSearchInputNotValid);
        console.log('✅ Blog search input not valid filled');

        await browser.keys('Enter');
        console.log('✅ Blog search input not valid submitted');

        await browser.pause(5000);

        const blogSearchInputNotValidText = await browser.$(SELECTORS.blogSearchInputNotValidText);
        await blogSearchInputNotValidText.waitForDisplayed({ timeout: 5000 });
        console.log('✅ Blog search input not valid text displayed');
    })
})
