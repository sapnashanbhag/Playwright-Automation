const {expect} = require('@playwright/test')
class APIUtilsEvents{
    //apiContext and loginPayload should come dynamically from EventHubAPI.spec.js.
    //Hence constructor is created
    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    //We have to get token because event has to be created with specific login
    async getToken(){
    const loginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
     { data:this.loginPayload })
     //check if login response says OK
     expect((await loginResponse).ok()).toBeTruthy();
      const loginResponseJson = await loginResponse.json();
      
      const token = loginResponseJson.token;
      console.log(token);
      return token;
    }
    //orderPayload is passed dynamically from WebAPIPArt1.spec.js
    async createEvent(eventPayload)
    {
        //we created response so that token and orderID can both be sent together
        let response = {};
        response.token = await this.getToken();
        //calling API Passing data and headers
        const eventResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/events",
        {
            data: eventPayload,
            //it needs headers since authentication data for login needs to be passed which is token
            headers:
            {
                'Authorization': `Bearer ${response.token}`,
                'Content-Type': "application/json",
            },
        })
        const eventResponseJson = await eventResponse.json();
        console.log(eventResponseJson);
        const eventTitle = eventResponseJson.data.title;
        const eventId = eventResponseJson.data.id;
        response.eventTitle = eventTitle;
        response.eventId = eventId;

        return response;
    }
   /* async confirmBooking(confirmbookingPayload){
        let bookingresponse = {};
        bookingresponse.token = await this.getToken();
        bookingresponse.event = await this.createEvent();
        const eventId = bookingresponse.event.id;
        //calling API Passing data and headers
        const confirmbookingResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
        {
            data: {
                confirmbookingPayload,
                eventId: bookingresponse.event.id
            },
            //it needs headers since authentication data for login needs to be passed which is token
            headers:
            {
                'Authorization': `Bearer ${bookingresponse.token}`,
                'Content-Type': "application/json",
            },
        })
        const confirmBookingResponseJson = await confirmbookingResponse.json();
        console.log(confirmBookingResponseJson);
        const eventTitle = confirmBookingResponseJson.data.event.title;
        bookingresponse.eventTitle = eventTitle;

        return bookingresponse;
    }
     */   
}
//make the class visible to all other classes using below
module.exports = {APIUtilsEvents};