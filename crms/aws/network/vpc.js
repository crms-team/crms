const AWS = require('aws-sdk')


async function describeVpcs(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeVpcs().promise())['Vpcs']
}

async function createVpc(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        return (await ec2.createVpc(args).promise())['Vpc']['VpcId']
    } catch {
        console.log("VPC POST Error (createVpc Error)")
        return false
    }
}

async function modifyVpcAttribute(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.modifyVpcAttribute(args).promise()
        return true
    } catch {
        console.log("VPC PUT Error (modifyVpcAttribute Error)")
        return false
    }
}

async function deleteVpc(key, args = undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.deleteVpc(args).promise()
        return true
    } catch (e) {
        console.log(e)
        console.log("VPC DELETE Error (describeVpcs Error)")
        return false
    }
}


module.exports = {
    default: {
        get: describeVpcs,
        post: createVpc,
        put: modifyVpcAttribute,
        delete: deleteVpc
    },
    etc: {}
}

