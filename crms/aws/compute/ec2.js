const AWS = require('aws-sdk')

module.exports = {
    describeInstances: async (key) => {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        return await ec2.describeInstances().promise()
    },
    describeInstanceTypes: async (key) => {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        return await ec2.describeInstanceTypes().promise()
    },
    stopInstances: async (key, id) => {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        try {
            await ec2.stopInstances({
                InstanceIds: [id]
            }).promise()
            return true
        } catch {
            return false
        }
    },
    startInstances: async (key, id) => {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        try {
            await ec2.startInstances({
                InstanceIds: [id]
            }).promise()
            return true
        } catch {
            return false
        }
    },
    terminateInstance: async (key, id) => {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        try {
            await ec2.terminateInstances({
                InstanceIds: [id]
            }).promise()
            return true
        } catch {
            return false
        }
    },
    runInstances: async (key, args) => {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        try {
            await ec2.runInstances(args).promise()
            return true
        } catch {
            return false
        }
    },
    modifyInstanceAttribute: async (key, id, args) => {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        try {
            await ec2.modifyInstanceAttribute({
                InstanceId: id,
                ...args
            }).promise()
            return true
        } catch {
            return false
        }    
    }
}