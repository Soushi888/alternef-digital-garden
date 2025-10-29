import { defineConfig, devices } from '@playwright/test';
import { TEST_CONFIG } from './tests/fixtures/test-data';

/**
 * Playwright configuration for RecentChanges component testing
 * Supports multiple browsers, devices, and testing environments
 */
export default defineConfig({
  testDir: './tests/e2e',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', {
      outputFolder: './test-results/html',
      open: process.env.CI ? 'never' : 'on-failure'
    }],
    ['json', { outputFile: './test-results/results.json' }],
    ['junit', { outputFile: './test-results/results.xml' }],
    ['list']
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: TEST_CONFIG.SITE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',

    /* Global timeout for each action */
    actionTimeout: 15000,

    /* Global timeout for navigation */
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        contextOptions: {
          // Enable Chrome DevTools for debugging
          ignoreHTTPSErrors: true,
        }
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        ...TEST_CONFIG.DEVICES.MOBILE_SMALL,
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        ...TEST_CONFIG.DEVICES.MOBILE_SMALL,
      },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },

    /* Test with different device sizes */
    {
      name: 'Tablet',
      use: {
        ...devices['iPad Pro'],
        ...TEST_CONFIG.DEVICES.TABLET,
      },
    },

    {
      name: 'Widescreen',
      use: {
        ...devices['Desktop Chrome'],
        viewport: TEST_CONFIG.DEVICES.WIDESCREEN.viewport,
        userAgent: TEST_CONFIG.DEVICES.WIDESCREEN.userAgent,
      },
    },

    /* Accessibility-focused test project */
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
      testMatch: '**/*accessibility*.spec.ts',
      dependencies: ['chromium'],
    },

    /* Performance-focused test project */
    {
      name: 'performance',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
      testMatch: '**/*performance*.spec.ts',
      dependencies: ['chromium'],
    },
  ],

  /* Global setup and teardown */
  globalSetup: require.resolve('./tests/global-setup.ts'),
  globalTeardown: require.resolve('./tests/global-teardown.ts'),

  /* Test timeout */
  timeout: 60000,

  /* Expect timeout */
  expect: {
    timeout: 10000,
  },

  /* Output directory for test artifacts */
  outputDir: './test-results',

  /* Web server configuration for local development */
  webServer: {
    command: 'npm run dev',
    url: TEST_CONFIG.LOCAL_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  /* Global test configuration */
  grep: process.env.GREP ? new RegExp(process.env.GREP) : undefined,
  grepInvert: process.env.GREP_INVERT ? new RegExp(process.env.GREP_INVERT) : undefined,

  /* Metadata for test organization */
  metadata: {
    'Test Environment': process.env.NODE_ENV || 'test',
    'Browser Versions': 'Latest stable',
    'Test Suite': 'RecentChanges Component E2E Tests',
    'Accessibility Standard': 'WCAG 2.1 AA',
    'Performance Standards': 'Core Web Vitals',
  },
});