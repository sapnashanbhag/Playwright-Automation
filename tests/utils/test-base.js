const base = require('@playwright/test')

//To make this visible write exports.test
exports.customtest = base.test.extend(
    {
        testDataforOrder:
        {
            username: "sapna22.shanbhag@gmail.com",
            password: "Dec@2026",
            productname: "ADIDAS ORIGINAL"
        }
    }
)