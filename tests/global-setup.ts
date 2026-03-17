import { FullConfig } from '@playwright/test';
import { TEST_CONFIG } from './fixtures/test-data';

/**
 * Global setup for Playwright tests
 * Runs once before all test suites
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting Playwright test suite...');
  console.log(`📍 Testing against: ${TEST_CONFIG.SITE_URL}`);
  console.log(`🌐 Available browsers: ${config.projects?.map(p => p.name).join(', ')}`);

  try {
    // Pre-warm the site using fetch — no browser dependency, works on all shards
    console.log('🔍 Checking site availability...');
    const response = await fetch(TEST_CONFIG.SITE_URL, { signal: AbortSignal.timeout(30000) });

    if (response.ok) {
      const html = await response.text();
      const componentExists = html.includes('recent-changes');
      if (componentExists) {
        console.log('✅ RecentChanges component found and accessible');
      } else {
        console.log('⚠️ RecentChanges component not found - tests may fail');
      }
    } else {
      console.log(`⚠️ Site returned HTTP ${response.status} - tests may fail`);
    }

    // Set up test environment variables
    process.env.TEST_START_TIME = new Date().toISOString();
    process.env.TEST_SITE_AVAILABLE = 'true';

    console.log('✅ Global setup completed successfully');

  } catch (error) {
    console.error('❌ Global setup failed:', error);
    process.env.TEST_SITE_AVAILABLE = 'false';
    throw error;
  }
}

export default globalSetup;
