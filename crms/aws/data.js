const aws = require('.')

async function getAWSComputeData(key){
    return {
        ec2: await aws.compute.ec2.default.get(key),
        ebs: await aws.compute.ebs.default.get(key)
    }
}

async function getAWSNetworkData(key) {
    return {
        vpc: await aws.network.vpc.default.get(key),
        subnet: await aws.network.subnet.default.get(key),
        securityGroup: await aws.network.securityGroup.default.get(key)
    }
}

async function getAWSData(key){
    return {
        compute: await getAWSComputeData(key),
        network: await getAWSNetworkData(key)
    }
}

module.exports = {
    getAWSData: getAWSData
}