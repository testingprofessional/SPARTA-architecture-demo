import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.usernameInput = this.page.getByTestId('username');
    this.passwordInput = this.page.getByTestId('password');
    this.loginButton = this.page.getByTestId('login-button');
    this.errorMessage = this.page.getByTestId('error');
  }

  async open() {
    await this.page.goto('/');
  }

  async vulInloggegevensInEnBevestig(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async haalFoutmeldingOp(): Promise<string> {
    const tekst = await this.errorMessage.textContent();
    return tekst?.trim() ?? '';
  }
}
