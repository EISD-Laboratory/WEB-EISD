import { test, expect } from '@playwright/test';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Structure', path: '/structure' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Articles', path: '/articles' },
  { name: 'Contact', path: '/contact' },
];

for (const page of pages) {
  test.describe(`${page.name} page - Announcement Bar`, () => {
    test.beforeEach(async ({ page: pwPage }) => {
      await pwPage.goto(page.path);
      await pwPage.waitForLoadState('networkidle');
    });

    test('should not overlap hero content when announcement bar is visible', async ({ page: pwPage }) => {
      const announcementBar = pwPage.locator('[role="banner"]');
      await expect(announcementBar).toBeVisible();

      const announcementBarBox = await announcementBar.boundingBox();
      expect(announcementBarBox).not.toBeNull();

      const main = pwPage.locator('main');
      const mainBox = await main.boundingBox();
      expect(mainBox).not.toBeNull();

      if (announcementBarBox && mainBox) {
        expect(mainBox.y).toBeGreaterThanOrEqual(announcementBarBox.y + announcementBarBox.height - 5);
      }
    });

    test('should have proper spacing after dismissing announcement bar', async ({ page: pwPage }) => {
      const dismissButton = pwPage.locator('button[aria-label="Dismiss announcement"]');
      await expect(dismissButton).toBeVisible();
      await dismissButton.click();

      await pwPage.waitForTimeout(350);

      const announcementBar = pwPage.locator('[role="banner"]');
      await expect(announcementBar).toBeHidden();

      const main = pwPage.locator('main');
      const mainBox = await main.boundingBox();
      expect(mainBox).not.toBeNull();

      if (mainBox) {
        expect(mainBox.y).toBeLessThanOrEqual(70);
      }
    });
  });
}

test.describe('Announcement Bar - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  for (const page of pages) {
    test(`${page.name} - mobile should not overlap`, async ({ page: pwPage }) => {
      await pwPage.goto(page.path);
      await pwPage.waitForLoadState('networkidle');

      const announcementBar = pwPage.locator('[role="banner"]');
      await expect(announcementBar).toBeVisible();

      const announcementBarBox = await announcementBar.boundingBox();
      expect(announcementBarBox).not.toBeNull();

      const main = pwPage.locator('main');
      const mainBox = await main.boundingBox();
      expect(mainBox).not.toBeNull();

      if (announcementBarBox && mainBox) {
        expect(mainBox.y).toBeGreaterThanOrEqual(announcementBarBox.y + announcementBarBox.height - 5);
      }
    });
  }
});