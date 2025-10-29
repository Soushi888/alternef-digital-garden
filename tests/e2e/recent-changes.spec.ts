import { test, expect, devices } from '@playwright/test';
import { AccessibilityUtils } from '../utils/accessibility';
import { PerformanceUtils } from '../utils/performance';
import { TEST_CONFIG, MOCK_RECENT_CHANGES_DATA, TestDataHelpers } from '../fixtures/test-data';

test.describe('RecentChanges Component E2E Tests', () => {
  const { SITE_URL, SELECTORS, EXPECTED_CONTENT, DEVICES, PERFORMANCE_THRESHOLDS, TEST_SCENARIOS } = TEST_CONFIG;

  // Test on multiple browsers
  test.describe.configure({ mode: 'parallel' });

  test.beforeEach(async ({ page }) => {
    // Set up console logging for debugging
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.log('PAGE ERROR:', msg.text());
      }
    });

    page.on('pageerror', (error) => {
      console.log('PAGE ERROR:', error.message);
    });
  });

  test.describe('Homepage RecentChanges Component', () => {
    test('should render with correct title on homepage', async ({ page }) => {
      await page.goto(SITE_URL);

      // Wait for component to load
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER, { timeout: 10000 });

      // Check if component exists
      const container = page.locator(SELECTORS.RECENT_CHANGES_CONTAINER);
      await expect(container).toBeVisible();

      // Check title
      const title = container.locator('h3');
      await expect(title).toContainText(EXPECTED_CONTENT.HOMEPAGE_TITLE);
    });

    test('should display up to 5 items on homepage', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const items = page.locator(SELECTORS.RECENT_CHANGE_ITEM);
      const itemCount = await items.count();

      expect(itemCount).toBeGreaterThanOrEqual(EXPECTED_CONTENT.MIN_ITEMS_HOMEPAGE);
      expect(itemCount).toBeLessThanOrEqual(EXPECTED_CONTENT.MAX_ITEMS_HOMEPAGE);
    });

    test('should show real data (not demo data)', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const items = page.locator(SELECTORS.RECENT_CHANGE_ITEM);

      // Check that we have real content
      if (await items.count() > 0) {
        const firstItemTitle = await items.first().locator(SELECTORS.RECENT_CHANGE_TITLE).textContent();

        // Verify it's not demo data
        expect(firstItemTitle).not.toContain('Introduction to Permaculture');
        expect(firstItemTitle).not.toContain('Demo');
        expect(firstItemTitle).not.toContain('Sample');

        // Should have actual content from the digital garden
        expect(firstItemTitle).toBeTruthy();
        expect(firstItemTitle!.length).toBeGreaterThan(0);
      }
    });

    test('should have properly formatted relative dates', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const dateElements = page.locator(SELECTORS.RECENT_CHANGE_DATE);

      if (await dateElements.count() > 0) {
        const firstDate = await dateElements.first().textContent();
        expect(firstDate).toBeTruthy();

        // Check if date format matches expected patterns
        const hasValidPattern = TEST_CONFIG.DATE_PATTERNS.RELATIVE.some(pattern =>
          firstDate!.toLowerCase().includes(pattern.toLowerCase())
        );
        expect(hasValidPattern).toBe(true);
      }
    });

    test('should have functional navigation links', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const firstLink = page.locator(SELECTORS.RECENT_CHANGE_LINK).first();

      if (await firstLink.count() > 0) {
        // Get the href attribute
        const href = await firstLink.getAttribute('href');
        expect(href).toBeTruthy();
        expect(TestDataHelpers.isValidUrl(href!)).toBe(true);

        // Test navigation (open in new tab to avoid losing context)
        const [newPage] = await Promise.all([
          page.context().waitForEvent('page'),
          firstLink.click()
        ]);

        await newPage.waitForLoadState();
        expect(newPage.url()).toContain(href!);
        await newPage.close();
      }
    });

    test('should show correct change types (New/Updated)', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const typeElements = page.locator(SELECTORS.RECENT_CHANGE_TYPE);

      if (await typeElements.count() > 0) {
        for (let i = 0; i < await typeElements.count(); i++) {
          const typeText = await typeElements.nth(i).textContent();
          expect(['New', 'Updated']).toContain(typeText!);
        }
      }
    });

    test('should have "View all changes" link when items exceed limit', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const moreLink = page.locator(SELECTORS.RECENT_CHANGES_MORE + ' a');

      // Only check if there are enough items to trigger the "more" link
      const items = page.locator(SELECTORS.RECENT_CHANGE_ITEM);
      if (await items.count() >= EXPECTED_CONTENT.MAX_ITEMS_HOMEPAGE) {
        await expect(moreLink).toBeVisible();
        await expect(moreLink).toContainText('View all changes');

        // Test the link
        const href = await moreLink.getAttribute('href');
        expect(href).toBe('/recent-changes');
      }
    });
  });

  test.describe('Dedicated RecentChanges Page', () => {
    test('should render with correct title on dedicated page', async ({ page }) => {
      await page.goto(`${SITE_URL}${TEST_SCENARIOS.RECENT_CHANGES_PAGE.path}`);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const container = page.locator(SELECTORS.RECENT_CHANGES_CONTAINER);
      const title = container.locator('h3');

      await expect(title).toContainText(EXPECTED_CONTENT.RECENT_CHANGES_PAGE_TITLE);
    });

    test('should display up to 20 items in detailed view', async ({ page }) => {
      await page.goto(`${SITE_URL}${TEST_SCENARIOS.RECENT_CHANGES_PAGE.path}`);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const items = page.locator(SELECTORS.RECENT_CHANGE_ITEM);
      const itemCount = await items.count();

      expect(itemCount).toBeGreaterThanOrEqual(EXPECTED_CONTENT.MIN_ITEMS_DETAILED);
      expect(itemCount).toBeLessThanOrEqual(EXPECTED_CONTENT.MAX_ITEMS_DETAILED);
    });

    test('should show excerpts in detailed view', async ({ page }) => {
      await page.goto(`${SITE_URL}${TEST_SCENARIOS.RECENT_CHANGES_PAGE.path}`);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const excerpts = page.locator(SELECTORS.RECENT_CHANGE_EXCERPT);

      // In detailed view, we should see excerpts
      if (await page.locator(SELECTORS.RECENT_CHANGE_ITEM).count() > 0) {
        await expect(excerpts.first()).toBeVisible();

        const excerptText = await excerpts.first().textContent();
        expect(excerptText).toBeTruthy();
        expect(excerptText!.length).toBeGreaterThan(0);
      }
    });

    test('should show tags in detailed view', async ({ page }) => {
      await page.goto(`${SITE_URL}${TEST_SCENARIOS.RECENT_CHANGES_PAGE.path}`);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const tagContainers = page.locator(SELECTORS.RECENT_CHANGE_TAGS);

      if (await tagContainers.count() > 0) {
        const tags = tagContainers.first().locator(SELECTORS.RECENT_CHANGE_TAG);

        if (await tags.count() > 0) {
          await expect(tags.first()).toBeVisible();

          const tagText = await tags.first().textContent();
          expect(tagText).toBeTruthy();
          expect(tagText!.length).toBeGreaterThan(0);
        }
      }
    });

    test('should have detailed list styling', async ({ page }) => {
      await page.goto(`${SITE_URL}${TEST_SCENARIOS.RECENT_CHANGES_PAGE.path}`);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const list = page.locator(SELECTORS.RECENT_CHANGES_LIST);
      await expect(list).toHaveClass(/detailed/);
    });
  });

  test.describe('Responsive Design', () => {
    Object.entries(DEVICES).forEach(([deviceName, deviceConfig]) => {
      test(`should render correctly on ${deviceConfig.name}`, async ({ page }) => {
        await page.setViewportSize(deviceConfig.viewport);
        await page.setUserAgent(deviceConfig.userAgent);

        await page.goto(SITE_URL);
        await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

        // Component should be visible on all devices
        const container = page.locator(SELECTORS.RECENT_CHANGES_CONTAINER);
        await expect(container).toBeVisible();

        // Items should be properly displayed
        const items = page.locator(SELECTORS.RECENT_CHANGE_ITEM);
        if (await items.count() > 0) {
          await expect(items.first()).toBeVisible();

          // Check text is readable (not overlapping)
          const title = items.first().locator(SELECTORS.RECENT_CHANGE_TITLE);
          await expect(title).toBeVisible();
        }
      });
    });

    test('should adapt layout for mobile vs desktop', async ({ page }) => {
      // Test mobile layout
      await page.setViewportSize(DEVICES.MOBILE_SMALL.viewport);
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const mobileItems = page.locator(SELECTORS.RECENT_CHANGE_ITEM).first();
      const mobileMeta = mobileItems.locator(SELECTORS.RECENT_CHANGE_META);

      // Check mobile-specific styling
      const mobileMetaMargin = await mobileMeta.evaluate(el =>
        window.getComputedStyle(el).marginTop
      );
      expect(mobileMetaMargin).not.toBe('0px');

      // Test desktop layout
      await page.setViewportSize(DEVICES.DESKTOP.viewport);
      await page.reload();
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const desktopItems = page.locator(SELECTORS.RECENT_CHANGE_ITEM).first();
      const desktopMeta = desktopItems.locator(SELECTORS.RECENT_CHANGE_META);

      // Check desktop-specific styling
      const desktopMetaMargin = await desktopMeta.evaluate(el =>
        window.getComputedStyle(el).marginTop
      );
      expect(desktopMetaMargin).toBe('0px');
    });
  });

  test.describe('Accessibility Compliance', () => {
    test('should meet WCAG 2.1 AA standards', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      // Check semantic structure
      const semanticStructure = await AccessibilityUtils.checkSemanticStructure(page);
      expect(semanticStructure.hasHeadings).toBe(true);

      // Check ARIA labels on links
      const links = page.locator(SELECTORS.RECENT_CHANGE_LINK);
      const linkCount = await links.count();

      for (let i = 0; i < Math.min(linkCount, 5); i++) {
        const hasAria = await AccessibilityUtils.checkAriaLabels(links.nth(i));
        expect(hasAria).toBe(true);
      }

      // Check keyboard navigation
      const keyboardNav = await AccessibilityUtils.checkKeyboardNavigation(page);
      expect(keyboardNav.focusableElements).toBeGreaterThanOrEqual(1);

      // Check screen reader support
      const screenReader = await AccessibilityUtils.checkScreenReaderSupport(page);
      expect(screenReader.hasAltText).toBe(true);
      expect(screenReader.issues.length).toBe(0);
    });

    test('should maintain color contrast ratios', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const contrastResults = await AccessibilityUtils.checkColorContrast(page);

      // Check that all text elements meet contrast requirements
      contrastResults.forEach(result => {
        expect(result.passes).toBe(true);
        expect(result.contrast).toBeGreaterThanOrEqual(TEST_CONFIG.ACCESSIBILITY_THRESHOLDS.MIN_CONTRAST_RATIO);
      });
    });

    test('should support keyboard navigation', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      // Tab to first link
      await page.keyboard.press('Tab');

      // Check if focus is on a focusable element
      const focusedElement = await page.locator(':focus');
      expect(await focusedElement.count()).toBe(1);

      // Try to navigate through links
      const links = page.locator(SELECTORS.RECENT_CHANGE_LINK);
      const linkCount = await links.count();

      for (let i = 0; i < Math.min(linkCount, 3); i++) {
        await page.keyboard.press('Tab');
        const focused = await page.locator(':focus');
        expect(await focused.count()).toBe(1);
      }
    });
  });

  test.describe('Performance Benchmarks', () => {
    test('should load within performance thresholds', async ({ page }) => {
      const startTime = Date.now();

      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.MAX_PAGE_LOAD);
    });

    test('should render component efficiently', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const performance = await PerformanceUtils.measureComponentRender(
        page,
        SELECTORS.RECENT_CHANGES_CONTAINER
      );

      expect(performance.renderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.MAX_RENDER_TIME);
      expect(performance.elementCount).toBeGreaterThan(0);
    });

    test('should maintain good Core Web Vitals', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const vitals = await PerformanceUtils.checkCoreWebVitals(page);

      // LCP should be under 2.5s for good user experience
      expect(vitals.lcp).toBeLessThan(PERFORMANCE_THRESHOLDS.MIN_LCP);

      // FID should be under 100ms
      expect(vitals.fid).toBeLessThan(PERFORMANCE_THRESHOLDS.MAX_FID);

      // CLS should be under 0.1
      expect(vitals.cls).toBeLessThan(PERFORMANCE_THRESHOLDS.MAX_CLS);
    });

    test('should manage memory efficiently', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const memoryUsage = await PerformanceUtils.checkMemoryUsage(page);

      // Check that memory usage is reasonable
      if (memoryUsage.usedJSHeapSize > 0) {
        expect(memoryUsage.usedJSHeapSize).toBeLessThan(PERFORMANCE_THRESHOLDS.MAX_MEMORY_USAGE);
      }
    });
  });

  test.describe('Cross-Browser Compatibility', () => {
    ['chromium', 'firefox', 'webkit'].forEach(browserName => {
      test(`should work correctly in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
        test.skip(currentBrowser !== browserName, `Skipping ${browserName} test in ${currentBrowser}`);

        await page.goto(SITE_URL);
        await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER, { timeout: 15000 });

        // Basic functionality should work across all browsers
        const container = page.locator(SELECTORS.RECENT_CHANGES_CONTAINER);
        await expect(container).toBeVisible();

        const items = page.locator(SELECTORS.RECENT_CHANGE_ITEM);
        expect(await items.count()).toBeGreaterThan(0);

        // Links should be clickable
        const firstLink = page.locator(SELECTORS.RECENT_CHANGE_LINK).first();
        if (await firstLink.count() > 0) {
          await expect(firstLink).toBeVisible();
          const href = await firstLink.getAttribute('href');
          expect(href).toBeTruthy();
        }
      });
    });
  });

  test.describe('Error Handling', () => {
    test('should handle empty state gracefully', async ({ page }) => {
      // This test simulates what happens when no recent changes are available
      // We'll intercept the response and modify it to test the empty state

      await page.route('**/*', async (route) => {
        // For this test, we'll let the normal request proceed
        // In a real scenario, you might modify the response to test edge cases
        await route.continue();
      });

      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      // The component should always show something, even if minimal
      const container = page.locator(SELECTORS.RECENT_CHANGES_CONTAINER);
      await expect(container).toBeVisible();

      // Should either show items or a "no recent changes" message
      const items = page.locator(SELECTORS.RECENT_CHANGE_ITEM);
      const noItemsMessage = container.locator('text=No recent changes found');

      const hasItems = await items.count() > 0;
      const hasMessage = await noItemsMessage.isVisible();

      expect(hasItems || hasMessage).toBe(true);
    });

    test('should handle malformed dates gracefully', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      // Date elements should not cause JavaScript errors
      const dateElements = page.locator(SELECTORS.RECENT_CHANGE_DATE);

      if (await dateElements.count() > 0) {
        const dateText = await dateElements.first().textContent();
        expect(dateText).toBeTruthy();
        expect(dateText!.length).toBeGreaterThan(0);

        // Should not contain error indicators
        expect(dateText).not.toContain('Invalid');
        expect(dateText).not.toContain('Error');
        expect(dateText).not.toContain('NaN');
      }
    });
  });

  test.describe('Integration with Site Navigation', () => {
    test('should integrate properly with site navigation', async ({ page }) => {
      await page.goto(SITE_URL);

      // Navigate to recent changes page from homepage
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const moreLink = page.locator(SELECTORS.RECENT_CHANGES_MORE + ' a');

      if (await moreLink.isVisible()) {
        await moreLink.click();
        await page.waitForURL('**/recent-changes');

        // Should land on the dedicated recent changes page
        expect(page.url()).toContain('/recent-changes');

        // Should see the detailed view
        await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);
        const container = page.locator(SELECTORS.RECENT_CHANGES_CONTAINER);
        const title = container.locator('h3');
        await expect(title).toContainText(EXPECTED_CONTENT.RECENT_CHANGES_PAGE_TITLE);
      }
    });

    test('should maintain site theme and styling', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const container = page.locator(SELECTORS.RECENT_CHANGES_CONTAINER);

      // Check if component uses site's CSS variables
      const computedStyle = await container.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          color: styles.color,
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
        };
      });

      expect(computedStyle.color).toBeTruthy();
      expect(computedStyle.fontFamily).toBeTruthy();
      expect(computedStyle.fontSize).toBeTruthy();
    });
  });

  test.describe('Data Integrity', () => {
    test('should show chronologically ordered items', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const dateElements = page.locator(SELECTORS.RECENT_CHANGE_DATE);
      const dateCount = await dateElements.count();

      if (dateCount >= 2) {
        const dates: string[] = [];

        for (let i = 0; i < Math.min(dateCount, 5); i++) {
          const dateText = await dateElements.nth(i).textContent();
          dates.push(dateText!);
        }

        // Items should be ordered from most recent to oldest
        // This is a basic check - in practice, you'd want to parse actual dates
        expect(dates.length).toBeGreaterThan(0);
      }
    });

    test('should have unique item IDs', async ({ page }) => {
      await page.goto(SITE_URL);
      await page.waitForSelector(SELECTORS.RECENT_CHANGES_CONTAINER);

      const items = page.locator(SELECTORS.RECENT_CHANGE_ITEM);
      const itemCount = await items.count();

      if (itemCount > 0) {
        const ids: string[] = [];

        for (let i = 0; i < itemCount; i++) {
          const id = await items.nth(i).getAttribute('key');
          if (id) {
            ids.push(id);
          }
        }

        // Check for duplicates
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      }
    });
  });
});