# RecentChanges Component E2E Tests

Comprehensive Playwright test suite for the RecentChanges component in the Quartz digital garden.

## 📁 Test Structure

```
tests/
├── e2e/
│   └── recent-changes.spec.ts    # Main test suite
├── fixtures/
│   └── test-data.ts              # Test data and configuration
├── utils/
│   ├── accessibility.ts         # Accessibility testing utilities
│   ├── performance.ts           # Performance testing utilities
│   └── test-helpers.ts          # General test helpers
├── global-setup.ts              # Global test setup
├── global-teardown.ts           # Global test teardown
└── README.md                    # This file
```

## 🚀 Quick Start

### Installation

```bash
# Install Playwright browsers
npm run test:e2e:install

# Or using yarn
yarn test:e2e:install
```

### Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests in headed mode (visible browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug

# Run specific test file
npm run test:recent-changes
```

### Browser-Specific Tests

```bash
# Chrome/Chromium only
npm run test:e2e:chrome

# Firefox only
npm run test:e2e:firefox

# Safari/WebKit only
npm run test:e2e:safari

# Mobile testing
npm run test:e2e:mobile
```

### Specialized Test Suites

```bash
# Accessibility compliance tests
npm run test:e2e:accessibility

# Performance benchmarks
npm run test:e2e:performance
```

## 📊 Test Coverage

### Functional Testing

- ✅ Component rendering on homepage
- ✅ Component rendering on dedicated page
- ✅ Real data integration (no demo data)
- ✅ Date formatting (relative time)
- ✅ Link navigation functionality
- ✅ Change type indicators (New/Updated)
- ✅ Excerpts in detailed view
- ✅ Tags in detailed view
- ✅ "View all changes" link functionality

### Responsive Design

- ✅ Mobile devices (iPhone 12, Samsung Galaxy S21)
- ✅ Tablet devices (iPad Pro)
- ✅ Desktop layouts (standard, widescreen)
- ✅ Layout adaptation breakpoints
- ✅ Touch interaction support

### Accessibility Compliance (WCAG 2.1 AA)

- ✅ Semantic HTML structure
- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation support
- ✅ Color contrast ratios
- ✅ Screen reader compatibility
- ✅ Focus management

### Performance Benchmarks

- ✅ Page load performance
- ✅ Component rendering performance
- ✅ Core Web Vitals (LCP, FID, CLS)
- ✅ Memory usage optimization
- ✅ Network performance analysis

### Cross-Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari/WebKit
- ✅ Microsoft Edge
- ✅ Mobile browsers

### Error Handling

- ✅ Empty state handling
- ✅ Malformed date handling
- ✅ Network error resilience
- ✅ JavaScript error detection

## 🔧 Configuration

### Environment Variables

```bash
# Test against different environments
SITE_URL=https://your-site.com          # Default: https://soushi888.github.io/alternef-digital-garden
LOCAL_URL=http://localhost:8080         # Default: http://localhost:8080

# Test filtering
GREP=recent-changes                     # Run tests matching pattern
GREP_INVERT=performance                 # Exclude tests matching pattern

