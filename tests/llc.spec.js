import {test,expect} from '@playwright/test'

test('Playwright test for special locators', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check(); //can also use .click()
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //5 seconds is default timeout for expect assertions. But if we want to increase it we add the timeout in the action
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000});
    await page.getByRole("link", {name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click(); //we dont need to add the name here as there is only 1 button




});

test('Playwright test for special locators2', async({page}) => {
    test.setTimeout(60000);
    page.setDefaultTimeout(90000);
    const slowExpect = expect.configure({timeout:9000});
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check(); //can also use .click()
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //5 seconds is default timeout for expect assertions. But if we want to increase it we add the timeout in the action
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("link", {name: 'Shop'}).click({timeout: 50000});
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click(); //we dont need to add the name here as there is only 1 button




});