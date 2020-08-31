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
        await ec2.deleteKeyPair(args).promise()
        return true
    } catch {
        console.log("KeyPair DELETE Error (deleteKeyPair Error)")
        return false
    }
}

async function createKeyPair(key, args=undefined) {
    try {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        await ec2.createKeyPair(args).promise()
        return true
    } catch(e) {
        console.log("KeyPair POST Error (createKeyPair Error)")
        return false
    }
}

module.exports = {
    default: {
        get: describeKeyPair,
        post: createKeyPair,
        delete: deleteKeyPair
    },
    etc: {}
}

