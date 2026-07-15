import { test, expect } from '@playwright/test';


test.describe('Page Sokali', () => {


  test('Chargement et contenu statique', async ({ page }) => {


    await page.goto('/');

    await page.waitForLoadState('domcontentloaded');


    // Vérification du titre
    await expect(page).toHaveTitle(/SOKALI/i);


    // Vérification body
    const body = page.locator('body');

    await expect(body).toBeVisible();


    // Vérification contenu
    await expect(body).toContainText('SOKALI');


    // Vérification header obligatoire
    const header = page.locator('header');

    await expect(header).toHaveCount(1);
    await expect(header).toBeVisible();

    console.log('Header présent');


    // Vérification logo obligatoire
    const logo = page.locator('.logo, .logo-marque');

    await expect(logo.first()).toBeVisible();

    console.log('Logo présent');


    // Vérification barre recherche obligatoire
    const search = page.locator(
      'input[type="search"], input[type="text"]'
    ).first();


    await expect(search).toBeVisible();


    await search.fill('ordinateur');


    await expect(search)
      .toHaveValue('ordinateur');


    console.log('Recherche fonctionnelle');



    // Vérification cartes produits obligatoire

    const cards = page.locator(
      '.annonce-card, .product-card, .card'
    );


    await expect(cards.first()).toBeVisible();


    expect(await cards.count())
      .toBeGreaterThan(0);


    console.log(
      `${await cards.count()} cartes produits trouvées`
    );



    // Vérification footer obligatoire

    const footer = page.locator('footer');


    await expect(footer).toHaveCount(1);

    await expect(footer).toBeVisible();


    console.log('Footer présent');


    console.log('Structure générale Sokali valide');


  });





  test('Interactions simples', async ({ page }) => {


    await page.goto('/');


    await page.waitForLoadState('domcontentloaded');



    // Test recherche

    const search = page.locator(
      'input[type="search"], input[type="text"]'
    ).first();


    await search.fill('ordinateur');


    await expect(search)
      .toHaveValue('ordinateur');



    // Test bouton

    const button = page.locator('button').first();


    await expect(button).toBeVisible();


    await button.click();


    console.log('Bouton cliqué');


  });






  test('Vérification de la structure HTML du Body', async ({ page }) => {



    await page.goto('/');


    await page.waitForLoadState('domcontentloaded');



    // Vérification des éléments principaux du body

    const bodyChildren = await page.locator('body > *').count();


    expect(bodyChildren)
      .toBeGreaterThan(0);



    console.log(
      `Le body contient ${bodyChildren} éléments principaux`
    );



    // Vérification structure HTML

    const sections = page.locator(
      'header, main, section, footer'
    );


    expect(await sections.count())
      .toBeGreaterThan(0);



    console.log(
      `${await sections.count()} sections HTML détectées`
    );


  });


});