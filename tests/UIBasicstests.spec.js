//import playwright annotation that is a library
const {test, expect} = require('@playwright/test')

test('Practice Playwright test', async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#userEmail");
    const password = page.locator("[type='password']");
    const signIn = page.locator("[type='submit']");
    const cardTitles = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userName.fill("sapna22.shanbhag@gmail.com");
    await password.fill("Dec@2026");
    await signIn.click();
    await page.waitForLoadState('networkidle');
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});

test('UI Controls', async({page}) =>
{   
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //const context = await browser.newContext();
    //const page = await context.newPage();
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    console.log(await page.locator(".radiotextsty").nth(1).isChecked());
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");


});

test('Child window handling', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    //once all promises are fulfilled only then next step in executed. it helps to make sure all steps 
    //...are executed before it goes to next steps
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen for any new pages to open
        documentLink.click(),
    //to create a new page and wait for page to open in bkground
    ]);
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const textArray=text.split("@");
    const email = textArray[1].split(" ")[0];
    console.log(email);
    await page.locator("#username").fill(email);
    await page.pause();


});

test('Browser Context Playwright Test', async ({browser}) =>
{
    //open a browser
    
    const context = await browser.newContext();
    const page = await context.newPage(); //creates page to automate
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Page Playwright Test', async ({page}) =>
{
    //open a browser
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});