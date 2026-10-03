import { FullConfig } from "@playwright/test"
import fs from "fs"
import path from "path"

/**
 * Global teardown for Playwright tests
 * Runs once after all test suites
 */
async function globalTeardown(config: FullConfig) {
  console.log("🏁 Playwright test suite completed")

  const startTime = process.env.TEST_START_TIME
  if (startTime) {
    const endTime = new Date()
    const duration = endTime.getTime() - new Date(startTime).getTime()
    console.log(`⏱️ Total test duration: ${Math.round(duration / 1000)} seconds`)
  }

  // Clean up any temporary files or resources
  const tempDir = path.join(process.cwd(), "temp")
  if (fs.existsSync(tempDir)) {
    try {
      const files = fs.readdirSync(tempDir)
      if (files.length > 0) {
        console.log(`🧹 Cleaning up ${files.length} temporary files...`)
      }
    } catch (error) {
      console.log("⚠️ Could not clean up temporary files:", error)
    }
  }

  console.log("✅ Global teardown completed")
  console.log("📊 Test results available in ./test-results/")
  console.log("📈 HTML report: ./test-results/html/index.html")
}

export default globalTeardown
