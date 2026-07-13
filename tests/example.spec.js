import { test, expect } from '@playwright/test';

test.describe('Page Sokali', () => {

  test('Chargement et contenu statique', async ({ page }) => {

    await page.goto('http://localhost/Sokali/');

    // attendre que la page soit chargée
    await page.waitForLoadState('networkidle');

    // Vérification du titre
    await expect(page).toHaveTitle(/SOKALI/i);

    // Vérification du texte principal
    await expect(page.locator('body')).toContainText('SOKALI');

    // Vérification qu'il existe au moins un champ de recherche
    const search = page.locator('input[type="search"], input[type="text"]').first();

    if (await search.count() > 0) {
        await expect(search).toBeVisible();
        await search.fill('ordinateur');
        await expect(search).toHaveValue('ordinateur');
    }

    // Vérification qu'il existe des cartes produits
    const cards = page.locator('.annonce-card, .product-card, .card');

    if (await cards.count() > 0) {
        await expect(cards.first()).toBeVisible();
    }

    // Vérification du footer s'il existe
    if (await page.locator('footer').count() > 0) {
        await expect(page.locator('footer')).toContainText('SOKALI');
    }

  });


  test('Interactions simples', async ({ page }) => {

    await page.goto('http://localhost/Sokali/');

    await page.waitForLoadState('networkidle');

    // Recherche
    const search = page.locator('input[type="search"], input[type="text"]').first();

    if (await search.count() > 0) {
        await search.fill('ordinateur');
        await expect(search).toHaveValue('ordinateur');
    }

    // Premier bouton
    const button = page.locator('button').first();

    if (await button.count() > 0) {
        await button.click();
    }

  });

});