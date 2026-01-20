const { test, expect} = require('@playwright/test');
const {Login}  = require('../PageObjects/Login');
const { CtPOData } = require('../PageObjects/CtPOData');
const { TrelloPO } = require('../PageObjects/TrelloPO');
const { AmazonPO } = require('../PageObjects/AmazonPO');
// const trellodata = JSON.parse(JSON.stringify(require('../utils/TrelloUtils.json')));
const dataset = JSON.parse(JSON.stringify(require('../utils/DataSet.json')));
const amazondata = JSON.parse(JSON.stringify(require('../utils/AmazonLogin.json')));
const { ZaraPO } = require('../PageObjects/ZaraPO');


let trellodata;

if (process.env.TRELLO_USERS_JSON) {
    // Agar GitHub Actions par chal raha hai toh Secret use karega
    trellodata = JSON.parse(process.env.TRELLO_USERS_JSON);
} else {
    // Agar aap apne computer (Local) par chala rahe hain toh is file se uthayega
    // Yaad rakhein: Ye file .gitignore mein honi chahiye taaki GitHub par na jaye
    trellodata = require('../utils/trello_utils.json');
}



test.describe.configure({mode: 'parallel'});

// test('@Webst Client App login through Page Objects', async ({ page }) => {
//     //js file- Login js, DashboardPage
//     const username = "muhammadbaig1995@gmail.com";
//     const password = "Myounus@93";
//     const productName = 'ZARA COAT 3';
//     const products = page.locator(".card-body");
//     const login = new Login(page);
//     login.goTo();
//     login.validLogin(username, password);

 
//  //    await page.pause()
//     await page.waitForLoadState('networkidle');
//     await page.locator(".card-body b").first().waitFor();
//  //    const titles = await page.locator(".card-body b").allTextContents();
//  //    console.log(titles); 
//     const count = await products.count();
//     for (let i = 0; i < count; ++i) {
//        if (await products.nth(i).locator("b").textContent() === productName) {
//           //add to cart
//           await products.nth(i).locator("text= Add To Cart").click();
//           break;
//        }
//      }
 
//      await page.locator("[routerlink*= 'cart']").click();
//      const bool = page.getByText('ZARA COAT 3').isVisible();
//      expect(bool).toBeTruthy();
     
//  }
//  )

 test.only('@Web automate charless tyrwitt website order scenario with PO', async({page})=>

    {
        
        const ct = new CtPOData(page);
        await ct.goTo();
        await page.title();
        await page.pause();
        await ct.acceptCookies();
        await ct.mainPage();
        await ct.shirtsCategory();
        await ct.selectproduct();
        await ct.findSize();
        await ct.addToCart();
        await page.waitForTimeout(2000);
        await ct.gotoBag();
    
    
    });


    // let trellodata = [];

    // if (process.env.TRELLO_USERS_JSON) {
    //     // GitHub Secret se JSON string ko wapas array banayein
    //     trellodata = JSON.parse(process.env.TRELLO_USERS_JSON);
    // } else {
    //     // Local fallback
    //     trellodata = require('../utils/trello_utils.json');
    // }


for(const data of trellodata){
 test(`@Web Trello Api search for page object pattern ${data.username}`, async({page})=>
{   

    const trello = new TrelloPO(page);
    // const logo = await page.locator('[aria-label="Back to home"]');
    await trello.goTo();
    await trello.validLogin(data.username, data.password);
    await expect(trello.logo).toBeVisible();
    await trello.goToHome();
    await trello.trelloBoard();
    await trello.addList(data.addListTitle);
    const addedcard = page.locator('.oTZCBVwh2Ud4al', { hasText: 'List for UI'});
    await expect(addedcard).toBeVisible({ timeout: 10000 });
    await expect(addedcard).toHaveText('List for UI');
    await page.waitForTimeout(1000);
    await trello.addCardInToday(data.cardTitle);
    const addedlist = page.locator('a[data-testid="card-name"]', { hasText: 'create a parallel card for UI Automation'});
    await expect(addedlist).toBeVisible();
    await expect(addedlist).toHaveText("create a parallel card for UI Automation");



})}


test('@Web trello api for creating tasklist', async({page})=>
    {   
        
        const trello = new TrelloPO(page);
        await trello.goTo();
        await trello.validLogin(dataset.username, dataset.password);
        await expect(trello.logo).toBeVisible();

        await trello.goToHome();
        await trello.trelloBoard();
        await trello.addList(dataset.addListTitle);
        const addedlist = page.locator('.oTZCBVwh2Ud4al', { hasText: 'automation list'});
        await expect(addedlist).toBeVisible();
       await expect(addedlist).toHaveText("automation list");
       await page.waitForTimeout(1000);
       await trello.addCardInToday(dataset.cardTitle);
       const addedcard = page.locator('a[data-testid="card-name"]', { hasText: 'card for UI Automation'});
       await expect(addedcard).toBeVisible();
       await expect(addedcard).toHaveText('card for UI Automation');




});


test('@Web Amazon PO select product', async({page})=>
{
    
    const amazon = new AmazonPO(page);
    await amazon.goTo();
    await amazon.validLogin(amazondata.email, amazondata.password);
    await page.waitForTimeout(1000);
    await amazon.acceptcookies();    
    await amazon.searchProduct();
    await amazon.selectProduct();
    await amazon.selectColorAndQuantity();
})

test('@Web test for zara product select', async({page})=>
{

    const zara = new ZaraPO(page);
    await zara.goTo();
    await zara.cookiesbutton();
    await zara.selectproduct();
    await page.waitForTimeout(1000);
    await zara.selectsize();
})

