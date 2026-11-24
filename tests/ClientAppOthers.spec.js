const {test, expect} = require('@playwright/test')

test('Practice Playwright test', async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const userName = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your passsword");
    const signIn = page.getByRole("button",{name:"Login"});
    const cardTitles = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userName.fill("sapna22.shanbhag@gmail.com");
    await password.fill("Dec@2026");
    await signIn.click();
    await page.waitForLoadState('networkidle'); //wait until all network calls are made
    await page.locator(".card-body b").first().waitFor(); //wait until atleast one card body is loaded
    //const allTitles = await cardTitles.allTextContents();
    await page.locator(".card-body").filter({hasText:"Zara Coat 3"})
    .getByRole("button",{name:"Add to Cart"}).click();
    //console.log(allTitles);
    
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator("div li").first().waitFor(); //waits for div li locator (cart items) to show up on the page.
    //playwright doesnt wait for isVisible method. Hence we have to put wait in above line
    await expect(page.getByText("Zara Coat 3")).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:10}); 
    //enter one by one letter. if application server is slow it will fail hence delay is added it will delay 150 ms between each key stroke
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
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
