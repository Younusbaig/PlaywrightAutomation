const {test, expect} = require('@playwright/test');
const { title } = require('process');
const { text } = require('stream/consumers');



// In this lectures i covered ui automation scenarios with multiple different websites like, trello, MandM, charles tyrwitt, and amazon, 
// to login signin and place order and different operations and perform asssertions.


//Trello login successfull scenatio with mfa code
// test('Trello login successfull test', async ({browser})=>
// {   

//     const context = await browser.newContext();
//     const page  = await context.newPage();
//     await page.goto("https://trello.com");

//     console.log(await page.title());

//     await page.getByTestId('bignav').getByRole('link', { name: 'Log in' }).click();
//     await page.waitForURL(/atlassian/);
//     await page.locator('#username-uid1').fill('myounusbaig93@gmail.com');
//     await page.getByRole('button', { name: 'Continue' }).click();
//     await page.locator('#password').fill('Myounus@93');
//     await page.locator('#login-submit').click();
//     await page.waitForURL('https://trello.com/u/muhammadyounusbaig/boards');
//     // console.log('Waiting for 2FA code...');
//     // await page.pause(); 
//     const createButton = page.locator('button[data-testid="header-create-menu-button"]');
// await createButton.waitFor({ state: 'visible' });
// await createButton.click();
    
//     // await page.locator('span[data-testid="home-team-tab-name"]:has-text("APi-Testing")').first().waitFor({ state: 'visible' });
//     await page.locator('span[data-testid="home-team-tab-name"]').first().click();







// });

// trello test with assertions -- working fine
// test('Trello login error test', async ({browser})=>
//     {   
    
//         const context = await browser.newContext();
//         const page  = await context.newPage();
//         await page.goto("https://trello.com");
    
//         console.log(await page.title());
    
//         await page.getByTestId('bignav').getByRole('link', { name: 'Log in' }).click();
//         await page.waitForURL(/atlassian/);
//         await page.locator('#username-uid1').fill('myounusbaig93@gmail.com');
//         await page.getByRole('button', { name: 'Continue' }).click();
//         await page.locator('#password').fill('Myounus@');
//         await page.locator('#login-submit').click();
//         console.log(await page.locator('[data-testid="form-error"]').textContent());
//         await expect(page.locator('[data-testid="form-error"]')).toContainText('Incorrect');
    
    
//     });

   




        
        
    //     });
        //test MandM test with assertion and to have attribute and goto multiple pages on same tab and perform assertions.

        test('MANDM test', async ({browser})=>
            {   
            
                const context = await browser.newContext();
                const page  = await context.newPage();
                const cookiesButton = page.getByRole('button', {name: 'Accept All Cookies'});
                const searchBox = page.locator('#autocomplete-0-input');
                const documentLink = page.locator("[href='/01/cyber?hb1']");
    
                await page.goto("https://www.mandmdirect.com/");
                await page.screenshot({path: 'screenshot.png'})
                console.log(await page.title());
                await cookiesButton.click();
                await searchBox.fill('jordans');
                await page.locator('button.aa-SubmitButton').click();
                await page.waitForSelector('.product-list a', { state: 'visible' });
                const product =  page.locator('.product-list a').first();
                await page.locator('.product-list a').first().screenshot({path: 'partialScreenshot.png'});
                await expect(product).toBeVisible();
                await product.click();

                const productDetail = page.locator('#productDetails');
                await expect(productDetail).toBeVisible();
                await expect(productDetail).toContainText('SKECHERS');
                // console.log(await expect(page.locator('.product-list a').first()).toContainText('Trespass'));
                // console.log(await expect(documentLink).toHaveAttribute("class", "carousel__slide carousel__slide--active"));
                // console.log(await page.locator('.product-list a').allTextContents());
                
              
 });



test('All content test test', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    await page.locator('#userEmail').fill('muhammadshahid21071998@gmail.com');
    await page.locator('#userPassword').fill('Myounus@93');
    await page.locator('#login').click();
    // await page.waitForLoadState('networkidle');
    console.log(await page.locator('.card-body b').first().waitFor());
    console.log(await page.locator('.card-body b').allTextContents());



});


