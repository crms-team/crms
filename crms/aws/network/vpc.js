const AWS = require('aws-sdk')


async function describeVpcs(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeVpcs().promise())['Vpcs']
}

module.exports = {
    default: {
        get: describeVpcs
    }, 
    etc: {}
}

