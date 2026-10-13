
class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async navigate() {
        await this.page.goto('/web/index.php/auth/login', {
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });

        await this.usernameInput.waitFor({
            state: 'visible',
            timeout: 30000,
        });
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginError() {
        return this.page.getByText('Invalid credentials').isVisible();
    }
}

module.exports = { LoginPage };
