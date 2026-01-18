const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const loginPayLoad = {userEmail: "muhammadbaig1995@gmail.com",userPassword: "Myounus@93"};
const orderPayLoad = {orders: [{country: "Pakistan", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let response;
test.beforeAll( async()=>
{   

    //API login
    const apiContext = await request.newContext();
    
    const apiUtils = new APiUtils(apiContext,loginPayLoad);
    response =  await apiUtils.createOrder(orderPayLoad);
})

test("place order and make web api call and to bypass login scenario", async({page})=>
{   

    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
    await page.pause();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


for(let i =0; i<await rows.count(); ++i)
    {
       const rowOrderId =await rows.nth(i).locator("th").textContent();
       if (response.orderId.includes(rowOrderId))
       {
           await rows.nth(i).locator("button").first().click();
           break;
       }
    }
    const orderIdDetails =await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();


    


})


// let token;

// // IMPORTANT: Use a fictional URL for educational demonstration.
// // The structure below is how you would debug the failure in a real scenario.
// const API_LOGIN_URL = "https://app.clickup.com/login"; 
// const TARGET_APP_URL = "https://clickup.com/"; // Fictional app URL

// // 1. Log in via API before any test runs
// test.beforeAll(async ({ playwright }) => {
//     // Note: Playwright's 'request' fixture is provided here, or use 'request.newContext()'
//     const apiContext = await playwright.request.newContext();
    
//     console.log(`Attempting login via hypothetical API endpoint: ${API_LOGIN_URL}`);
    
//     // In a real test, you must use the actual API call here:
//     // const loginResponse = await apiContext.post(API_LOGIN_URL, { data: payload });

//     // --- TEMPORARY MOCK FOR DEMONSTRATION ---
//     // We simulate a successful login here for the rest of the test flow:
//     const mockResponse = { token: 'mock-auth-token-' + Date.now(), userId: 12345 };
//     const loginResponsejson = mockResponse;
//     // --- END MOCK ---
    
//     // If you were running a real API call (uncomment the line above this block):
//     /*
//     const loginResponse = await apiContext.post(API_LOGIN_URL, { data: payload });

//     // --- FIX: Check for non-OK status and print the body for debugging ---
//     if (!loginResponse.ok()) {
//         const responseBodyText = await loginResponse.text();
//         throw new Error(
//             `API Login failed. Status: ${loginResponse.status()}. 
//             The response was likely HTML or an error page, not JSON. 
//             Response Body Start: ${responseBodyText.substring(0, 50)}...`
//         );
//     }
//     // --- END FIX ---
    
//     // This line caused your SyntaxError because the body was HTML, not JSON.
//     const loginResponsejson = await loginResponse.json(); 
//     */
    
//     token = loginResponsejson.token;
//     console.log(`[AUTH] Successfully retrieved token: ${token.substring(0, 15)}...`);
// });

// // 2. Inject the token into the browser state before navigating
// test("set token and navigate to authenticated page", async ({ page }) => {

//     // IMPORTANT: The key used in localStorage ('token' here) MUST exactly match 
//     // the key the target application uses to store its authentication token. 
//     const localStorageKey = 'token'; 

//     await page.addInitScript(
//         ({ key, value }) => {
//             window.localStorage.setItem(key, value);
//         }, 
//         { key: localStorageKey, value: token } // Pass the variables safely
//     );

//     // Navigate to the secured page
//     await page.goto(TARGET_APP_URL);
    
//     // Optional: Verify navigation succeeded and an authenticated element is visible
//     console.log(`Current Page Title: ${await page.title()}`);
//     // await expect(page.locator('h1')).toHaveText(/Welcome back/);

// });