const AWS = require('aws-sdk')

async function describeSubnets(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeSubnets().promise())['Subnets']
}

async function createSubnet(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        return (await ec2.createSubnet(args).promise())['Subnet']['SubnetId']
    } catch {
        console.log("Subnet POST Error (createSubnet Error)")
        return false
    }
}

async function modifySubnetAttribute(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.modifySubnetAttribute(args).promise()
        return true
    } catch {
        console.log("Subnet PUT Error (modifySubnetAttribute Error)")
        return false
    }
}

async function deleteSubnet(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.deleteSubnet(args).promise()
        return true
    } catch {
        console.log("Subnet DELETE Error (deleteSubnet Error)")
        return false
    }
}

module.exports = {
    default: {
        get: describeSubnets,
        post: createSubnet,
        put: modifySubnetAttribute,
        delete: deleteSubnet
    },
    etc: {}
}

