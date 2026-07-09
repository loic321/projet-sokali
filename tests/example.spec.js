import { test, expect } from '@playwright/test';

test.describe('Page Sokali', () => {

  test('Chargement et contenu statique', async ({ page }) => {
    // Ouvrir ton site
    await page.goto('http://localhost/Sokali/');

    // Vérifier le titre exact
    await expect(page).toHaveTitle('SOKALI — Marketplace locale');

    // Vérifier que le logo est visible
    await expect(page.locator('.logo')).toBeVisible();

    // Vérifier que la barre de recherche est présente et utilisable
    const searchInput = page.locator('.search-input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('ordinateur');
    await expect(searchInput).toHaveValue('ordinateur');

    // Vérifier qu’il y a bien 7 catégories affichées
    const categories = page.locator('.categorie-item');
    await expect(categories).toHaveCount(7);

    // Vérifier qu’il y a bien 4 annonces affichées
    const annonces = page.locator('.annonce-card');
    await expect(annonces).toHaveCount(4);
    await expect(annonces.first().locator('.annonce-titre')).toContainText('iphone 13 Pro Max');

    // Vérifier que le footer contient le texte attendu
    await expect(page.locator('footer')).toContainText('© 2026 SOKALI');
  });

  test('Interactions simples', async ({ page }) => {
    await page.goto('http://localhost/Sokali/');

    // Cliquer sur la première catégorie (on vérifie juste qu’elle est cliquable)
    const categories = page.locator('.categorie-item');
    await categories.nth(0).click();
    await expect(categories.nth(0)).toBeVisible();

    // Cliquer sur le bouton favoris de la première annonce
    const favBtn = page.locator('.annonce-card .btn[aria-label="mettre en favoris"]').first();
    await favBtn.click();
    await expect(favBtn).toBeVisible();

    // Cliquer sur le bouton Filtrer & Trier et intercepter l’alerte
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Filtrer & Trier');
      await dialog.dismiss();
    });
    await page.locator('.btn-filtre').click();
  });

});
