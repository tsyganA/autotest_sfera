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
  width: 1420,
  height: 1080,
  deviceScaleFactor: 1,
});
}



async function registrGoogle (page, language, color) {
    await page.waitForTimeout(1000);
// login                   
    await page.waitForSelector(`input[name='email']`);
await page.type(`input[name='email']`, "test@gmail.com");

    await page.waitForTimeout(1000);
// password
    await page.waitForSelector(`input[name='password']`);
await page.type(`input[name='password']`, "test123");

    await page.waitForTimeout(1000);
// button login  
    await page.waitForSelector(`button[type='submit']`);
await page.click(`button[type='submit']`)
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



async function elementDelete (page, xpath) {
let twoDelete = (await page.$x(xpath))[0];
let twoElement = await page.evaluate(el => el.value, twoDelete);
    for (let i = 0; i < twoElement.length; i++) {
    await page.keyboard.press('Backspace');
    } 
}




async function equallyXpathInnerText (page, xpath, text, equally) {

const equallySelector = await page.$x(xpath);

  if(equallySelector != 0) {

  let elementXpath = (await page.$x(xpath))[0];
  let textContent = await page.evaluate(el => el.innerText, elementXpath);
 
  console.log(text + '  = '+ textContent);

    if(textContent != equally) {

      console.log('Wrong!!!  Right text ' + text +' = '+ equally +'   ~~~~~~~~~~~~~~~~~~~');
      console.log('------------------------------------------')
    } else {

      console.log('------------------------------------------')
    }

  } else {console.log('Not ' + text +'   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('-------------------------------------------')
  }
}







async function invalidMelon (page, incorrectEmail, emptyEmail, emptyPassword, minimalPassword, wrongEmailPassword) {

// login                   
    await page.waitForSelector(`input[name='email']`);
await page.type(`input[name='email']`, "");

    await page.waitForTimeout(1000);
// button login  
    await page.waitForSelector(`button[type='submit']`);
await page.click(`button[type='submit']`)

await equallyXpathInnerText (page, `/html/body/div/div/div/div/div[1]/form/div`, 'incorrect email', incorrectEmail);

await equallyXpathInnerText (page, `/html/body/div/div/div/div/div[1]/form/p[1]`, 'empty email', emptyEmail);

    await page.waitForTimeout(1000);
// password
    await page.waitForSelector(`input[name='password']`);
await page.type(`input[name='password']`, "");

    await page.waitForTimeout(1000);
// button login  
    await page.waitForSelector(`button[type='submit']`);
await page.click(`button[type='submit']`)

await equallyXpathInnerText (page, `/html/body/div/div/div/div/div[1]/form/p[2]`, 'empty password', emptyPassword);

await equallyXpathInnerText (page, `/html/body/div/div/div/div/div[1]/form/p[3]`, 'minimal password', minimalPassword);

    await page.waitForTimeout(1000);
// login                   
    await page.waitForSelector(`input[name='email']`);
await page.type(`input[name='email']`, "test@gmail.com");

    await page.waitForTimeout(1000);
// password
    await page.waitForSelector(`input[name='password']`);
await page.type(`input[name='password']`, "test12");

    await page.waitForTimeout(1000);
// button login  
    await page.waitForSelector(`button[type='submit']`);
await page.click(`button[type='submit']`)

    await page.waitForTimeout(1000);
await equallyXpathInnerText (page, `/html/body/div/div/div/div/div[1]/form/p`, 'wrong email or password', wrongEmailPassword);

    await page.waitForTimeout(1000);
// password
    await page.waitForSelector(`input[name='password']`);
await page.type(`input[name='password']`, "");
                            
await elementDelete (page, `/html/body/div/div/div/div/div[1]/form/input[2]`);

    await page.waitForTimeout(1000);
// login                   
    await page.waitForSelector(`input[name='email']`);
await page.type(`input[name='email']`, "");

await elementDelete (page, `/html/body/div/div/div/div/div[1]/form/input[1]`);

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
 
 
   it('Authentication!!!!!!!', function(done) {

(async () => {
  this.retries(2);
     this.timeout(160000);
     
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

await sizeBrowser (page);

await page.goto('http://localhost:3000/login');


    await page.waitForTimeout(2000);

await invalidMelon (page, 'Некорректный email', 'Email не может быть пустым', 'Пароль не должен быть пустым', 'Минимальная длина пароля 3 символа', 'Неправильный email или пароль');

        await registrGoogle (page, 'Russian', 'White');


    await chekTogl (page);
        await registrGoogle (page, 'Russian', 'Dark');


await languageSelect (page);
    await chekTogl (page);
        await registrGoogle (page, 'English', 'White');

await invalidMelon (page, 'Invalid email', 'Email cannot be empty', 'The password must not be empty', 'The minimum password length is 3 characters', 'Wrong email or password');

    await chekTogl (page);
        await registrGoogle (page, 'English', 'Dark');


await languageSelect (page);
    await chekTogl (page);
        await registrGoogle (page, 'Spanish', 'White');

await invalidMelon (page, 'Email incorrecto', 'El correo electrónico no puede estar vacío', 'La contraseña no debe estar vacía', 'Longitud mínima de la contraseña 3 caracteres', 'Correo o contraseña equivocada');

    await chekTogl (page); 
        await registrGoogle (page, 'Spanish', 'Dark');

      await page.waitForTimeout(3000);

await page.close();
      done();
    })();
  });



})