# CRMS

CRMS is Cloud Resource Management System and, 


Because CRMS is a cloud management system, it is integrated with the cloud.

CRMS can be used as follows:
```javascript
const crms = require('./crms') // crms 

const key = keyData 

/*
 * AWS KEY SET
 * {
 *    "accessKeyId": "ACCESS_KEY",
 *    "secretAccessKey": "SECRET_KEY",
 *    "region": "REGION"
 * }
 */
async function ec2_test() {
    let ec2 = crms.aws.compute.ec2

    // all resource get default !!
    // args info has aws-sdk
    let ec2Data = await ec2.default.get(key)
    let ec2Create = await ec2.default.post(key, args)
    let ec2Update = await ec2.default.put(key, args)
    let ec2Delete = await ec2.default.delete(key ,args)

    console.log(ec2Data)
    console.log(ec2Create)
    console.log(ec2Update)
    console.log(ec2Delete)

    // etc function (not all get etc)
    await ec2.etc.start(key, args)
    await ec2.etc.stop(key, args)
}

ec2_test()
```

### `aws`
---
`aws` uses aws-sdk.

https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS.html

### `data`
---
> `data` is a module that analyzes the history of data imported through CRMS, stores it in history.json, and creates a log.


