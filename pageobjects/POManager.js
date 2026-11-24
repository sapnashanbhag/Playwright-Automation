const {Dashboard} = require("./Dashboard");
const {LoginPage} = require("./LoginPage");
const {CartPage} = require("./CartPage")

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboard = new Dashboard(page);
        this.cartPage = new CartPage(page);

    }
    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboard;
    }
    getCartPage(){
        return this.cartPage;
    }

}
module.exports = {POManager}