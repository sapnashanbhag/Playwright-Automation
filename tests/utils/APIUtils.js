class APIUtils{
    //apiContext and loginPayload should come dynamically from WebAPIPArt1.spec.js.
    //Hence constructor is created
    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken(){
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
     { data:this.loginPayload })
     //check if login response says OK
     //expect((await loginResponse).ok()).toBeTruthy();
     const loginResponseJson = await loginResponse.json();
     const token = loginResponseJson.token;
     console.log(token);
     return token;
    }
    //orderPayload is passed dynamically from WebAPIPArt1.spec.js
    async createOrder(orderPayload)
    {
        //we created response so that token and orderID can both be sent together
        let response = {};
        response.token = await this.getToken();
        //calling API Passing data and headers
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            //it needs headers since authentication data for login needs to be passed which is token
            headers:
            {
                'Authorization': response.token,
                'Content-Type': "application/json",
            },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}
//make the class visible to all other classes using below
module.exports = {APIUtils};