
const { test } = require('@playwright/test');

let webContext;
test('@API trello login',async ({ browser }) => {
   
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3FreturnUrl%3D%252Flogin%2527%26display%3D%26aaOnboarding%3D%26updateEmail%3D%26traceId%3D%26ssoVerified%3D%26createMember%3D%26jiraInviteLink%3D');
    await page.waitForLoadState();
    await page.locator('#username-uid1').fill("muhammadshahid21071998@gmail.com");
    await page.locator('#login-submit').click();
    await page.locator('#password').fill("Myounus@93");
    await page.locator('#login-submit').click();
    await page.locator('[aria-label="Back to home"]').click();
    await page.waitForURL('https://trello.com/u/muhammadshahid21071998/boards');
    await context.storageState({path: 'state.json'})
    webContext = await browser.newContext({storageState: 'state.json'});

  
});

test('@API bypass login', async () => {
  const page = await webContext.newPage();
  await page.goto('https://trello.com/u/muhammadshahid21071998/boards');
    await page.title();
    await page.pause();
    await page.getByText("My Trello board").first().click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Add a card in Today' });
    
    await page.locator('textarea').nth(1)
          .fill('add a new card today');
    


});