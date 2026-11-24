class LoginPage{

    constructor(page){
        //write all the locators in the constructor
        this.page = page; //write this to make page available to this class
        this.userName = page.locator("#userEmail");
        this.password = page.locator("[type='password']");
        this.signIn = page.locator("[type='submit']");
        this.products = page.locator(".card-body");
    }
    
    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(userName, password){
    
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.signIn.click();
    await this.page.waitForLoadState('networkidle');
    }

}
module.exports = {LoginPage}