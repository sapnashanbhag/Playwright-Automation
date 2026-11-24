const base = require('@playwright/test');
const {request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils.js');
const loginPayload = {userEmail:"sapna22.shanbhag@gmail.com",userPassword:"Dec@2026"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};


//test accepts only inbuilt fixtures so we have to use base
exports.customtest = base.test.extend(
    {
        //this is a custom fixture. We have to use parameter 'use' for custom fixture
        authenticatedPage: async({browser}, use) =>
    
     {
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
            //use will help to use the authenticated page as a page in other code
            
            await use(page);
            
            //tear down code
            await context.close();

    },
    
    createOrder: async({}, use) =>
    {
        //create new apiContext like browserContext for api call
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext,loginPayload);
        const response = await apiUtils.createOrder(orderPayload);
        await use(response) //gets ctored in createOrder
        //tear Down code runs at end
        await apiContext.dispose();
            
    }
}
)
