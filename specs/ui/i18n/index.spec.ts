import { test, expect } from '@playwright/test';

const pageUrl = "https://simple-picto.vercel.app"
const localeSettingInputSelector = '[id="locale-selector"]'

test('Le locale sélectionné par défaut est celui du système', async ({ page }) => {
  await page.goto(pageUrl + '/settings');
  
  // #todo Récupérer la locale système (simulation)
  // const env = process.env;
  // const language = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE || 'en_US';
  const systemLocale = await page.evaluate(() => navigator.language);
  
  // Vérifier que l'interface affiche bien le locale système
  const displayedLocale = await page.locator(localeSettingInputSelector).inputValue();
  expect(systemLocale).toContain(displayedLocale);
});

test("L'utilisateur sélectionne un autre locale", async ({ page }) => {
  await page.goto(pageUrl + '/settings'); 
  
  // Sélectionner une nouvelle option de locale
  await page.selectOption(localeSettingInputSelector, 'fr');
  
  // Vérifier que l'interface est mise à jour avec le nouveau locale
  const displayedLocale = await page.locator(localeSettingInputSelector).inputValue();
  expect(displayedLocale).toBe('fr');

  const parameterLinkTitle = await page.locator("[href='/settings']").locator('css=span:not(.icon)').textContent();
  expect(parameterLinkTitle).toBe("Paramètres");
});

// Test: Le locale sélectionné est conservé après reconnexion
test('Le locale sélectionné est conservé après reconnexion', async ({ page }) => {
  await page.goto(pageUrl + '/settings');
  
  // Sélectionner un locale spécifique
  await page.selectOption(localeSettingInputSelector, 'en');
  
  // Simuler une déconnexion/reconnexion
  await page.goto(pageUrl + '/logout');
  await page.goto(pageUrl + '/login');
  await page.fill('[data-testid="username"]', 'testUser');
  await page.fill('[data-testid="password"]', 'password');
  await page.click('[data-testid="login-button"]');
  
  // Vérifier que le locale est bien conservé après reconnexion
  const displayedLocale = await page.locator('[data-testid="locale-display"]').textContent();
  expect(displayedLocale).toBe('en');

  const parameterLinkTitle = await page.locator("[href='/settings']").locator('css=span:not(.icon)').textContent();
  expect(parameterLinkTitle).toBe("Settings");
});
