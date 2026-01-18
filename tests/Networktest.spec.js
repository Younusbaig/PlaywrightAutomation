const { test, expect } = require('@playwright/test');
const { CtPOData } = require('../PageObjects/CtPOData');
const fakePayLoadOrders = { data: [] };
const { TrelloPO } = require('../PageObjects/TrelloPO');
const { url } = require('inspector');




// test.describe.configure({ mode: 'parallel' });

test('@API security test to intercept the request', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("#userEmail").fill("muhammadbaig1995@gmail.com");
  await page.locator("#userPassword").fill("Myounus@93");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  await page.pause();
  await page.locator("button[routerlink*='myorders']").click();
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6941b79532ed8658713863ee' }));

  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator('.blink_me'))
    .toHaveText("You are not authorize to view this order");





})


//  Amazon test -- auto suggestion dropdown search
test('@API Amazon test intercept the request to abort images', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  const products = page.locator('[data-asin="B0BDJH7J5C"]');
  const cookiesButton = page.getByRole('button', { name: 'Accept' });
  const searchBox = page.getByRole('sea chbox', { name: 'Search Amazon.co.uk' });

  await page.route('**/*', route => {
    if (route.request().resourceType() == 'image') {
      return route.abort();
    }
    return route.continue();
  }
  )
  await page.goto("https://www.amazon.co.uk/");
  // await page.pause();
  // console.log(await page.title());

  // await cookiesButton.click();
  // await searchBox.fill('Apple iphone 17');
  // await page.locator('#nav-search-submit-button').click();
  // const  allProducts = await products.allTextContents();
  // console.log(allProducts);
  // await page.waitForSelector('#search', {state: 'visible'});
  // await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
  //   route =>route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6941b79532ed8658713863ee'}));
  // const product =  page.getByRole('link', { name: /iPhone 17 256 GB: 6.3-inch Display with ProMotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Mist Blue/ }).first();
  // await expect(product).toBeVisible();
  // await product.click();


});






test('@API intercept the response from danube', async ({ page }) => {

  const objectResponse = [
    {

      author: "J/K Rowlin'",
      genre: "erotic",
      id: 2,
      price: "9.95",
      rating: "★★★☆☆",
      stock: "1",
      title: "Parry Hotter"
    }
  ]

  await page.route("https://danube-webshop.herokuapp.com/api/books", route =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(objectResponse)
    })
  );

  await page.goto("https://danube-webshop.herokuapp.com/");
  await page.title();
  await page.pause();


})


test('@API test to automate charless tyrwitt website order scenario with PO', async ({ page }) => { // in this test we intercept the reponse, intead of all porduct we reutn 0 order

  const ct = new CtPOData(page);
  await ct.goTo();
  await page.title();
  await ct.acceptCookies();
  await page.pause();

  await page.route("**/optimization/recommend/user**",
    async route => {
      console.log("LOG: Intercepting Bloomreach API call...");
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body
      })
    }
  )
  const [interceptedResponse] = await Promise.all([
    page.waitForResponse("**/optimization/recommend/user**"),
    await ct.mainPage(),
    await ct.shirtsCategory()
  ]);

  const responseData = await interceptedResponse.json();
  console.log("MOCKED DATA RECEIVED BY BROWSER:", JSON.stringify(responseData));
  const productCards = page.locator(".v-recommendations__item");
  const count = await productCards.count();
  console.log(`UI Verification: Total products displayed = ${count}`);

  await expect(productCards).toHaveCount(0);


});


test('intercept the respoinse and fake our own data', async ({ page }) => {

  const ct = new CtPOData(page);
  const newShirt = {
    data: [{
      category_path: "Shirts > Formal Shirts",
      title: "GEMINI SPECIAL EDITION SHIRT", // Humne title badal diya
      price: 999, // Humne price badal di
      item_id: "FAKE-123",
      image: "https://www.charlestyrwhitt.com/on/demandware.static/-/Sites-ctshirts-master/default/dw926697eb/FOA/FOA0012LBU/FOA0012LBU_COLLAR_DETAIL.jpg",
      product_page_url: "https://www.ctshirts.com/us/FOA0012LBU.html"
  }]
};
await page.route("**/optimization/recommend/user**",
  async route => {
    console.log("LOG: Intercepting Bloomreach API call...");
     route.fulfill({
    contentType: 'application/json',
    body: JSON.stringify(newShirt)
  })
}
)


  await ct.goTo();
  await page.title();
  await ct.acceptCookies();
  await page.waitForLoadState();
   const [interceptedResponse] = await Promise.all([ page.waitForResponse("**/optimization/recommend/user**"),
    await ct.mainPage(),
  await ct.shirtsCategory()
]);
 
  const responseData = await interceptedResponse.json();
  console.log("MOCKED DATA RECEIVED BY BROWSER:", JSON.stringify(responseData));

 console.log("SUCCESS: HYBRID TEST PASSED");

})





test('@API api request intercept to test', async({browser})=>
{ 
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.route("**/AppAPIV3/GetProductByCategorySlugV2*",
    async route => { 
      console.log("intercept dvago call")
      const response = await route.fetch();
      const json  = await response.json();

      if(json.pageProps.item.Data.length > 0){
        json.pageProps.item.Data[0].Title = "Hacked Product Name";
       json.pageProps.item.Data[0].SalePercent = "99.00"; 
      }
      ;
  
      await route.fulfill({
        response,
        contentType: 'application/json',
        body: JSON.stringify(json)
  
    })
  });
 
  await page.goto("https://www.dvago.pk/");
  await page.title();
   //in this test we intercet the trello id and send different user id to test its accept it or not
  await page.locator('.banner-popup_closePopupBtn__AP5i0').click();
  await page.getByText("Medicine").first().hover();
  await page.getByText('Derma').first().hover();
  await page.getByText("Skin Whitening").first().click();

  await page.waitForTimeout(5000);

  

})