test('Test scenario for drop down options without select', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.zameen.com/');
   console.log(await page.title()); 

await page.getByRole('button', { name: 'City filter' }).click();

// await page.locator('div._94c3edc8').waitFor();
await page.locator('div._94c3edc8 >> text=Karachi').click();

await page.locator('input.c5ccf0e1._6efee7a0').fill('gulshan');

   
   await page.pause();
   

});


test('test case for static dropdown and radio button chekced/unchecked', async({browser})=>


{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.route('**/*.css', route=>route.abort())
    await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
    await page.title();

    await page.locator('#firstName').fill("Muhammad1");
    await page.locator('#lastName').fill("Baig");
    await page.locator('#userEmail').fill('muhammadbaig1995@gmail.com');
    await page.locator('#userMobile').fill('7854321112');
    const dropDown = await page.locator('select[formcontrolname="occupation"]');
    await dropDown.selectOption('Student');
    await page.locator('input[type="radio"][value="Male"]').check();
    await expect(page.locator('input[type="radio"][value="Male"]')).toBeChecked();
    await page.locator('#userPassword').fill('Myounus@93');
    await page.locator('#confirmPassword').fill('Myounus@93');
    await page.locator('input[type="checkbox"]').check();
    await expect(page.locator('input[type="checkbox"]')).toBeChecked();
    await page.locator('#login').click();
    await page.pause();


});


test.only('child tab handle scenario', async({browser})=>

{// in this test we handle if we click and new tab open, then how to automate that

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.title();
    await page.pause();
    const userName = page.locator('#username');

    const documentRequest = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        [   
            context.waitForEvent('page'),
            documentRequest.click(),

        ])

       const text = await newPage.locator('.red').textContent();   
       const textArray = text.split("@");
       const domain = textArray[1].split(" ")[0]
        // console.log(domain);

        await page.locator('#username').fill(domain);
        page.pause();
        console.log(await page.locator('#username').inputValue()); // we use input value when we put value dynamically which is not attached to dom when 
        //open the page

    });


// // generate test through codegen.

// test('test', async ({ page }) => {
//   await page.goto('https://www.charlestyrwhitt.com/uk/home');
//   await page.getByRole('button', { name: 'Accept All Cookies' }).click();
//   await page.locator('#navigation').getByRole('link', { name: 'Smart Casual Shirts' }).click();
//   await page.getByRole('button', { name: 'Close' }).click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.goto('https://www.charlestyrwhitt.com/uk/mens-shirts/business-casual/?currentPageNum=2');
//   await page.getByRole('link', { name: 'Button-Down Non-Iron Stretch Oxford Stripe Shirt - Lilac Purple. Price GBP 69.' }).click();
//   await page.getByRole('link', { name: 'Sky Blue', exact: true }).click();
//   await page.getByRole('radio', { name: '35 sleeveLength' }).click();
//   await page.getByRole('radio', { name: '17 collarSize Please choose a' }).click();
//   await page.getByRole('button', { name: 'Add to bag' }).click();
// });


//whole order scenario cover with assertions 
test('automate charless tyrwitt website order scenario', async({browser})=>

{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.charlestyrwhitt.com/uk/home');
    await page.title();

    await page.locator('#onetrust-accept-btn-handler').click();

    await page.locator('#Shirts').hover();// use hover to navigate the option instead clicking

    await page.waitForTimeout(1000); // when hover to navigation take time to open dropdown menu.

    await page.getByRole('link', {name: 'Casual Shirts'}).first().click();

    await page.locator('#primary').getByRole('link', {name : 'NEW SHIRTS'}).click();
    const product = page.getByTitle('Smart Pique Polo - Black');
    await expect(product).toBeVisible();
    await product.click();

    // await page.waitForSelector('#primary', {state : 'visible'});
    const productPage = page.locator('[data-variation-val-id="M"]');
    await expect(productPage).toBeVisible();
    await productPage.click();

    await page.locator('#add-to-cart').click();
    await page.waitForSelector('.minicart-modal-dialog', { state: 'visible' });
const goToBag = page.locator('.minicart-modal-dialog').getByRole('link', { name: 'GO TO BAG'});

await expect(goToBag).toBeVisible();  // Now it will pass
await goToBag.click();


});