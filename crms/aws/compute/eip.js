const AWS = require('aws-sdk')

async function describeAddresses(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeAddresses().promise())['Addresses']
}

async function releaseAddresses(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.releaseAddress(args).promise())
}

async function allocateAddress(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.allocateAddress(args).promise())['AllocationId']
}

async function associateAddress(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try{
        return (await ec2.associateAddress(args).promise())['AssociationId']
    }
    catch(e){
        console.log(e)
    }
}


async function disassociateAddress(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.disassociateAddress(args).promise())
}


module.exports = {
    default: {
        get: describeAddresses,
        post: allocateAddress,
        delete: releaseAddresses
    },
    etc: {
        attach: associateAddress,
        detach: disassociateAddress
    }
}

