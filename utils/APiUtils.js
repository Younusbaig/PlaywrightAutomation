class APiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
 
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }   
 
    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();
        console.log("SERVER RESPONSE:", orderResponseJson);
        if (orderResponseJson.orders && orderResponseJson.orders.length > 0) {
            const orderId = orderResponseJson.orders[0];
            response.orderId = orderId;
        } else {
            // Agar fail hua toh wajah print karein
            throw new Error(`Order Create nahi hua! Server message: ${orderResponseJson.message}`);
        }
 
        return response;
    }
}
 
module.exports = { APiUtils };