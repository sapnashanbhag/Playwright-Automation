const {expect} = require('@playwright/test');

const {customtest} = require('./utils/fixtures.js'); 
//will tell location of custom fixture

customtest("Fixtures demo", async({authenticatedPage, createOrder}) =>
{
    //authenticatedPage is a custom fixture
    //login to application, create order and verify if order is created from history page
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/");
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    //confirming that test is passed and order id is visible
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();

}

);