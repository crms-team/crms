const AWS = require('aws-sdk')

async function describeVolumes(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeVolumes().promise())['Volumes']
}

async function modifyVolume(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        return (await ec2.modifyVolume(agrs).promise())['VolumeModification']
    } catch {
        console.log("EBS PUT Error (modifyVolume Error)")
        return false
    }
}

async function createVolume(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        return (await ec2.createVolume(args).promise())['VolumeId']
    } catch {
        console.log("EBS POST Error (createVolume Error)")
        return false        
    }
}

async function deleteVolume(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try { 
        return (await ec2.deleteVolume(args).promise())
    } catch {
        console.log("EBS DELETE Error (deleteVolume Error)")
        return false
    }
}

async function attachVolume(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try { 
        return (await ec2.attachVolume(args).promise())
    } catch {
        console.log("EBS Attach Error (attachVolume Error)")
        return false
    }
}


async function detachVolume(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try { 
        return (await ec2.detachVolume(args).promise())
    } catch {
        console.log("EBS detach Error (detachVolume Error)")
        return false
    }
}

module.exports = {
    default: {
        get: describeVolumes,
        post: createVolume,
        put: modifyVolume,
        delete: deleteVolume
    },
    etc: {
        attach: attachVolume,
        detach: detachVolume
    }
}