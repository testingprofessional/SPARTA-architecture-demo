import { test } from '../config/fixtures';
import postData from '../data/posts.json';

test.describe('Blogposts API - SPARTA Demo', () => {
  
  for (const data of postData) {
    test(`Kan een nieuwe post aanmaken: "${data.titel}"`, async ({ postAct, postAssert }) => {
      // Act (Invoker)
      const resultaat = await postAct.maakNieuwePostAan(data.titel, data.inhoud, data.userId);

      // Assert (Asserter)
      postAssert.controleerAangemaaktePost(resultaat, data.titel, data.userId);
    });
  }

  test('Kan een bestaande post ophalen', async ({ postAssert }) => {
    // Directe controle via Asserter
    await postAssert.controleerBestaandePost(1, 1);
  });

});
