const compute = require('./compute')
const network = require('./network')
const database = require('./database')
const storage = require('./storage')

async function getAWSComputeData(key){
    return {
        ec2: await compute.ec2.default.get(key),
        ebs: await compute.ebs.default.get(key)
    }
}

async function getAWSNetworkData(key) {
    return {
        vpc: await network.vpc.default.get(key),
        subnet: await network.subnet.default.get(key),
        securityGroup: await network.securityGroup.default.get(key)
    }
}

async function getAWSData(key){
    return {
        compute: await getAWSComputeData(key),
        network: await getAWSNetworkData(key)
    }
}

module.exports = {
    getAllData: getAWSData
}