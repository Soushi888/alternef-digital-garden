import { Page, Locator } from '@playwright/test';

/**
 * Accessibility testing utilities for WCAG 2.1 AA compliance
 */
export class AccessibilityUtils {
  /**
   * Check if element has proper ARIA labels
   */
  static async checkAriaLabels(element: Locator): Promise<boolean> {
    const ariaLabel = await element.getAttribute('aria-label');
    const ariaLabelledby = await element.getAttribute('aria-labelledby');
    const hasText = await element.textContent();

    return !!(ariaLabel || ariaLabelledby || hasText?.trim());
  }

  /**
   * Check color contrast ratio for text elements
   */
  static async checkColorContrast(page: Page): Promise<Array<{
    element: string;
    contrast: number;
    passes: boolean;
  }>> {
    return page.evaluate(() => {
      const results: Array<{ element: string; contrast: number; passes: boolean }> = [];
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button');

      textElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;

        if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
          const rgb = color.match(/\d+/g);
          const bgRgb = backgroundColor.match(/\d+/g);

          if (rgb && bgRgb) {
            const [r, g, b] = rgb.map(Number);
            const [bgR, bgG, bgB] = bgRgb.map(Number);

            // Simplified contrast ratio calculation
            const l1 = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
            const l2 = 0.2126 * (bgR / 255) + 0.7152 * (bgG / 255) + 0.0722 * (bgB / 255);

            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);
            const contrast = (lighter + 0.05) / (darker + 0.05);

            results.push({
              element: element.tagName.toLowerCase() + (element.className ? '.' + element.className : ''),
              contrast: Math.round(contrast * 100) / 100,
              passes: contrast >= 4.5 // WCAG AA standard
            });
          }
        }
      });

      return results;
    });
  }

  /**
   * Check keyboard navigation support
   */
  static async checkKeyboardNavigation(page: Page): Promise<{
    tabOrder: string[];
    focusableElements: number;
    skippedElements: number;
  }> {
    const results = {
      tabOrder: [] as string[],
      focusableElements: 0,
      skippedElements: 0
    };

    // Get all focusable elements
    const focusableElements = await page.locator('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').all();
    results.focusableElements = focusableElements.length;

    // Test tab navigation
    for (let i = 0; i < focusableElements.length; i++) {
      await page.keyboard.press('Tab');
      const focusedElement = await page.locator(':focus');
      const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
      const className = await focusedElement.evaluate(el => el.className);
      results.tabOrder.push(tagName + (className ? '.' + className : ''));
    }

    return results;
  }

  /**
   * Check semantic HTML structure
   */
  static async checkSemanticStructure(page: Page): Promise<{
    hasHeadings: boolean;
    hasMain: boolean;
    hasNav: boolean;
    headingHierarchy: boolean;
  }> {
    const hasHeadings = await page.locator('h1, h2, h3, h4, h5, h6').count() > 0;
    const hasMain = await page.locator('main, [role="main"]').count() > 0;
    const hasNav = await page.locator('nav, [role="navigation"]').count() > 0;

    // Check heading hierarchy (no skipping levels)
    const headingHierarchy = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      let previousLevel = 0;

      for (const heading of headings) {
        const level = parseInt(heading.tagName.substring(1));
        if (previousLevel > 0 && level > previousLevel + 1) {
          return false;
        }
        previousLevel = level;
      }

      return true;
    });

    return { hasHeadings, hasMain, hasNav, headingHierarchy };
  }

  /**
   * Check screen reader compatibility
   */
  static async checkScreenReaderSupport(page: Page): Promise<{
    hasAltText: boolean;
    hasAriaDescriptions: boolean;
    hasFormLabels: boolean;
    issues: string[];
  }> {
    const issues: string[] = [];

    // Check images have alt text
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    if (imagesWithoutAlt > 0) {
      issues.push(`${imagesWithoutAlt} images missing alt text`);
    }

    // Check form inputs have labels
    const inputsWithoutLabels = await page.locator('input:not([aria-label]):not([aria-labelledby])').count();
    if (inputsWithoutLabels > 0) {
      issues.push(`${inputsWithoutLabels} form inputs missing labels`);
    }

    // Check for proper heading structure
    const hasH1 = await page.locator('h1').count() > 0;
    if (!hasH1) {
      issues.push('Missing h1 heading');
    }

    return {
      hasAltText: imagesWithoutAlt === 0,
      hasAriaDescriptions: await page.locator('[aria-describedby]').count() > 0,
      hasFormLabels: inputsWithoutLabels === 0,
      issues
    };
  }
}