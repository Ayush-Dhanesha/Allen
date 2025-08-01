# iPhone Price Comparison Automation

A Playwright-based automation project that compares iPhone 15 Plus prices between Flipkart and Amazon India, helping users find the best deals across major e-commerce platforms.

## 🎯 Project Overview

This automated testing solution performs real-time price comparison for iPhone 15 Plus between two major Indian e-commerce platforms:
- **Flipkart** (flipkart.com)
- **Amazon India** (amazon.in)

The test runs in parallel across multiple browsers and determines which platform offers better pricing.

## ✨ Features

- **Parallel Execution**: Searches both platforms simultaneously for faster results
- **Multi-Browser Support**: Runs on Chrome, Firefox, and Safari/WebKit
- **Real-time Price Extraction**: Fetches current market prices
- **Intelligent Price Comparison**: Automatically determines the cheaper option
- **Robust Error Handling**: Handles popups, timeouts, and network issues
- **Detailed Logging**: Provides step-by-step execution details

## 🛠️ Technology Stack

- **Playwright**: End-to-end testing framework
- **TypeScript**: Type-safe JavaScript development
- **Node.js**: Runtime environment
- **CSS Selectors**: Platform-specific element targeting

## 📋 Prerequisites

Before running this project, ensure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Internet connection for accessing e-commerce sites

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd playwright-price-compare
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 💻 Usage

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/pricecomparatot.spec.ts
```

### Run on Specific Browser
```bash
# Chrome only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# Safari only
npx playwright test --project=webkit
```

### View Test Report
```bash
npx playwright show-report
```

## 📊 Sample Output

```
Product: iphone 15 plus
Flipkart: ₹71999
Amazon: ₹72490
Flipkart is cheaper by ₹491

✓ should find and compare product prices (25.1s)
```

## 🏗️ Project Structure

```
playwright-price-compare/
├── tests/
│   └── pricecomparatot.spec.ts    # Main price comparison test
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies
└── README.md                       # Project documentation
```

## 🔧 Configuration

### Test Configuration
The test searches for: **iPhone 15 Plus**

To modify the product, update the `productName` variable in `pricecomparatot.spec.ts`:
```typescript
const productName = 'iphone 15 plus'; // Change this to search different products
```

### Browser Configuration
Configure browsers in `playwright.config.ts`:
```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

## 🎯 How It Works

1. **Parallel Browser Contexts**: Creates separate browser instances for each platform
2. **Navigation & Search**: Automatically navigates and searches for the specified product
3. **Price Extraction**: Uses CSS selectors to extract prices from search results
4. **Data Processing**: Converts price text to numeric values for comparison
5. **Result Analysis**: Determines which platform offers better pricing
6. **Reporting**: Logs detailed results and generates test reports

## 🧪 Test Logic

The test follows this workflow:

1. **Setup**: Create isolated browser contexts for each platform
2. **Search**: Execute searches on both platforms simultaneously
3. **Extract**: Get price information from the first matching product
4. **Validate**: Ensure extracted prices are valid positive numbers
5. **Compare**: Determine which platform is cheaper
6. **Report**: Log results and pass/fail based on comparison

## 🔍 Selectors Used

### Flipkart
- **Product Container**: `.tUxRFH:has-text("iPhone 15 Plus")`
- **Price Element**: `text=/₹[0-9,]+/`
- **Search Input**: `input[name="q"]`

### Amazon
- **Product Container**: `[data-component-type="s-search-result"]:has-text("iPhone 15 Plus")`
- **Price Element**: `.a-price-whole`
- **Search Input**: `#twotabsearchtextbox`

## 🚨 Known Limitations

- **Price Accuracy**: Prices may vary due to offers, discounts, and real-time changes
- **Selector Dependency**: CSS selectors may change if platforms update their UI
- **Network Dependency**: Requires stable internet connection
- **Geographic Restrictions**: Works specifically for Indian e-commerce sites

## 🛠️ Troubleshooting

### Common Issues

1. **Test Timeout**
   - Increase timeout values in playwright.config.ts
   - Check internet connection stability

2. **Element Not Found**
   - Verify CSS selectors are still valid
   - Check if website structure has changed

3. **Price Extraction Fails**
   - Inspect price element structure on the website
   - Update regex patterns if needed

### Debug Mode
Run tests with debug flag for step-by-step execution:
```bash
npx playwright test --debug
```

## 📈 Future Enhancements

- [ ] Add more e-commerce platforms (Snapdeal, Paytm Mall)
- [ ] Support for multiple product categories
- [ ] Price history tracking
- [ ] Email notifications for price drops
- [ ] API integration for price alerts
- [ ] Mobile app testing support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if necessary
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review troubleshooting section

---

**Note**: This tool is for educational and personal use. Please respect the terms of service of the e-commerce platforms being tested.
