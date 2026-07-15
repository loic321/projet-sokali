import { test, expect } from '@playwright/test';

test.describe('Page Sokali', () => {


  test('Chargement et contenu statique', async ({ page }) => {

    await page.goto('http://localhost/Sokali/');

    // Attendre le chargement du DOM
    await page.waitForLoadState('domcontentloaded');


    // Vérification du titre
    await expect(page).toHaveTitle(/SOKALI/i);


    // Vérification que le body existe
    const body = page.locator('body');

    await expect(body).toBeVisible();


    // Vérification du contenu principal
    await expect(body).toContainText('SOKALI');


    // Vérification du header
    const header = page.locator('header');

    if (await header.count() > 0) {
        await expect(header).toBeVisible();
        console.log('Header présent');
    }


    // Vérification du logo
    const logo = page.locator('.logo, .logo-marque');

    if (await logo.count() > 0) {
        await expect(logo.first()).toBeVisible();
        console.log('Logo présent');
    }


    // Vérification de la barre de recherche
    const search = page.locator(
        'input[type="search"], input[type="text"]'
    ).first();


    if (await search.count() > 0) {

        await expect(search).toBeVisible();

        await search.fill('ordinateur');

        await expect(search).toHaveValue('ordinateur');

        console.log('Recherche fonctionnelle');

    }


    // Vérification des cartes produits
    const cards = page.locator(
        '.annonce-card, .product-card, .card'
    );


    if (await cards.count() > 0) {

        await expect(cards.first()).toBeVisible();

        console.log(
            `${await cards.count()} cartes produits trouvées`
        );

    }


    // Vérification footer
    const footer = page.locator('footer');


    if (await footer.count() > 0) {

        await expect(footer).toBeVisible();

        console.log('Footer présent');

    }


    console.log('Structure générale Sokali valide');

  });



  test('Interactions simples', async ({ page }) => {


    await page.goto('http://localhost/Sokali/');


    await page.waitForLoadState('domcontentloaded');


    // Test recherche
    const search = page.locator(
        'input[type="search"], input[type="text"]'
    ).first();


    if (await search.count() > 0) {

        await search.fill('ordinateur');

        await expect(search)
            .toHaveValue('ordinateur');


    }


    // Test bouton
    const button = page.locator('button').first();


    if (await button.count() > 0) {

        await expect(button).toBeVisible();

        await button.click();

        console.log('Bouton cliqué');

    }


  });



  test('Vérification de la structure HTML du Body', async ({ page }) => {


    await page.goto('http://localhost/Sokali/');


    await page.waitForLoadState('domcontentloaded');


    // Le body doit contenir des éléments
    const bodyChildren = await page.locator('body > *').count();


    expect(bodyChildren).toBeGreaterThan(0);


    console.log(
        `Le body contient ${bodyChildren} éléments principaux`
    );


    // Vérifier les sections principales

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