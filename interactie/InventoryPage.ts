import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  private readonly pageTitle: Locator;
  private readonly addBackpackButton: Locator;
  private readonly shoppingCartBadge: Locator;

  constructor(private page: Page) {
    this.pageTitle = this.page.getByTestId('title');
    this.addBackpackButton = this.page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.shoppingCartBadge = this.page.getByTestId('shopping-cart-badge');
  }

  async voegRugzakToeAanWinkelwagen() {
    await this.addBackpackButton.click();
  }

  async haalPaginaTitelOp(): Promise<string> {
    const tekst = await this.pageTitle.textContent();
    return tekst?.trim() ?? '';
  }

  async haalAantalItemsInWinkelwagenOp(): Promise<string> {
    if (await this.shoppingCartBadge.isVisible()) {
      const tekst = await this.shoppingCartBadge.textContent();
      return tekst?.trim() ?? '0';
    }
    return '0';
  }
}
