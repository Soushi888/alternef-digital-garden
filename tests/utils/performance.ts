import { Page } from '@playwright/test';

/**
 * Performance testing utilities for web components
 */
export class PerformanceUtils {
  /**
   * Measure page load performance metrics
   */
  static async measurePageLoad(page: Page): Promise<{
    domContentLoaded: number;
    loadComplete: number;
    firstPaint: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
  }> {
    return page.evaluate(() => {
      return new Promise((resolve) => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');

        const metrics = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
          loadComplete: navigation.loadEventEnd - navigation.navigationStart,
          firstPaint: 0,
          firstContentfulPaint: 0,
          largestContentfulPaint: 0
        };

        paint.forEach((entry) => {
          if (entry.name === 'first-paint') {
            metrics.firstPaint = entry.startTime;
          } else if (entry.name === 'first-contentful-paint') {
            metrics.firstContentfulPaint = entry.startTime;
          }
        });

        // Try to get LCP if available
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.largestContentfulPaint = lastEntry.startTime;
          resolve(metrics);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Fallback if LCP observer doesn't fire quickly
        setTimeout(() => resolve(metrics), 2000);
      });
    });
  }

  /**
   * Measure component rendering performance
   */
  static async measureComponentRender(page: Page, componentSelector: string): Promise<{
    renderTime: number;
    elementCount: number;
    domNodes: number;
  }> {
    const startTime = Date.now();

    const elementCount = await page.locator(componentSelector).count();

    const metrics = await page.evaluate((selector) => {
      const component = document.querySelector(selector);
      if (!component) return { domNodes: 0 };

      const walker = document.createTreeWalker(
        component,
        NodeFilter.SHOW_ALL,
        null
      );

      let nodeCount = 0;
      while (walker.nextNode()) {
        nodeCount++;
      }

      return { domNodes: nodeCount };
    }, componentSelector);

    const renderTime = Date.now() - startTime;

    return {
      renderTime,
      elementCount,
      domNodes: metrics.domNodes
    };
  }

  /**
   * Check memory usage
   */
  static async checkMemoryUsage(page: Page): Promise<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  }> {
    return page.evaluate(() => {
      const performance = (window as any).performance;
      if (performance && performance.memory) {
        return {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        };
      }
      return {
        usedJSHeapSize: 0,
        totalJSHeapSize: 0,
        jsHeapSizeLimit: 0
      };
    });
  }

  /**
   * Measure network performance
   */
  static async measureNetworkPerformance(page: Page): Promise<{
    totalRequests: number;
    totalSize: number;
    slowRequests: Array<{ url: string; duration: number }>;
  }> {
    const requests: Array<{ url: string; duration: number; size: number }> = [];

    page.on('response', async (response) => {
      const url = response.url();
      const timing = await response.request().timing();
      const duration = timing.responseEnd - timing.requestStart;

      // Estimate size from headers if available
      const contentLength = response.headers()['content-length'];
      const size = contentLength ? parseInt(contentLength) : 0;

      requests.push({ url, duration, size });
    });

    // Wait a bit for all requests to complete
    await page.waitForTimeout(2000);

    const totalRequests = requests.length;
    const totalSize = requests.reduce((sum, req) => sum + req.size, 0);
    const slowRequests = requests.filter(req => req.duration > 1000); // requests taking > 1s

    return {
      totalRequests,
      totalSize,
      slowRequests
    };
  }

  /**
   * Check Core Web Vitals
   */
  static async checkCoreWebVitals(page: Page): Promise<{
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  }> {
    return page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals = { lcp: 0, fid: 0, cls: 0 };

        // LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime;
          checkComplete();
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (approximation using first input)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            vitals.fid = entries[0].processingStart - entries[0].startTime;
          }
          checkComplete();
        }).observe({ entryTypes: ['first-input'] });

        // CLS
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          vitals.cls = clsValue;
          checkComplete();
        }).observe({ entryTypes: ['layout-shift'] });

        let timeoutId: NodeJS.Timeout;
        const checkComplete = () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => resolve(vitals), 500);
        };

        // Fallback timeout
        setTimeout(() => resolve(vitals), 5000);
      });
    });
  }

  /**
   * Analyze bundle size impact
   */
  static async analyzeBundleSize(page: Page): Promise<{
    jsSize: number;
    cssSize: number;
    imageSize: number;
    totalSize: number;
  }> {
    const resources = await page.evaluate(() => {
      const performanceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      const analysis = {
        jsSize: 0,
        cssSize: 0,
        imageSize: 0,
        totalSize: 0
      };

      performanceEntries.forEach((entry) => {
        const size = entry.transferSize || 0;
        analysis.totalSize += size;

        if (entry.name.endsWith('.js')) {
          analysis.jsSize += size;
        } else if (entry.name.endsWith('.css')) {
          analysis.cssSize += size;
        } else if (entry.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
          analysis.imageSize += size;
        }
      });

      return analysis;
    });

    return resources;
  }
}