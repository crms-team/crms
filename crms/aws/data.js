const compute = require('./compute')
const network = require('./network')
const database = require('./database')
const storage = require('./storage')

async function getAWSDatabaseData(key) {
    return {
        database: await database.rds.default.get(key)
    }
}

async function getAWSStorageData(key) {
    return {
        bucket: await storage.s3.default.get(key)
    }
}

async function getAWSComputeData(key) {
    return {
        server: await compute.ec2.default.get(key),
        volume: await compute.ebs.default.get(key),
        keypair: await compute.keypair.default.get(key),
        ip: await compute.eip.default.get(key)
    }
}

async function getAWSNetworkData(key) {
    return {
        vpc: await network.vpc.default.get(key),
        subnet: await network.subnet.default.get(key),
        securitygroup: await network.securitygroup.default.get(key),
        internetgateway: await network.internetgateway.default.get(key)
    }
}

async function getAWSData(key){
    return {
        compute: await getAWSComputeData(key),
        network: await getAWSNetworkData(key),
        storage: await getAWSStorageData(key),
        database: await getAWSDatabaseData(key)
    }
}

module.exports = {
    getAllData: getAWSData,
}