class Dashboard{

    constructor(page){
        this.page = page;
        this.cardTitles = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        

    }
    async addProductToCart(productName){
        await this.page.waitForLoadState('networkidle');
        await this.cardTitles.first().waitFor(); //wait until atleast one card body is loaded
        const allTitles = await this.cardTitles.allTextContents();
        console.log(allTitles);
        const count = await this.products.count();
        for(let i=0; i< count; ++i){
            if(await this.products.nth(i).locator("b").textContent() === productName){
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

}
module.exports = {Dashboard}