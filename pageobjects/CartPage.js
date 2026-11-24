const {test, expect} = require('@playwright/test');
class CartPage{

    constructor(page){
        this.page = page;
        this.cart = page.locator("[routerlink*='cart']")
        this.product = page.locator("div li")
        this.productName= page.locator("h3:has-text('ZARA COAT 3')")
        this.checkout = page.locator("text=Checkout")

    }
    async checkoutfromCart(){
        await this.cart.click();
        await this.product.first().waitFor(); //waits for div li locator (cart items) to show up on the page.
        //playwright doesnt wait for isVisible method. Hence we have to put wait in above line
        const bool = this.productName.isVisible();
        expect(bool).toBeTruthy();
        await this.checkout.click();

    }
}
module.exports = {CartPage}