const base = require('@playwright/test');
const {request} = require('@playwright/test');
const {APIUtilsEvents} = require('../utils/APIUtilsEvents.js');
const loginPayload = {"email":"sapna22.shanbhag@gmail.com","password":"Dec@2026"};
const eventPayload = {"title":`Automation Test Event ${Date.now()}`,"description":"","category":"Conference","venue":"Test Venue","city":"Bangalore","eventDate":"2026-11-18T05:19:00.000Z","price":100,"totalSeats":300};


//test accepts only inbuilt fixtures so we have to use base
exports.customtest = base.test.extend(
    {
        //this is a custom fixture. We have to use parameter 'use' for custom fixture
        authenticatedPage: async({browser}, use) =>
    
        {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://eventhub.rahulshettyacademy.com/login");
            await page.getByPlaceholder("you@email.com").fill("sapna22.shanbhag@gmail.com");
            await page.locator("[type='password']").fill("Dec@2026")
            await page.getByRole("button", {name: "Sign In"}).click();
            await page.waitForLoadState('networkidle');
            //use will help to use the authenticated page as a page in other code
            
            await use(page);
            
            //tear down code will be executed after end of fixture execution
            await context.close();

    },
    
    createEvent: async({}, use) =>
    {
        const apiContext = await request.newContext();
        const apiUtils = new APIUtilsEvents(apiContext,loginPayload);
        const response = await apiUtils.createEvent(eventPayload);

        await use(response) //gets stored in createEvent
        //tear Down code runs at end
        await apiContext.dispose();
            
    }
}
)
