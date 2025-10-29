import { chromium, FullConfig } from '@playwright/test';
import { TEST_CONFIG } from './fixtures/test-data';

/**
 * Global setup for Playwright tests
 * Runs once before all test suites
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting Playwright test suite...');
  console.log(`📍 Testing against: ${TEST_CONFIG.SITE_URL}`);
  console.log(`🌐 Available browsers: ${config.projects?.map(p => p.name).join(', ')}`);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Pre-warm the site to ensure it's available
    console.log('🔍 Checking site availability...');
    await page.goto(TEST_CONFIG.SITE_URL, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Check if the RecentChanges component is present
    const componentExists = await page.locator(TEST_CONFIG.SELECTORS.RECENT_CHANGES_CONTAINER).count() > 0;

    if (componentExists) {
      console.log('✅ RecentChanges component found and accessible');
    } else {
      console.log('⚠️ RecentChanges component not found - tests may fail');
    }

    // Capture site metadata for test context
    const siteTitle = await page.title();
    console.log(`📄 Site title: "${siteTitle}"`);

    // Check for any console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Wait a bit to collect any startup errors
    await page.waitForTimeout(2000);

    if (consoleErrors.length > 0) {
      console.log(`⚠️ Found ${consoleErrors.length} console errors during setup:`);
      consoleErrors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }

    // Set up test environment variables
    process.env.TEST_START_TIME = new Date().toISOString();
    process.env.TEST_SITE_AVAILABLE = 'true';

    console.log('✅ Global setup completed successfully');

  } catch (error) {
    console.error('❌ Global setup failed:', error);
    process.env.TEST_SITE_AVAILABLE = 'false';
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

export default globalSetup;