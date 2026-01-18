class AmazonPO {


    constructor(page){
        this.page = page;
        this.email = page.locator('#ap_email');
        this.password = page.locator('#ap_password');
        this.submit = page.locator('#continue');
        this.signInSubmit = page.locator('#signInSubmit');
        this.cookiesButton = page.getByRole('button', {name: 'Accept'});
        this.searchBox = page.getByRole('searchbox', {name: 'Search Amazon.co.uk'});
        this.products = page.locator('[data-asin="B0BDJH7J5C"]');
        this.product =  page.getByRole('link', { name: /iPhone 17 256 GB: 6.3-inch Display with ProMotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life; Mist Blue/ });
        this.searchButton = page.locator('#nav-search-submit-button');
        this.color = page.getByRole('radio', {name: 'White'});
        this.selectquantity = page.locator('#selectQuantity');
        this.selectsecondoption = page.locator('#quantity_1');
        


        
    }




    async goTo(){
        await this.page.goto("https://www.amazon.co.uk/ap/signin?openid.pape.max_auth_age=900&openid.return_to=https%3A%2F%2Fwww.amazon.co.uk%3F&openid.assoc_handle=gbflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0")
    }

    async validLogin(email, password){
        await this.email.fill(email);
        await this.submit.first().click();
        await this.password.fill(password);
        await this.signInSubmit.click();
    }

    async acceptcookies(){
        if(await this.cookiesButton.isVisible()){
            await this.cookiesButton.click();
        };
    }

    async searchProduct(){
        
       await this.searchBox.fill('Apple iphone 17');
       await this.searchButton.click();
    }

    async selectProduct(){
       await this.product.first().click();
    }

    async selectColorAndQuantity(){
        await this.selectquantity.first().click();
        await this.selectsecondoption.click();
        await this.color.click();
    }

    async addtobag(){

    }
}








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


        module.exports = {AmazonPO}