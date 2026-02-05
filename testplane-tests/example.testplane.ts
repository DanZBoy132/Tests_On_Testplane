// describe('test', () => {
//     it("search element", async ({browser}) => {
//         await browser.url("https://smsfast.com/");
//         await browser.pause(3000);
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
