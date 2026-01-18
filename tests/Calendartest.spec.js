const {test, expect} = require('@playwright/test');

// in this lecture we i covered a calendar scenario with booking website, and perform assertions and other operations.

test("booking.com reserve booking iwth calendar", async({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    const cookies = page.locator('#onetrust-accept-btn-handler');
    const signInDismiss = page.getByRole('button', {name: 'Dismiss sign-in info.'});
    const map = page.getByText("Close map");


    await page.goto("https://www.booking.com/index.html?label=en-gb-booking-desktop-a9bRvPFfRXz4ZWUhVi3c0gS652796016378%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-394218728%3Alp1006747%3Ali%3Adec%3Adm&sid=bdc243ae7cc47a6e3afa26bd06f7508b&gclid=CjwKCAiAl-_JBhBjEiwAn3rN7UJDDIAucOOdaBbWGKSBmZ4IT01jqxS0yg4OHi1fGHyNsJ649UVLZRoCto4QAvD_BwE&aid=2311236");
    await page.title();

   await page.pause();

    if(await cookies.isVisible){
        await cookies.click();
    }
    if(await signInDismiss.isVisible()){
        await signInDismiss.click();
    }
  

    await page.locator('.b915b8dc0b').fill("London");
    await page.waitForTimeout(1000);
    await page.locator('#autocomplete-result-1').click();

    const datePicker = page.getByTestId("datepicker-tabs");
    await expect(datePicker).toBeVisible();

    await datePicker.getByText("31").first().click();
    await datePicker.getByText("20").last().click();
''
    await page.getByRole('button', { name: 'Search' }).click();
    await page.waitForLoadState();
    await page.waitForSelector('#bodyconstraint', {state: 'visible'});  

    if(await signInDismiss.isVisible()){
        await signInDismiss.click();
    }
    if (await map.isVisible()) {
        // Use first() in case multiple elements match the general text "Close map"
        await map.first().click();
    }
    

    const hotel  = page.locator('.aa97d6032f');
    await hotel.first().waitFor({ state: 'visible', timeout: 5000 })

    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        hotel.first().click(),
    ]);

    await newpage.waitForLoadState();
    console.log("successfully load the selected hotel page:");
   

    const roomselect =  newpage.locator('.hprt-nos-select').first();
    await roomselect.selectOption("1");

    const reserveButton = newpage.getByRole('button', { name: /I'll reserve/i });
    await Promise.all([
        // Wait for the new reservation/checkout page to load
        newpage.waitForNavigation({ waitUntil: 'load' }), 
        reserveButton.first().click(),
    ]);
    

    

    await page.pause();


})