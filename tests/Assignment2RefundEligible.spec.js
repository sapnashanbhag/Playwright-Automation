import { test, expect } from '@playwright/test';



const BASE_URL = 'https://eventhub.rahulshettyacademy.com';



// Reusable login helper function

async function loginAndGoToBooking(page) {

  await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder('you@email.com').fill('sapna22.shanbhag@gmail.com');

  await page.getByLabel('Password').fill('Dec@2026');

  await page.locator('#login-btn').click();

  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

}



test.describe('EventHub Refund Eligibility Tests', () => {



  test('Test 1 — Single ticket booking is eligible for refund', async ({ page }) => {

    // Step 1 — Login

    await loginAndGoToBooking(page);



    // Step 2 — Book first event with 1 ticket (default)

    await page.goto(`${BASE_URL}/events`);

    const firstEventCard = page.locator('[data-testid="event-card"]').first();

    await firstEventCard.locator('[data-testid="book-now-btn"]').click();



    await page.getByLabel('Full Name').fill('John Doe');

    await page.locator('#customer-email').fill('johndoe@example.com');

    await page.getByPlaceholder('+91 98765 43210').fill('+1 555 123 4567');

    await page.locator('.confirm-booking-btn').click();



    // Step 3 — Navigate to booking detail

    await page.getByRole('link', { name: 'View My Bookings' }).click();

    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

   

    await page.getByRole('link', { name: 'View Details' }).first().click();

    await expect(page.getByText('Booking Information')).toBeVisible();



    // Step 4 — Validate booking ref

    const bookingRef = (await page.locator('.booking-ref').first().innerText()).trim();

    const eventTitle = (await page.locator('h1').innerText()).trim();

   

    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));



    // Step 5 — Check refund eligibility

    await page.getByRole('button', { name: 'Check Refund Eligibility' }).click();

   

    const spinner = page.locator('#refund-spinner');

    await expect(spinner).toBeVisible();

    await expect(spinner).toBeHidden({ timeout: 6000 });



    // Step 6 — Validate result

    const resultElement = page.locator('#refund-result');

    await expect(resultElement).toBeVisible();

    await expect(resultElement).toContainText('Eligible for refund');

    await expect(resultElement).toContainText('Single-ticket bookings qualify for a full refund');

  });



  test('Test 2 — Group ticket booking is NOT eligible for refund', async ({ page }) => {

    // Step 1 — Login

    await loginAndGoToBooking(page);



    // Step 2 — Book first event with 3 tickets

    await page.goto(`${BASE_URL}/events`);

    const firstEventCard = page.locator('[data-testid="event-card"]').first();

    await firstEventCard.locator('[data-testid="book-now-btn"]').click();



    // Click the increment button (+) twice to increase quantity to 3

    const incrementBtn = page.locator('button:has-text("+")');

    await incrementBtn.click();

    await incrementBtn.click();



    await page.getByLabel('Full Name').fill('Jane Doe');

    await page.locator('#customer-email').fill('janedoe@example.com');

    await page.getByPlaceholder('+91 98765 43210').fill('+1 555 987 6543');

    await page.locator('.confirm-booking-btn').click();



    // Step 3 — Navigate to booking detail

    await page.getByRole('link', { name: 'View My Bookings' }).click();

    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

   

    await page.getByRole('link', { name: 'View Details' }).first().click();

    await expect(page.getByText('Booking Information')).toBeVisible();



    // Step 4 — Validate booking ref

    const bookingRef = (await page.locator('.booking-ref').first().innerText()).trim();

    const eventTitle = (await page.locator('h1').innerText()).trim();

   

    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));



    // Step 5 — Check refund eligibility

    await page.getByRole('button', { name: 'Check Refund Eligibility' }).click();

   

    const spinner = page.locator('#refund-spinner');

    await expect(spinner).toBeVisible();

    await expect(spinner).toBeHidden({ timeout: 6000 });



    // Step 6 — Validate result (different assertions)

    const resultElement = page.locator('#refund-result');

    await expect(resultElement).toBeVisible();

    await expect(resultElement).toContainText('Not eligible for refund');

    await expect(resultElement).toContainText('Group bookings (3 tickets) are non-refundable');

  });



});


