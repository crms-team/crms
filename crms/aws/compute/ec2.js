const AWS = require('aws-sdk')

async function describeInstances(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeInstances().promise())['Reservations']
}

async function describeInstanceTypes(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeInstanceTypes().promise())['InstanceTypes']
}

async function stopInstances(key, ids) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.stopInstances({
            InstanceIds: ids
        }).promise()
        return true
    } catch {
        return false
    }
}

async function startInstances(key, ids) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.startInstances({
            InstanceIds: ids
        }).promise()
        return true
    } catch {
        return false
    }
}

async function terminateInstance(key, ids) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.terminateInstances({
            InstanceIds: ids
        }).promise()
        return true
    } catch {
        return false
    }
}

async function runInstances(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.runInstances(args).promise()
        return true
    } catch {
        return false
    }
}

async function modifyInstanceAttribute(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.modifyInstanceAttribute({
            ...args
        }).promise()
        return true
    } catch {
        return false
    }    
}



module.exports = {
    default: {
        get: describeInstances,
        post: runInstances,
        put: modifyInstanceAttribute,
        delete: terminateInstance
    },
    etc: {
        types: describeInstanceTypes,
        start: startInstances,
        stop: stopInstances
    }
}