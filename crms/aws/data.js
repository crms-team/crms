const aws = require('.')

function getAWSComputeData(key){
    return {
        ec2: aws.compute.describeInstances(key),
        ebs: aws.compute.describeVolumes(key)
    }
}

function getAWSNetworkData(key) {
    return {
        vpc: aws.network.describeVpcs(key),
        subnet: aws.network.describeSubnets(key),
        securityGroup: aws.network.describeSecurityGroups(key)
    }
}

function getAWSData(key){
    console.log(key)
    return {
        compute: getAWSComputeData(key),
        network: getAWSNetworkData(key)
    }
}

module.exports = {
    getAWSData: getAWSData
}