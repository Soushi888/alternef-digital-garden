import { Page, Locator, expect } from '@playwright/test';
import { TEST_CONFIG } from '../fixtures/test-data';

/**
 * Helper utilities for Playwright testing
 */
export class TestHelpers {
  /**
   * Wait for component to be fully loaded and visible
   */
  static async waitForComponent(page: Page, selector: string = TEST_CONFIG.SELECTORS.RECENT_CHANGES_CONTAINER): Promise<Locator> {
    const component = page.locator(selector);
    await component.waitFor({ state: 'visible', timeout: 15000 });
    return component;
  }

  /**
   * Check if element is visible and has content
   */
  static async isElementVisibleWithContent(page: Page, selector: string): Promise<boolean> {
    const element = page.locator(selector);
    const isVisible = await element.isVisible();
    const hasContent = (await element.textContent())?.trim().length > 0;
    return isVisible && hasContent;
  }

  /**
   * Get all recent change items with their data
   */
  static async getRecentChangeItems(page: Page): Promise<Array<{
    title: string;
    link: string;
    date: string;
    type: string;
    excerpt?: string;
    tags?: string[];
  }>> {
    const items = page.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_ITEM);
    const itemCount = await items.count();
    const result = [];

    for (let i = 0; i < itemCount; i++) {
      const item = items.nth(i);

      const title = await item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_TITLE).textContent() || '';
      const link = await item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_LINK).getAttribute('href') || '';
      const date = await item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_DATE).textContent() || '';
      const type = await item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_TYPE).textContent() || '';

      let excerpt: string | undefined;
      let tags: string[] | undefined;

      // Get excerpt if available (detailed view)
      const excerptElement = item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_EXCERPT);
      if (await excerptElement.isVisible()) {
        excerpt = await excerptElement.textContent() || undefined;
      }

      // Get tags if available (detailed view)
      const tagContainer = item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_TAGS);
      if (await tagContainer.isVisible()) {
        const tagElements = tagContainer.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_TAG);
        const tagCount = await tagElements.count();
        tags = [];

        for (let j = 0; j < tagCount; j++) {
          const tagText = await tagElements.nth(j).textContent();
          if (tagText) tags.push(tagText);
        }
      }

      result.push({
        title: title.trim(),
        link: link.trim(),
        date: date.trim(),
        type: type.trim(),
        excerpt,
        tags
      });
    }

    return result;
  }

  /**
   * Take screenshot with automatic naming
   */
  static async takeScreenshot(page: Page, testName: string, step?: string): Promise<void> {
    const filename = step ? `${testName}-${step}.png` : `${testName}.png`;
    await page.screenshot({
      path: `./test-results/screenshots/${filename}`,
      fullPage: true
    });
  }

  /**
   * Check if date is properly formatted relative time
   */
  static isValidRelativeDate(dateString: string): boolean {
    const patterns = [
      /just now/i,
      /\d+ minutes? ago/i,
      /\d+ hours? ago/i,
      /yesterday/i,
      /\d+ days? ago/i,
      /\d+ weeks? ago/i,
      /\d+ months? ago/i,
      /\d+ years? ago/i
    ];

    return patterns.some(pattern => pattern.test(dateString));
  }

  /**
   * Generate random test data
   */
  static generateTestData(count: number = 5): Array<{
    id: string;
    title: string;
    link: string;
    date: Date;
    type: 'created' | 'modified';
    excerpt?: string;
    tags?: string[];
  }> {
    const items = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

      items.push({
        id: `test-item-${i}`,
        title: `Test Item ${i + 1}`,
        link: `/test-item-${i + 1}`,
        date,
        type: Math.random() > 0.5 ? 'created' : 'modified',
        excerpt: `This is a test excerpt for item ${i + 1}`,
        tags: [`tag${i + 1}`, 'test', 'sample']
      });
    }

    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * Assert component structure
   */
  static async assertComponentStructure(page: Page, isDetailed: boolean = false): Promise<void> {
    const container = await this.waitForComponent(page);

    // Check main container
    await expect(container).toBeVisible();
    await expect(container.locator('h3')).toBeVisible();

    // Check list
    const list = page.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGES_LIST);
    await expect(list).toBeVisible();

    // Check items exist
    const items = page.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_ITEM);
    const itemCount = await items.count();
    expect(itemCount).toBeGreaterThan(0);

    // Check each item structure
    for (let i = 0; i < Math.min(itemCount, 3); i++) {
      const item = items.nth(i);

      // Check basic elements
      await expect(item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_LINK)).toBeVisible();
      await expect(item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_TITLE)).toBeVisible();
      await expect(item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_META)).toBeVisible();
      await expect(item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_TYPE)).toBeVisible();
      await expect(item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_DATE)).toBeVisible();

      // Check detailed view elements
      if (isDetailed) {
        const excerpt = item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_EXCERPT);
        const tags = item.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_TAGS);

        // Excerpts and tags may or may not be present depending on data
        if (await excerpt.count() > 0) {
          await expect(excerpt.first()).toBeVisible();
        }

        if (await tags.count() > 0) {
          await expect(tags.first()).toBeVisible();
        }
      }
    }
  }

  /**
   * Test responsive behavior
   */
  static async testResponsiveBehavior(page: Page, viewport: { width: number; height: number }): Promise<void> {
    await page.setViewportSize(viewport);

    const container = await this.waitForComponent(page);
    await expect(container).toBeVisible();

    // Check if component adapts to viewport
    const containerBox = await container.boundingBox();
    expect(containerBox).toBeTruthy();
    expect(containerBox!.width).toBeLessThanOrEqual(viewport.width);

    // Check items are still properly displayed
    const items = page.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_ITEM);
    const itemCount = await items.count();

    if (itemCount > 0) {
      const firstItem = items.first();
      await expect(firstItem).toBeVisible();

      // Check if content is readable (not overlapping)
      const title = firstItem.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_TITLE);
      const titleBox = await title.boundingBox();
      expect(titleBox).toBeTruthy();
      expect(titleBox!.width).toBeGreaterThan(0);
    }
  }

  /**
   * Measure element visibility
   */
  static async getElementVisibility(page: Page, selector: string): Promise<{
    visible: boolean;
    inViewport: boolean;
    opacity: number;
    display: string;
  }> {
    const element = page.locator(selector);

    const visible = await element.isVisible();
    const inViewport = await element.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.left >= 0 &&
             rect.bottom <= window.innerHeight &&
             rect.right <= window.innerWidth;
    });

    const computedStyle = await element.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        opacity: parseFloat(style.opacity),
        display: style.display
      };
    });

    return {
      visible,
      inViewport,
      opacity: computedStyle.opacity,
      display: computedStyle.display
    };
  }

  /**
   * Simulate user interaction
   */
  static async simulateUserInteraction(page: Page): Promise<void> {
    // Hover over items
    const items = page.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGE_ITEM);
    const itemCount = await items.count();

    for (let i = 0; i < Math.min(itemCount, 3); i++) {
      await items.nth(i).hover();
      await page.waitForTimeout(500);
    }

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    // Test scrolling
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
  }
}