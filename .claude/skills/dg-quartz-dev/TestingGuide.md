# Testing Guide

## Test Infrastructure

### Unit Tests
- **Runner**: `tsx` (TypeScript execution)
- **Location**: `quartz/util/path.test.ts`, `quartz/depgraph.test.ts`
- **Command**: `npm test`

### E2E Tests
- **Framework**: Playwright
- **Location**: `tests/e2e/`
- **Config**: `playwright.config.ts`

## Playwright Multi-Project Setup

### Browser Projects
| Project | Device | Use Case |
|---------|--------|----------|
| `chromium` | Desktop Chrome | Primary testing |
| `firefox` | Desktop Firefox | Cross-browser |
| `webkit` | Desktop Safari | WebKit compat |
| `Mobile Chrome` | Pixel 5 | Mobile responsive |
| `Mobile Safari` | iPhone 12 | iOS testing |
| `Tablet` | iPad Pro | Tablet layout |
| `Widescreen` | 1920x1080 | Large screens |
| `WCAG 2.1 AA` | -- | Accessibility |
| `Performance` | -- | Core Web Vitals |

### Configuration
```typescript
// Key settings from playwright.config.ts
{
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  timeout: 30000,
  actionTimeout: 15000,
  navigationTimeout: 30000,
  screenshot: "only-on-failure",
  video: "retain-on-failure",
}
```

### Test Commands
```bash
npm run test:e2e              # All tests
npm run test:e2e:chrome       # Chrome only
npm run test:e2e:firefox      # Firefox only
npm run test:e2e:safari       # Safari only
npm run test:e2e:accessibility # WCAG tests
npm run test:e2e:performance  # Core Web Vitals
npm run test:e2e:debug        # Debug mode
npx playwright test tests/e2e/<file>.spec.ts  # Single file
```

### Writing E2E Tests
```typescript
import { test, expect } from "@playwright/test"

test.describe("Component Name", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("should render correctly", async ({ page }) => {
    const element = page.locator(".component-class")
    await expect(element).toBeVisible()
  })

  test("should handle interaction", async ({ page }) => {
    await page.click(".trigger-button")
    await expect(page.locator(".result")).toHaveText("Expected")
  })
})
```

### Accessibility Testing
Uses axe-core via Playwright for WCAG 2.1 AA compliance:
- Color contrast ratios
- ARIA labels and roles
- Keyboard navigation
- Focus management

### Performance Testing
Core Web Vitals via Playwright:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
