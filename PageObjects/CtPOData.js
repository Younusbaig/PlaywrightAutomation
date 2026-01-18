
const { expect } = require("../playwright.config");


class CtPOData{

    constructor(page){
        this.page = page;
        this.cookiesButoon = page.locator('#onetrust-accept-btn-handler');
        this.findShirts = page.locator('#Shirts');
        this.categories = page.getByRole('link', {name: 'Casual Shirts'});
        this.shirtCategory = page.locator('#primary').getByRole('link', {name : 'NEW SHIRTS'});
        this.findProduct = page.getByTitle('Non-Iron Stretch Greenwich Weave Shirt – White');
        this.size = page.getByRole('radio', {name: "Classic variation-fit"});
        this.collarSize = page.getByRole('radio', {name: "16 collarSize"});
        this.addCart = page.locator('#add-to-cart');
        this.timeout = page.waitForTimeout(1000);
        this.chooseSize = page.getByRole('button', {name: 'Choose size & fit'})
        this.chooseSleeves = page.getByRole('radio', {name: "34 sleeveLength"});
        this.chooseButtons = page.getByRole('radio', {name: "Single cuff cuffType"});
        this.goToBag = page.locator('.minicart-modal-dialog').getByRole('link', { name: 'GO TO BAG'});  
        // this.waitForSelector = page.waitForSelector('.minicart-modal-dialog', { state: 'visible' });
        




    }

async goTo(){
    await this.page.goto("https://www.charlestyrwhitt.com/uk/home");

}

async acceptCookies(){
    await this.cookiesButoon.click();
}

async mainPage(){
   await this.findShirts.hover();
   await this.categories.first().click();
   await this.timeout;
}

async shirtsCategory(){
   await this.shirtCategory.click();

}
async selectproduct(){

await this.findProduct.waitFor({ state: 'visible' });
await this.findProduct.click();
}

async findSize(){
await this.page.waitForLoadState('networkidle');
await this.chooseSize.waitFor({ state: 'visible'} );
await this.chooseSize.click();
await this.size.waitFor({state: 'visible'});
await this.size.click();
await this.collarSize.waitFor({state: 'visible'});
await this.collarSize.click();
await this.chooseSleeves.waitFor({state: 'visible'});
await this.chooseSleeves.click();
await this.chooseButtons.waitFor({state: 'visible'});
await this.chooseButtons.click();
}

async addToCart(){
    await this.page.waitForLoadState('networkidle');
    await this.addCart.waitFor({state: 'visible'});
    await this.addCart.click();


}
async gotoBag(){
    await this.goToBag.waitFor({state: 'visible'});
  await this.goToBag.click();
}

}

module.exports = {CtPOData}