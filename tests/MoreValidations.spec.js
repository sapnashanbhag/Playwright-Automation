const{test,expect} = require ('@playwright/test')

//whenever we use awaits we have to give async
test("Popup validations", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com/");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on("dialog",dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    //working with iframes. switch the control to frame
    const framespage = page.frameLocator("#courses-iframe");
    //playwright focuses only on visible locator since 1 is hidden :visible is given
    //This code below 3 lines will not work since the page is not visible in frame.
    await framespage.locator("li a[href*='lifetime-access']:visible").click();
    const textcheck = await framespage.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);
 
});

test("Screenshot and visual comparision",async({page}) => {
     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     await expect(page.locator("#displayed-text")).toBeVisible();
     await page.locator('#displayed-text').screenshot({path:'screenshot1.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'}) //takes screenshot of page after textbox is hidden
    await expect(page.locator("#displayed-text")).toBeHidden();


});

//first time this code willthrow error and create a snapshot. 2nd time onwards it will compare
test("Visual testing", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})


