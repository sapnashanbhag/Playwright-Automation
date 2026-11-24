const {test,expect} = require ('@playwright/test');

test('Retrying Rahul Shetty Academy',async({page})=>{
    //This part logs in to the url and asserts if Filters is visible after being logged in
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("sapna22.shanbhag@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Dec@2026");
    await page.getByRole("button",{name: "Login"}).click();
    await expect(page.getByText("Filters").nth(2)).toBeVisible();
    //wait for the products to get loaded
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body").first().waitFor();
    //click on add to cart
    const product = page.locator(".card-body").filter({hasText:"ZARA COAT 3"});
    await product.getByRole("button",{name:"Add to Cart"}).click();
    //click on cart
    await page.locator("[routerlink*='cart']").click();
    await page.getByText("Checkout").waitFor();
    await expect(page.getByText("My Cart")).toBeVisible();
    //click on checkout button
    await page.getByRole("button",{name:"Checkout"}).click();
    await expect(page.getByText("Shipping Information")).toBeVisible();
    //selecting India option in the Select Country
    await page.getByPlaceholder("Select Country").waitFor();
    await page.getByPlaceholder("Select Country").pressSequentially("India",{delay:10});
    await page.getByRole("button",{name:"India"}).nth(1).click();
    //Click Place Order
    await page.getByText("PLACE ORDER").click();

    await page.getByText("Thankyou for the order.").waitFor();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    //get the order Id & search for the order ID in list of orders in Orders Page
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    
    const actualorderId = orderId.split(" ")[2];
    console.log(actualorderId);
    
    //click on Orders and search for order id in list of orders
    await page.locator("[routerlink*='myorders']").nth(0).click();
    await page.locator("tbody").waitFor();
    await expect(page.locator("tr th").filter({hasText:actualorderId})).toBeVisible();
});