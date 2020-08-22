const AWS = require('aws-sdk')


async function describeKeyPair(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeKeyPairs().promise())['KeyPairs']
}

async function deleteKeyPair(key, args=undefined) {
    try {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        await ec2.deleteKeyPair({KeyPairId: args}).promise()
        return true
    } catch {
        return false
    }
}

module.exports = {
    default: {
        get: describeKeyPair,
        delete: deleteKeyPair
    },
    etc: {}
}

