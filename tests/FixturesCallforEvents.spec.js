const {expect} = require('@playwright/test');

const {customtest} = require('./utils/fixturesforEvents.js');
const { create } = require('node:domain');
//will tell location of custom fixture

customtest("Fixtures Call for Events", async({authenticatedPage, createEvent}) =>
{
    
    await authenticatedPage.goto("https://eventhub.rahulshettyacademy.com/events");
    await authenticatedPage.locator("#nav-events").click();
    console.log("createEvent:", createEvent);
    console.log("Event title:", createEvent?.eventTitle);
    await expect (authenticatedPage.getByText(createEvent.eventTitle)).toBeVisible();
    }

);