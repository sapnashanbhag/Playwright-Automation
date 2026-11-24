const {test,expect,request} = require('@playwright/test');
const {APIUtilsEvents} = require('./utils/APIUtilsEvents');
const { json } = require('node:stream/consumers');
//remove quotes to convert json to javascript in info from network -> payload
const loginPayload = {"email":"sapna22.shanbhag@gmail.com","password":"Dec@2026"};
const eventPayload = {"title":`Automation Test Event ${Date.now()}`,"description":"","category":"Conference","venue":"Test Venue","city":"Bangalore","eventDate":"2026-11-18T05:19:00.000Z","price":100,"totalSeats":300};
//const confirmbookingPayload = {"customerName":"Test","customerEmail":"test@test.com","customerPhone":"1234567890","quantity":1,"eventId":30578};
let response;
//let orderId;

test.beforeAll( async() => 
{
    
    //create new apiContext like browserContext for api call
    //we are creating event before doing the test
    const apiContext = await request.newContext();
    const apiUtils = new APIUtilsEvents(apiContext,loginPayload);
    response = await apiUtils.createEvent(eventPayload);
   // bookingResponse = await apiUtils.confirmBooking(confirmbookingPayload);
  
  
});

test('Create the event', async({browser}) =>
{
    //This is the way to pass values from this class to APIUtils using constructor dynamically
    const context = await browser.newContext();
    const page = await context.newPage();
    //setting the value as token in localstorage of the browser so login can be skipped
    //we need to ask the developer how they are storing session info to login. Is it in local storage or session storage or cookies, etc
     console.log(response.token);
     page.addInitScript(value => {
         window.localStorage.setItem('eventhub_token', value);
     },response.token);
    
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    //code to go to events page and check if the created event is available
    //Here we are using API to create event since our test only focuses on checking if
    //event title is present in list of titles in Events page
   
    await page.locator("article").first().waitFor();
    const tabs = await page.locator("div article");
    //for(let i=0; i< await tabs.count();i++){
    //We are using nth(3) because new event is always in nth(3) position
        const tabeventId= await tabs.nth(3).locator("h3").textContent();
        console.log(tabeventId)
       if(await response.eventTitle.includes(tabeventId))
       {
            await tabs.nth(3).locator("a").nth(1).click(); //click the first button in the row with order id
           //console.log(response.eventId)
           await  page.getByText(tabeventId).waitFor();
           await expect(page.getByText(tabeventId).nth(1)).toBeVisible();
           const seatsavailabletext = await page.locator("div span[class='text-xs font-semibold text-emerald-600']").allTextContents();
           console.log(seatsavailabletext);
           //const seatsvailable = seatsavailabletext.split(" ");
           await page.getByPlaceholder("Your full name").fill("TestName");
           
           await page.getByPlaceholder("you@email.com").fill("you@email.com");
           await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
           await page.getByRole("button",{name:"Confirm Booking"}).click();
           await page.pause();
           
           await page.reload();
           await page.locator("div p span[class='text-emerald-600 font-semibold']").waitFor();
           const seats = await page.locator("div p span[class='text-emerald-600 font-semibold']").textContent();
            console.log(seats);
           
        }
           
           
        //}
    //}
});
