<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./docs/images/logo-light.svg" width="600">
        <source media="(prefers-color-scheme: light)" srcset="./docs/images/logo-dark.svg" width="600">
        <img alt="testplane testing library logo" src="./docs/images/logo-dark.svg" width="600">
    </picture>
</p>

<p align="center">
<a href="https://testplane.io/docs/v8/guides/how-to-add-testing-library/"><img src="https://img.shields.io/badge/Docs-Website-6c47ff" alt="Docs"></a>
    <a href="https://www.npmjs.com/package/@testplane/testing-library"><img src="https://img.shields.io/npm/dt/@testplane/testing-library.svg" alt="Total Downloads"></a>
    <a href="https://www.npmjs.com/package/@testplane/testing-library"><img src="https://img.shields.io/npm/v/@testplane/testing-library.svg" alt="Latest Release"></a>
    <a href="https://github.com/gemini-testing/testplane-testing-library/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@testplane/testing-library.svg" alt="License"></a>
    <a href="https://t.me/testplane"><img src="https://img.shields.io/badge/community-chat-blue?logo=telegram" alt="Community Chat"></a>
</p>

## Introduction
[Testing-library](https://testing-library.com/) is a collection of tools for testing web application user interfaces, focused on creating reliable and maintainable tests by emphasizing user behavior. The main advantage of `testing-library` is its focus on interaction with interface elements. And in testplane, you can use the element search methods provided by the `testing-library` itself.

## Installation

1. Install the npm package `@testplane/testing-library`:
```shell
npm i -D @testplane/testing-library
```

2. Include it in the Testplane config in the `prepareBrowser` section:
```js
// .testplane.conf.js
const { setupBrowser } = require("@testplane/testing-library");

module.exports = {
    prepareBrowser(browser) {
        setupBrowser(browser);
    },

    // other Testplane settings...
};
```

If you are using TypeScript and experiencing issues with testing-library types, you may add the following line to your tsconfig.json

```json
{
    "compilerOptions": {
        "types": [
            "@testplane/testing-library"
        ]
    }
}
```

## Usage

After configuring, you will be able to use the search by selectors from `testing-library`, as described in the [official documentation](https://testing-library.com/docs/queries/about/). For example, searching for an element by its text:

```js
it("example", async ({ browser }) => {
    await browser.url("https://github.com/");

    const newRepoButton = await browser.getByText("New");

    await newRepoButton.click();
});


```

This feature will also be available in the context of found elements:

```js
it("example", async ({ browser }) => {
    await browser.url("https://github.com/");

    const sidebar = await browser.$(".dashboard-sidebar");
    const newRepoButton = await sidebar.getByText("New");

    await newRepoButton.click();
});
```

Disclaimer:
All testing-library selectors return a promise and cannot be chained (like `browser.getByText().click()` — this is not possible).
Each testing-library selector must be awaited before performing any actions on it.
