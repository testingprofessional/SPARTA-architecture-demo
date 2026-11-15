import { expect, Page } from '@playwright/test';
import { LoginPage } from '../interactie/LoginPage';
import { InventoryPage } from '../interactie/InventoryPage';

export class ShopAssertions {
  private loginPage: LoginPage;
  private inventoryPage: InventoryPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
  }

  async controleerSuccesvolleLogin() {
    const titel = await this.inventoryPage.haalPaginaTitelOp();
    expect(titel).toBe('Products');
  }

  async controleerLoginFoutmelding(verwachteTekst: string) {
    const melding = await this.loginPage.haalFoutmeldingOp();
    expect(melding).toContain(verwachteTekst);
  }

  async controleerAantalInWinkelwagen(verwachtAantal: string) {
    const aantal = await this.inventoryPage.haalAantalItemsInWinkelwagenOp();
    expect(aantal).toBe(verwachtAantal);
  }
}
