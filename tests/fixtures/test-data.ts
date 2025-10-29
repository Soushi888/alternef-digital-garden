/**
 * Test data and fixtures for RecentChanges component testing
 */
export const TEST_CONFIG = {
  SITE_URL: 'https://soushi888.github.io/alternef-digital-garden',
  LOCAL_URL: 'http://localhost:8080',

  // Component selectors
  SELECTORS: {
    RECENT_CHANGES_CONTAINER: '.recent-changes',
    RECENT_CHANGES_LIST: '.recent-changes-list',
    RECENT_CHANGE_ITEM: '.recent-change-item',
    RECENT_CHANGE_TITLE: '.recent-change-title',
    RECENT_CHANGE_DATE: '.recent-change-date',
    RECENT_CHANGE_LINK: '.recent-change-link',
    RECENT_CHANGE_TYPE: '.recent-change-type',
    RECENT_CHANGE_META: '.recent-change-meta',
    RECENT_CHANGE_EXCERPT: '.recent-change-excerpt',
    RECENT_CHANGE_TAGS: '.recent-change-tags',
    RECENT_CHANGE_TAG: '.recent-change-tag',
    RECENT_CHANGES_MORE: '.recent-changes-more',
  },

  // Test content expectations
  EXPECTED_CONTENT: {
    HOMEPAGE_TITLE: 'Recent Updates',
    RECENT_CHANGES_PAGE_TITLE: 'Recent Changes',
    MIN_ITEMS_HOMEPAGE: 1,
    MAX_ITEMS_HOMEPAGE: 5,
    MIN_ITEMS_DETAILED: 1,
    MAX_ITEMS_DETAILED: 20,
  },

  // Device configurations for responsive testing
  DEVICES: {
    MOBILE_SMALL: {
      name: 'iPhone 12',
      viewport: { width: 390, height: 844 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
      isMobile: true,
      hasTouch: true,
    },
    MOBILE_LARGE: {
      name: 'Samsung Galaxy S21',
      viewport: { width: 384, height: 854 },
      userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36',
      isMobile: true,
      hasTouch: true,
    },
    TABLET: {
      name: 'iPad Pro',
      viewport: { width: 1024, height: 1366 },
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
      isMobile: true,
      hasTouch: true,
    },
    DESKTOP: {
      name: 'Desktop',
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      isMobile: false,
      hasTouch: false,
    },
    WIDESCREEN: {
      name: 'Widescreen',
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      isMobile: false,
      hasTouch: false,
    },
  },

  // Performance thresholds
  PERFORMANCE_THRESHOLDS: {
    MAX_RENDER_TIME: 1000, // ms
    MAX_PAGE_LOAD: 3000, // ms
    MAX_MEMORY_USAGE: 50 * 1024 * 1024, // 50MB
    MIN_LCP: 2500, // Largest Contentful Paint
    MAX_FID: 100, // First Input Delay
    MAX_CLS: 0.1, // Cumulative Layout Shift
  },

  // Accessibility thresholds
  ACCESSIBILITY_THRESHOLDS: {
    MIN_CONTRAST_RATIO: 4.5,
    MAX_TAB_ELEMENTS: 100,
    MIN_FOCUSABLE_ELEMENTS: 1,
  },

  // Date formatting patterns to test
  DATE_PATTERNS: {
    RELATIVE: ['just now', 'minutes ago', 'hours ago', 'days ago', 'weeks ago', 'months ago', 'years ago', 'yesterday'],
    ABSOLUTE: [] // Not used in this implementation, but kept for reference
  },

  // Sample content types
  CONTENT_TYPES: {
    CREATED: 'created',
    MODIFIED: 'updated',
  },

  // Browser configurations
  BROWSERS: [
    'chromium',
    'firefox',
    'webkit', // Safari
  ],

  // Test scenarios
  TEST_SCENARIOS: {
    HOMEPAGE: {
      path: '/',
      expectedTitle: 'Recent Updates',
      maxItems: 5,
      detailed: false,
    },
    RECENT_CHANGES_PAGE: {
      path: '/recent-changes',
      expectedTitle: 'Recent Changes',
      maxItems: 20,
      detailed: true,
    },
  },
};

/**
 * Mock data for testing (used only when real data is unavailable)
 */
export const MOCK_RECENT_CHANGES_DATA = [
  {
    id: 'test-article-1-created',
    title: 'Test Article 1',
    link: '/test-article-1',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    type: 'created',
    excerpt: 'This is a test article created recently.',
    tags: ['test', 'article'],
  },
  {
    id: 'test-article-2-updated',
    title: 'Test Article 2',
    link: '/test-article-2',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    type: 'modified',
    excerpt: 'This is a test article that was recently updated.',
    tags: ['test', 'updated'],
  },
  {
    id: 'test-article-3-created',
    title: 'Test Article 3',
    link: '/test-article-3',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    type: 'created',
    excerpt: 'Another test article created for testing purposes.',
    tags: ['test'],
  },
];

/**
 * Helper functions for test data
 */
export const TestDataHelpers = {
  /**
   * Generate a random date within the last 30 days
   */
  randomRecentDate(): Date {
    const daysAgo = Math.floor(Math.random() * 30);
    return new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  },

  /**
   * Format date the same way the component does
   */
  formatDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return diffMinutes <= 1 ? "just now" : `${diffMinutes} minutes ago`;
      }
      return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    }

    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }

    const months = Math.floor(diffDays / 30);
    if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;

    const years = Math.floor(months / 12);
    return years === 1 ? "1 year ago" : `${years} years ago`;
  },

  /**
   * Wait for a specified time (for testing loading states)
   */
  async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Check if a URL is valid
   */
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};