const puppeteer = require('puppeteer');
const assert = require('chai').assert;


// async function sizeBrowser (page) {
// await page.setViewport({
//   width: 1366,
//   height: 610,
//   deviceScaleFactor: 1,
// });
// }


async function sizeBrowser (page) {
await page.setViewport({
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
});
}


async function registrGoogle (page, language, color) {
    await page.waitForTimeout(1000);
// login
    await page.waitForSelector(`input[name="login"]`);
await page.type(`input[name="login"]`, "test@gmail.com");

    await page.waitForTimeout(1000);
// password
    await page.waitForSelector(`input[name="password"]`);
await page.type(`input[name="password"]`, "test123");

    await page.waitForTimeout(1000);
// button login  
        await page.waitForXPath(`/html/body/div/div/div/div/div[1]/form/button/span[1]`);
const buttonLogin = await page.$x(`/html/body/div/div/div/div/div[1]/form/button/span[1]`);
await buttonLogin[0].click();
    console.log("Login success:  "+ language +" language, "+ color +"  theme!");

    await page.waitForTimeout(1000);
// input message
    await page.waitForSelector(`input[name="message"]`);
await page.type(`input[name="message"]`, ""+ language +" language, "+ color +"  theme");

    await page.waitForTimeout(1000);
// button submit  
        await page.waitForXPath(`/html/body/div/div/div/div[2]/button/span[1]`);
const buttonSubmit = await page.$x(`/html/body/div/div/div/div[2]/button/span[1]`);
await buttonSubmit[0].click();
    console.log("Message sent:  {"+ language +" language, "+ color +"  theme}");

    await page.waitForTimeout(1000);
// last message
        await page.waitForXPath(`/html/body/div/div/div/div[1]/div[last()]`);
const lastMessage = await page.$x(`/html/body/div/div/div/div[1]/div[last()]`);
await lastMessage[0].click();

    await page.waitForTimeout(3000);
// button logout 
        await page.waitForXPath(`/html/body/div/header/div/div/button/span[1]`);
const buttonLogout = await page.$x(`/html/body/div/header/div/div/button/span[1]`);
await buttonLogout[0].click();
    console.log("Logout success!");
    console.log("------------------------------------------");
}



async function chekTogl (page) {
    await page.waitForTimeout(1000);
// togle checkbox
    await page.waitForSelector(`input[type="checkbox"]`);
await page.click(`input[type="checkbox"]`)
    console.log('Toggle theme switched!');
}



async function languageSelect (page) {
// language menu
await page.waitForSelector(`#demo-customized-select-native`);
await page.click(`#demo-customized-select-native`);  

    await page.waitForTimeout(1000);
// language select
await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000)
await page.keyboard.press('Enter');
    console.log('Language changed!');
}




describe('Authentication', function() {
    let browser;

  before(async function() {
    this.timeout(0);
    browser = await puppeteer.launch({
       headless: false,
    // devtools: true,
      });
  });
  

  after(async function() {
    this.timeout(0);
    await browser.close();
  });
 
 
   it('Show wrong password registration!!!!!!!', function(done) {

(async () => {
  this.retries(2);
     this.timeout(160000);
     
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

await sizeBrowser (page);

await page.goto('http://localhost:3000/login');

    await page.waitForTimeout(2000);
        await registrGoogle (page, 'Russian', 'White');


    await chekTogl (page);
        await registrGoogle (page, 'Russian', 'Dark');


await languageSelect (page);
    await chekTogl (page);
        await registrGoogle (page, 'English', 'White');


    await chekTogl (page);
        await registrGoogle (page, 'English', 'Dark');


await languageSelect (page);
    await chekTogl (page);
        await registrGoogle (page, 'Spanish', 'White');


    await chekTogl (page); 
        await registrGoogle (page, 'Spanish', 'Dark');

      await page.waitForTimeout(3000);

await page.close();
      done();
    })();
  });



})