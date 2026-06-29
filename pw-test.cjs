const pw = require('./node_modules/playwright');
(async () => {
  const browser = await pw.chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGE ERROR: ' + err.message));
  
  await page.goto('http://localhost:4321/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);
  
  // Click Strategies button
  const stratBtn = page.locator('nav button').filter({ hasText: /^Strategies/ }).first();
  const stratBtnCount = await stratBtn.count();
  console.log('Strategies button count:', stratBtnCount);
  
  if (stratBtnCount > 0) {
    await stratBtn.click();
    await page.waitForTimeout(600);
    
    const dd = page.locator('#strategies-menu-dropdown');
    const ddCount = await dd.count();
    console.log('Strategies dropdown in DOM after click:', ddCount);
    if (ddCount > 0) {
      console.log('Strategies dropdown visible:', await dd.isVisible());
    }
    
    await page.screenshot({ path: 'C:\\Users\\ramal\\AppData\\Local\\Temp\\strategies-open.png' });
  }
  
  // Check console errors
  console.log('Console errors:', JSON.stringify(errors));
  
  await browser.close();
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
