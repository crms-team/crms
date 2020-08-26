const AWS = require('aws-sdk')

async function describeSecurityGroups(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeSecurityGroups().promise())['SecurityGroups']
}

async function createSecurityGroup(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        return (await ec2.createSecurityGroup(args).promise())['GroupId']
    } catch {
        console.log("SecurityGroup POST Error (createSecurityGroup Error)")
        return false
    }
}

async function updateSecurityGroupRuleDescriptions(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    let type = args.type
    let data = args.data
    try {
        if (type == 'egress') {
            await ec2.updateSecurityGroupRuleDescriptionsEgress(data).promise()
        } else if (type == 'ingress') {
            await ec2.updateSecurityGroupRuleDescriptionsIngress(data).promise()
        } else {
            return false
        }
        return true
    } catch {
        console.log("SecurityGroup PUT Error (updateSecurityGroupRuleDescriptions Error)")
        return false
    }
}

async function deleteSecurityGroup(key, args=undefined) {
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    try {
        await ec2.deleteSecurityGroup(args).promise()
        return true
    } catch {
        console.log("SecurityGroup DELETE Error (deleteSecurityGroup Error)")
        return false
    }
}


module.exports = {
    default: {
        get: describeSecurityGroups,
        post: createSecurityGroup,
        put: updateSecurityGroupRuleDescriptions,
        delete: deleteSecurityGroup
    },
    etc: {}
}

