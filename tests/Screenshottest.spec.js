const { test, expect } = require('@playwright/test');



test('screenshot and match it to do visual testing', async({page})=>
{

    await page.goto('https://www.rediff.com/');
    await page.title();
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})