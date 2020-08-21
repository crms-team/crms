const AWS = require('aws-sdk')

async function describeAddresses(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeAddresses().promise())['Addresses']
}


module.exports = {
    default: {
        get: describeAddresses
    },
    etc: {

    }
}

