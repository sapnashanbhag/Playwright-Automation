const {test,expect} = require('@playwright/test');
const{customtest} = require('../tests/utils/test-base.js')
const {POManager} = require('../pageobjects/POManager.js');
const dataset = JSON.parse(JSON.stringify(require("../tests/utils/placeorderTestData.json"))); //converts JSON to string to  JS object
//the for loop is written for parameterised dataset
//$data.productname is written to change the testname everytime else it will throw error
for(const data of dataset){
test(`@Web Practice Playwright test for ${data.productname}`, async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);
    //loginPage.validLogin("Dec2026@test.com","Dec@2026");
   
    const dashboard = poManager.getDashboardPage();
    await dashboard.addProductToCart(data.productname);
   
    const cartpage = poManager.getCartPage();
    await cartpage.checkoutfromCart(dataset.productname);

    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:10}); 
    //enter one by one letter. if application server is slow it will fail hence delay is added it will delay 150 ms between each key stroke
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        console.log(text);
        if(text.trim() === "India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username);
    await page.locator(".action__submit").waitFor();
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId)
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i=0; i< await rows.count();i++){
        const rowOrderId= await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click(); //click the first button in the row with order id
            break;
        }
    }
    //textContent already has wait so we are not adding wait here
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
}

customtest('@Web Practice Playwright test with data as fixture', async({browser, testDataforOrder}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataforOrder.username,testDataforOrder.password);
    //loginPage.validLogin("Dec2026@test.com","Dec@2026");
   
    const dashboard = poManager.getDashboardPage();
    await dashboard.addProductToCart(testDataforOrder.productname);
   
    const cartpage = poManager.getCartPage();
    await cartpage.checkoutfromCart(testDataforOrder.productname);

    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:10}); 
    //enter one by one letter. if application server is slow it will fail hence delay is added it will delay 150 ms between each key stroke
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        console.log(text);
        if(text.trim() === "India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(testDataforOrder.username);
    await page.locator(".action__submit").waitFor();
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId)
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i=0; i< await rows.count();i++){
        const rowOrderId= await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click(); //click the first button in the row with order id
            break;
        }
    }
    //textContent already has wait so we are not adding wait here
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});


