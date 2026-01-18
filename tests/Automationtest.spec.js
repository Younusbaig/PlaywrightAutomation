const {test, expect} = require('@playwright/test');



// we are creating a test scenario for dynamicaly find the product. using loop.


// test('Dynamic product search', async({browser})=>

// {   
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const product = page.locator('.search-result product-tile__img-link');
//     const productName = 'Point Collar Non-Iron Twill Shirt - White. Product info: New. Price GBP 69.95. Multibuy price: £37.25.';
    

//     await page.goto('https://www.charlestyrwhitt.com/uk/home');
//     await page.title();
//     // await page.pause();

//     await page.locator('#onetrust-accept-btn-handler').click();

//     await page.locator('#Shirts').hover();// use hover to navigate the option instead clicking

//     await page.waitForTimeout(1000); // when hover to navigation take time to open dropdown menu.

//     await page.getByRole('link', {name: 'Casual Shirts'}).first().click();

//     await page.locator('#primary').getByRole('link', {name : 'NEW SHIRTS'}).click();
//     await page.waitForSelector('#primary', {state : 'visible'} );
//     await page.waitForSelector('.primary-content a');

//     const count = await product.count();
//     console.log("Total products found:", count);

//     for(let i = 0; i < count; i++) {
//         if(await product.nth(i).textContent() == productName){


//         // console.log("Found:", title);
//             await product.nth(i).scrollIntoViewIfNeeded();
//             await product.nth(i).click();
//             console.log("Clicked:", title);
//             break;



//         }}
 
// })


 
 
 // dynamically find the product and added into cart
 
test('Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "muhammadbaig1995@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");

//    await page.pause()
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Myounus@93");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
//    const titles = await page.locator(".card-body b").allTextContents();
//    console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
    }

    await page.locator("[routerlink*= 'cart']").click();
    const bool = page.getByText('ZARA COAT 3').isVisible();
    expect(bool).toBeTruthy();
    
}
)


// //  Amazon test -- auto suggestion dropdown search
//     test('Amazon test', async ({browser})=>
//         {   
        
//             const context = await browser.newContext();
//             const page  = await context.newPage();
//             const products = page.locator('[data-asin="B0BDJH7J5C"]');
//             const cookiesButton = page.getByRole('button', {name: 'Accept'});
//             const searchBox = page.getByRole('searchbox', {name: 'Search Amazon.co.uk'});

//             await page.goto("https://www.amazon.co.uk/");
//             await page.pause();
//             console.log(await page.title());
//             await cookiesButton.click();
//             await searchBox.fill('Apple iphone 17');
//             await page.locator('#nav-search-submit-button').click();
//             const  allProducts = await products.allTextContents();
//             console.log(allProducts);
//             await page.waitForSelector('#search', {state: 'visible'});
//             // const productList = await page.locator('#search').first();
//             // await expect(productList).toBeVisible();
//             const product =  page.getByRole('link', { name: /iPhone 17 256 GB: 6.3-inch Display with ProMotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Mist Blue/ }).first();
//             await expect(product).toBeVisible();
//             await product.click();


//         });

// amazon search in dropdown.

// test('Amazon test', async ({browser})=>
//     {   
    
//         const context = await browser.newContext();
//         const page  = await context.newPage();
//         const products = page.locator('[data-asin="B0BDJH7J5C"]');
//         const cookiesButton = page.getByRole('button', {name: 'Accept'});
//         const searchBox = page.getByRole('searchbox', {name: 'Search Amazon.co.uk'});

//         await page.goto("https://www.amazon.co.uk/");
//         await page.pause();
//         console.log(await page.title());
//         if(await cookiesButton.isVisible()){
//             await cookiesButton.click();
//         }
//         await searchBox.pressSequentially('Apple iphone 17 pro max case', { delay: 150 });
//         const dropdown = page.locator('#nav-flyout-searchAjax');
//         await dropdown.waitFor();
//         const options = await dropdown.locator('.left-pane-results-container').count();
//         console.log(options);

//         for (let i =0; i < options; i++){
//             const text = await dropdown.locator('.left-pane-results-container').nth(i).textContent();
//             if( text === "Apple iphone 17 pro max case orange"){
//                 await options.locator('.left-pane-results-container').nth(i).click();
//                 break;
//             }
//         }


//     })