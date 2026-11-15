import { Page } from '@playwright/test';
import { LoginPage } from '../interactie/LoginPage';
import { InventoryPage } from '../interactie/InventoryPage';

export class ShopActions {
  private loginPage: LoginPage;
  private inventoryPage: InventoryPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
  }

  async logInAlsGebruiker(username: string, password: string) {
    await this.loginPage.open();
    await this.loginPage.vulInloggegevensInEnBevestig(username, password);
  }

  async plaatsRugzakInWinkelwagen() {
    await this.inventoryPage.voegRugzakToeAanWinkelwagen();
  }
}
