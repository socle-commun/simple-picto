import { test, expect } from '@playwright/test';

const pageUrl = "https://simple-picto.vercel.app";

// Test: Le mode d'affichage par défaut est le mode clair
test('Le mode d\'affichage par défaut est le mode clair', async ({ page }) => {
  await page.goto(pageUrl + '/settings');
  
  // Vérifier que l'interface est en mode clair
  const theme = await page.getAttribute('body', 'data-theme');
  expect(theme).toBe('light');
});

// Test: Le mode sélectionné est par défaut celui du système
test('Le mode sélectionné est par défaut celui du système', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto(pageUrl + '/');
  
  // Vérifier que l'interface affiche le mode sombre
  const theme = await page.getAttribute('body', 'data-theme');
  expect(theme).toBe('dark');
});

// Test: L'utilisateur sélectionne le mode sombre
test('L\'utilisateur sélectionne le mode sombre', async ({ page }) => {
  await page.goto(pageUrl + '/settings');
  await page.click('[data-testid="dark-mode-toggle"]');
  
  // Vérifier que l'interface passe en mode sombre
  const theme = await page.getAttribute('body', 'data-theme');
  expect(theme).toBe('dark');
});

// Test: L'utilisateur sélectionne le mode clair
test('L\'utilisateur sélectionne le mode clair', async ({ page }) => {
  await page.goto(pageUrl + '/settings');
  await page.click('[data-testid="light-mode-toggle"]');
  
  // Vérifier que l'interface passe en mode clair
  const theme = await page.getAttribute('body', 'data-theme');
  expect(theme).toBe('light');
});

// Test: Le mode sélectionné est appliqué sur toutes les pages
test('Le mode sélectionné est appliqué sur toutes les pages', async ({ page }) => {
  await page.goto(pageUrl + '/settings');
  await page.click('[data-testid="dark-mode-toggle"]');
  
  // Naviguer entre différentes pages
  await page.goto(pageUrl + '/dashboard');
  const theme = await page.getAttribute('body', 'data-theme');
  expect(theme).toBe('dark');
});

// Test: Le mode sélectionné est conservé après une reconnexion
test('Le mode sélectionné est conservé après une reconnexion', async ({ page }) => {
  await page.goto(pageUrl + '/settings');
  await page.click('[data-testid="dark-mode-toggle"]');
  
  // Simuler une déconnexion/reconnexion
  await page.goto(pageUrl + '/logout');
  await page.goto(pageUrl + '/login');
  await page.fill('[data-testid="username"]', 'testUser');
  await page.fill('[data-testid="password"]', 'password');
  await page.click('[data-testid="login-button"]');
  
  // Vérifier que le mode est bien conservé après reconnexion
  const theme = await page.getAttribute('body', 'data-theme');
  expect(theme).toBe('dark');
});
