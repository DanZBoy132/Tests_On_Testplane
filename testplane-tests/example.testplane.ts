// describe('test', () => {
//     it("search element", async ({browser}) => {
//         await browser.url("https://smsfast.com/");
//         await browser.pause(3000);
//
//         //2. Умное оджидание загрузки
//         await browser.waitUntil(
//             async () => (await browser.getTitle()).length > 0,
//             {timeout: 10000, timeoutMsg: 'Page failed to load'}
//         )
//
//         //3. Ищем элемент (с несколькими попытками
//         let element;
//         const selectors = [
//             "div.text-sm*=Some online services require",
//             "p*=Some online services require", // Любой элемент с текстом
//             "*=Some online services require", // Любой элемент с классом содержащим "text"
//             "//*[contains(text(), 'online services require')]" // XPath
//         ]
//
//         for (const selector of selectors) {
//             const foundElement = await browser.$(selector);
//             if (await foundElement.isExisting) {
//                 element = foundElement;
//                 console.log(`found element: ${element}`);
//                 break;
//             }
//         }
//
//         //4. Если элеменет не найден - падаем с понятной ошибкой
//         if (!element || !await element.isExisting()) {
//             await browser.saveScreenshot('element_not_found.png')
//             throw new Error('element_not_found');
//         }
//
//         //5. Прокручиваем и ждем
//         await element.scrollIntoView({ block: 'center' });
//         await element.waitForDisplayed({ timeout: 10000 });
//
//         //6. Получаем и проверяем текст
//         const elementText = await element.getText();
//         console.log(`elementText: ${elementText}`);
//
//         //7. Промеряем наличие ключевыз фраз
//         const keyPharases = [
//             'Some online services require',
//             'phone number from a specific region',
//             'temporary numbers',
//             'any country you need'
//         ];
//
//         for (const phrase of keyPharases) {
//             expect(elementText).toContain(phrase);
//         }
//
//         console.log('✅ Test passed successfully.');
//     })
// })
//
