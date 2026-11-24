const {test, expect} = require('@playwright/test');

test("@Web Event Hub Login",async({page}) => {
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("sapna22.shanbhag@gmail.com");
    await page.locator("[type='password']").fill("Dec@2026")
    await page.getByRole("button", {name: "Sign In"}).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole("button",{name:"Admin"}).click();
    await page.getByRole("link",{name:"Manage Events"}).nth(0).hover();
    await page.getByText("Manage Events").nth(1).click();


})