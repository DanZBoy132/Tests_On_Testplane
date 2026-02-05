describe("Test Autotization Tests", function () {
    it('Autotization must be okey', async ({browser}) => {
        // 1. Увеличиваем окно, чтобы элементы не перекрывались
        await browser.setWindowSize(1920, 1080);

        // 2. Открываем страницу
        await browser.url("https://ru.api.rip/?secret_key=euNhV2");

        // 3. Открываем модалку (через JS клик для надежности)
        const headerLoginBtn = await browser.$('[data-test-tp="header-login-button"]');
        await headerLoginBtn.waitForDisplayed({ timeout: 10000 });
        await browser.execute(el => el.click(), headerLoginBtn);

        console.log('✅ Открыли модальное окно');

        // 4. Заполняем поля
        const emailField = await browser.$('[data-test-tp="modal-login_email-field"]');
        const passField = await browser.$('[data-test-tp="modal-login_password-field"]');

        await emailField.waitForDisplayed({ timeout: 10000 });

        // Используем addValue или setValue, и добавляем небольшую паузу
        await emailField.setValue("123@123.com");
        await passField.setValue("123456");

        // Пауза 500мс, чтобы скрипты сайта успели "понять", что поля заполнены
        await browser.pause(500);

        // 5. Кликаем кнопку "Войти" в модалке
        const modalLoginBtn = await browser.$('[data-test-tp="modal-login_login-button"]');

        // Ждем, пока кнопка станет доступной
        await modalLoginBtn.waitForEnabled({ timeout: 10000 });

        // ВАЖНО: Если обычный .click() не срабатывает (как на видео),
        // используем принудительный JS клик
        await browser.execute(el => el.click(), modalLoginBtn);
        console.log("✅ Нажали кнопку Войти в модалке");

        // 6. ПРОВЕРКА АВТОРИЗАЦИИ
        // После клика ждем появления иконки профиля
        const userMenuBtn = await browser.$('[data-test-tp="header-user-menu-button"]');

        // Ждем до 15 секунд, так как серверу нужно время ответить
        const isLoggedIn = await userMenuBtn.waitForDisplayed({
            timeout: 15000,
            reverse: false, // ждем появления
            timeoutMsg: "Кнопка профиля не появилась! Авторизация не удалась."
        });

        await browser.pause(1000);

        if (isLoggedIn) {
            console.log("🎉 ТЕСТ УСПЕШЕН: Иконка профиля видна");
        }
    });
})