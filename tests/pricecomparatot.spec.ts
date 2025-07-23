import { test, expect } from '@playwright/test';

test.describe('Price Comparison between Flipkart and Amazon', () => {
  const productName = 'iphone 15 plus';

  test('should find and compare product prices', async ({ browser }) => {
    const flipkartContext = await browser.newContext();
    const amazonContext = await browser.newContext();
    
    const flipkartPage = await flipkartContext.newPage();
    const amazonPage = await amazonContext.newPage();

    try {
      const [flipkartPrice, amazonPrice] = await Promise.all([
        searchFlipkart(flipkartPage, productName),
        searchAmazon(amazonPage, productName)
      ]);

      console.log(`\nProduct: ${productName}`);
      console.log(`Flipkart: ₹${flipkartPrice}`);
      console.log(`Amazon: ₹${amazonPrice}`);

      expect(flipkartPrice).toBeGreaterThan(0);
      expect(amazonPrice).toBeGreaterThan(0);
      expect(typeof flipkartPrice).toBe('number');
      expect(typeof amazonPrice).toBe('number');

      if (flipkartPrice < amazonPrice) {
        console.log(`Flipkart is cheaper by ₹${amazonPrice - flipkartPrice}`);
        expect(flipkartPrice).toBeLessThan(amazonPrice);
      } else {
        console.log(`Amazon is cheaper by ₹${flipkartPrice - amazonPrice}`);
        throw new Error(`Flipkart (₹${flipkartPrice}) is more expensive than Amazon (₹${amazonPrice})`);
      }

    } finally {
      await flipkartContext.close();
      await amazonContext.close();
    }
  });
});

async function searchFlipkart(page: any, productName: string): Promise<number> {
  await page.goto('https://www.flipkart.com/');
  
  await expect(page).toHaveTitle(/Online Shopping Site for Mobiles, Electronics/);
  await expect(page).toHaveURL(/flipkart\.com/);
  
  try {
    await page.click('button._2KpZ6l._2doB4z', { timeout: 3000 });
  } catch (e) {}
  
  await page.fill('input[name="q"]', productName);
  await page.press('input[name="q"]', 'Enter');
  
  await page.waitForTimeout(5000);
  
  const product = page.locator('.tUxRFH:has-text("iPhone 15 Plus")').first();
  await expect(product).toBeVisible({ timeout: 10000 });
  
  await page.waitForTimeout(2000); 
  
  const priceText = await product.locator('text=/₹[0-9,]+/').first().innerText();
  const price = Number(priceText.replace(/[^0-9]/g, ''));
  
  console.log(`Flipkart - Found price text: "${priceText}"`);
  console.log(`Flipkart - Extracted price: ₹${price}`);
  
  return price;
}

async function searchAmazon(page: any, productName: string): Promise<number> {
  await page.goto('https://www.amazon.in/');
  
  await expect(page).toHaveTitle(/Amazon/);
  await expect(page).toHaveURL(/amazon\.in/);
  
  await page.fill('#twotabsearchtextbox', productName);
  await page.press('#twotabsearchtextbox', 'Enter');
  
  await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 });
  
  const product = page.locator('[data-component-type="s-search-result"]:has-text("iPhone 15 Plus")').first();
  await expect(product).toBeVisible();
  
  const priceText = await product.locator('.a-price-whole').innerText();
  const price = Number(priceText.replace(/[^0-9]/g, ''));
  
  console.log(`Amazon - Found price text: "${priceText}"`);
  console.log(`Amazon - Extracted price: ₹${price}`);
  
  return price;
}