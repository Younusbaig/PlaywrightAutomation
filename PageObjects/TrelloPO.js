class TrelloPO {


    constructor(page){

        this.page = page;
        this.username = page.locator('#username-uid1');
        this.password = page.locator('#password');
        this.loginsubmit1 = page.locator('#login-submit');
        this.loginsubmit2 = page.locator('#login-submit');
        // this.waitforload = page.pause();
        this.selectboard = page.getByText("My Trello board");
        this.selectcard = page.getByRole('button', { name: 'Add a card' });
        this.addcard = page.locator('textarea');
        this.logo = page.locator('[aria-label="Back to home"]');
        this.todayAddCardButton = page.locator('[aria-label="Add a card in List for UI"]');
        this.todayAddCartButton1 = page.locator('[aria-label="Add a card in List for UI"]');
        this.addCardTitle = page.locator('textarea[placeholder="Enter a title or paste a link"]');
        this.addCardConfirmButton = page.locator('button:has-text("Add card")');
        this.createList = page.getByRole('button', {name: 'Add another list'});
        this.addListName = page.locator('textarea[placeholder="Enter list name…"]');
        this.addConfirmationList = page.locator('button:has-text("Add list")');
        



    }

async goTo(){
    await this.page.goto("https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3FreturnUrl%3D%252Flogin%2527%26display%3D%26aaOnboarding%3D%26updateEmail%3D%26traceId%3D%26ssoVerified%3D%26createMember%3D%26jiraInviteLink%3D");
}


async validLogin(username, password){

    await this.username.fill(username);
    await this.loginsubmit1.click();
    await this.password.fill(password);
    await this.loginsubmit2.click();
    // await this.waitforload;

}

async goToHome(){
    await this.logo.click();
}

async trelloBoard(){
    await this.selectboard.first().click();
    // await this.page.waitForTimeout(1000);
    }

    async addCardInToday(cardTitle) {
        await this.todayAddCardButton.click();
        await this.addCardTitle.fill(cardTitle);
        await this.addCardConfirmButton.click();
    }
    async addCardInToday1(cardTitle){
        await this.todayAddCardButton1.click();
        await this.addCardTitle.fill(cardTitle);
        await this.addCardConfirmButton.click();
    }


async addList(addListTitle){
    await this.createList.click();
    await this.addListName.fill(addListTitle);
    await this.addConfirmationList.click();
}

}

module.exports = {TrelloPO}