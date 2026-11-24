const {test,expect,request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const { json } = require('node:stream/consumers');
//remove quotes to convert json to javascript in info from network -> payload
const loginPayload = {userEmail:"sapna22.shanbhag@gmail.com",userPassword:"Dec@2026"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let response;
//let orderId;
const fakePayloadOrders = { data: [], message: "No Orders" };

test.beforeAll( async() => 
{
    
    //create new apiContext like browserContext for api call
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
  
  
});

test('Place the order', async({browser}) =>
{
    //This is the way to pass values from this class to APIUtils using constructor dynamically
    const context = await browser.newContext();
    const page = await context.newPage();
    //setting the value as token in localstorage of the browser so login can be skipped
    //we need to ask the developer how they are storing session info to login. Is it in local storage or session storage or cookies, etc
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    },response.token);
    
   await page.goto("https://rahulshettyacademy.com/client/");

   await page.route("https://rahulshettyacademy.com/api/ecom/user/get-cart-count/*",
    async route => {
        //intercept response -> API response -> playwright generate fakeresponse -> send to browser
        const response = await page.request.fetch(route.request()) //fetches the response of routed url
        //converting to json object from javascript
        let body = JSON.stringify(fakePayloadOrders);
        route.fulfill(
            {   
                response,
                body,
                
            }
        );
    }
   );

    //code to go to orders page and check if the created order is available
    //Here we are using API to create order since our test only focuses on checking if
    //order id is present in list of orders in Order page
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.pause();
    /*await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i=0; i< await rows.count();i++){
        const rowOrderId= await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click(); //click the first button in the row with order id
            break;
        }
    }
    //textContent already has wait so we are not adding wait here
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    */
});
