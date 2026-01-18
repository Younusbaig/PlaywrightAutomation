class ZaraPO{


    constructor(page){
        this.page = page;
        this.cookies = page.locator('#onetrust-accept-btn-handler');
        this.menubutton = page.getByRole('button', { name: 'Open menu' });
        this.selectmenu = page.locator('#tabs-8-tab-1885841');
        this.getcategory = page.getByText("JACKETS | PUFFERS");
        this.getbysubcategory = page.getByText("overshirts");
        this.product = page.getByText("BOXY FIT OVERSHIRT");
        this.add = page.locator('button[data-qa-action="add-to-cart"]');
        this.size = page.getByRole('button', { name: 'M' })


    }


async goTo(){
    await this.page.goto("https://www.zara.com/uk/");
}

async cookiesbutton(){
    await this.cookies.click();
}

async selectproduct(){
    await this.menubutton.click();
    await this.selectmenu.click();
    await this.getcategory.click();
    await this.getbysubcategory.first().click();
    await this.product.first().click();


}


async selectsize(){
    await this.add.first().click();
    await this.size.first().click();

}
}


module.exports = {ZaraPO};