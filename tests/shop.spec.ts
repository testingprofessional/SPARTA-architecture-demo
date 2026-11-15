import { test } from '../config/fixtures';
import shopData from '../data/saucedemo.json';

test.describe('SauceDemo Webshop - SPARTA UI Demo', () => {

  test('Standaard gebruiker kan inloggen en een product toevoegen', async ({ shopAct, shopAssert }) => {
    const { username, password } = shopData.standaardGebruiker;

    // Act
    await shopAct.logInAlsGebruiker(username, password);
    await shopAct.plaatsRugzakInWinkelwagen();

    // Assert
    await shopAssert.controleerSuccesvolleLogin();
    await shopAssert.controleerAantalInWinkelwagen('1');
  });

  test('Geblokkeerde gebruiker krijgt een duidelijke foutmelding', async ({ shopAct, shopAssert }) => {
    const { username, password, verwachteFout } = shopData.geblokkeerdeGebruiker;

    // Act
    await shopAct.logInAlsGebruiker(username, password);

    // Assert
    await shopAssert.controleerLoginFoutmelding(verwachteFout);
  });

});