# CI/CD
CI=true                                 # Enable CI mode
```

### Device Configurations

Tests run against multiple device configurations:

- **Mobile**: iPhone 12 (390x844), Samsung Galaxy S21 (384x854)
- **Tablet**: iPad Pro (1024x1366)
- **Desktop**: Standard (1280x720), Widescreen (1920x1080)

### Performance Thresholds

- **Page Load**: < 3000ms
- **Component Render**: < 1000ms
- **Memory Usage**: < 50MB
- **LCP**: < 2500ms
- **FID**: < 100ms
- **CLS**: < 0.1

## 📈 Reports and Results

### HTML Report

```bash
# View detailed HTML report
npm run test:e2e:report
```

### Test Artifacts

- **Screenshots**: `./test-results/screenshots/`
- **Videos**: `./test-results/videos/`
- **Traces**: `./test-results/traces/`
- **HTML Report**: `./test-results/html/index.html`
- **JSON Results**: `./test-results/results.json`
- **JUnit XML**: `./test-results/results.xml`

## 🎯 Test Scenarios

### Homepage Testing

1. **Basic Rendering**: Component loads and displays title "Recent Updates"
2. **Item Limits**: Shows max 5 items on homepage
3. **Real Data**: Verifies no demo data like "Introduction to Permaculture"
4. **Date Formatting**: Validates relative time formats ("2 days ago")
5. **Navigation**: Links work and navigate to correct pages
6. **Change Types**: Properly shows "New" or "Updated" indicators

### Dedicated Page Testing

1. **Detailed View**: Shows up to 20 items with excerpts and tags
2. **Enhanced Content**: Displays article summaries and tag information
3. **Styling**: Applies detailed list styling with proper spacing

### Responsive Testing

1. **Mobile Layout**: Stacked layout for small screens
2. **Tablet Layout**: Optimized for medium screens
3. **Desktop Layout**: Side-by-side layout for large screens
4. **Touch Support**: Works with touch interactions on mobile

### Accessibility Testing

1. **Semantic HTML**: Proper heading hierarchy and landmarks
2. **ARIA Support**: Screen reader compatibility
3. **Keyboard Navigation**: Full keyboard access to all interactive elements
4. **Color Contrast**: WCAG AA compliant contrast ratios
5. **Focus Management**: Visible focus indicators and logical tab order

### Performance Testing

1. **Load Performance**: Fast initial page load
2. **Rendering Performance**: Efficient component rendering
3. **Core Web Vitals:**
   - **Largest Contentful Paint (LCP)**: < 2.5s
   - **First Input Delay (FID)**: < 100ms
   - **Cumulative Layout Shift (CLS)**: < 0.1
4. **Memory Management**: No memory leaks or excessive usage

## 🔍 Debugging

### Debug Mode

```bash
# Run tests in debug mode with browser DevTools
npm run test:e2e:debug

# Run specific test in debug mode
npx playwright test tests/e2e/recent-changes.spec.ts --debug
```

### Screenshots and Videos

Tests automatically capture:
- Screenshots on failure
- Videos of test execution
- Traces for performance analysis

### Console Logging

Tests capture console errors and warnings for debugging.

## 🛠️ Development

### Adding New Tests

1. Create test files in `tests/e2e/`
2. Use test helpers from `tests/utils/`
3. Follow the existing test patterns
4. Update this README with new test coverage

### Test Utilities

- **AccessibilityUtils**: WCAG compliance testing
- **PerformanceUtils**: Performance metric collection
- **TestHelpers**: Common test operations and assertions

### Fixing Failures

1. Check test results in HTML report
2. Review screenshots and videos
3. Analyze console logs
4. Update expectations if the component behavior changed
5. Fix component issues if tests reveal bugs

## 📝 Best Practices

1. **Use meaningful test names** that describe what is being tested
2. **Test real user scenarios** rather than implementation details
3. **Use page object pattern** for complex interactions
4. **Wait for elements** using proper Playwright wait methods
5. **Handle flaky tests** with proper retry mechanisms
6. **Keep tests independent** and avoid test dependencies
7. **Clean up test data** and avoid side effects
8. **Use environment-specific configurations** for different testing environments

## 🚨 Troubleshooting

### Common Issues

**Tests timeout:**
- Increase timeout in `playwright.config.ts`
- Check if the site is accessible
- Verify selectors are correct

**Tests fail on CI:**
- Check CI environment setup
- Ensure all browsers are installed
- Verify environment variables

**Performance tests fail:**
- Check network conditions
- Verify site performance manually
- Adjust thresholds if needed

**Accessibility tests fail:**
- Review WCAG guidelines
- Check contrast ratios manually
- Verify screen reader output

### Getting Help

1. Check Playwright documentation: https://playwright.dev/
2. Review test logs and artifacts
3. Check GitHub issues for known problems
4. Consult the team for complex issues

## 📋 Maintenance

### Regular Tasks

- [ ] Update browser versions quarterly
- [ ] Review and update performance thresholds
- [ ] Check for deprecated Playwright APIs
- [ ] Update accessibility standards if needed
- [ ] Clean up old test artifacts
- [ ] Review and optimize slow tests

### Test Health

- Monitor test execution time
- Track flaky test occurrences
- Review test coverage regularly
- Update tests for component changes
- Maintain documentation accuracy