const AWS = require('aws-sdk')

async function describeInstances(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    let data = (await ec2.describeInstances().promise())['Reservations']
    let result = []

    for (let server of data) {
        result.push(server.Instances[0])
    }

    return result
}

async function describeInstanceTypes(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeInstanceTypeOfferings(args).promise())['InstanceTypeOfferings']
}

async function stopInstances(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.stopInstances(args).promise()
        return true
    } catch {
        console.log("EC2 Stop Error (stopInstances Error)")
        return false
    }
}

async function startInstances(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.startInstances(args).promise()
        return true
    } catch {
        console.log("EC2 Start Error (startInstances Error)")
        return false
    }
}

async function terminateInstance(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.terminateInstances(args).promise()
        return true
    } catch {
        console.log("EC2 DELETE Error (terminateInstance Error)")
        return false
    }
}

async function runInstances(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.runInstances(args).promise()
        return true
    } catch(e) {
        console.log(e)
        console.log("EC2 POST Error (runInstances Error)")
        return false
    }
}

async function modifyInstanceAttribute(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.modifyInstanceAttribute(args).promise()
        return true
    } catch(e) {
        console.log(e)
        console.log("EC2 PUT Error (modifyInstanceAttribute Error)")
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