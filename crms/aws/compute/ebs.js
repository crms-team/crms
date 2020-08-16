const AWS = require('aws-sdk')

async function describeVolumes(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return await ec2.describeVolumes().promise()
}

module.exports = {
    default: {
        get: describeVolumes
    },
    etc: {}
}