const {test, expect} = require('@playwright/test')
let webContext;

test.beforeAll(async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#userEmail");
    const password = page.locator("[type='password']");
    const signIn = page.locator("[type='submit']");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userName.fill("sapna22.shanbhag@gmail.com");
    await password.fill("Dec@2026");
    await signIn.click();
    await page.waitForLoadState('networkidle');
    //create a json file which has content of the storage session
    await context.storageState({path: 'state.json'})
    //injecting the storage data into browser
    webContext = await browser.newContext({storageState: 'state.json'});

})

test('Practice Playwright test', async({}) =>
{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const cardTitles = page.locator(".card-body b");
     //wait until all network calls are made
    await page.locator(".card-body b").first().waitFor(); //wait until atleast one card body is loaded
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    const count = await products.count();
    for(let i=0; i< count; ++i){
        if(await products.nth(i).locator("b").textContent() === productName){
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); //waits for div li locator (cart items) to show up on the page.
    //playwright doesnt wait for isVisible method. Hence we have to put wait in above line
    const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
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
    await expect(page.locator(".user__name [type='text']").first()).toHaveText("sapna22.shanbhag@gmail.com");
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
