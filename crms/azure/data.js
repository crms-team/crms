const compute = require('./compute')
const network = require('./network')
// const database = require('./database')
// const storage = require('./storage')

// async function getAzureDatabaseData(key) {
//     return {
//         database: await database.database.default.get(key)
//     }
// }

// async function getAzureStorageData(key) {
//     return {
//         bucket: await storage.bucket.default.get(key)
//     }
// }

async function getAzureComputeData(key) {
    return {
        server: await compute.server.default.get(key),
        volume: await compute.volume.default.get(key),
        keypair: await compute.keypair.default.get(key),
        ip: await compute.ip.default.get(key)
    }
}

async function getAzureNetworkData(key) {
    return {
        vpc: await network.vpc.default.get(key),
        subnet: await network.subnet.default.get(key),
        securitygroup: await network.securitygroup.default.get(key),
        networkinterface: await network.networkinterface.default.get(key)
    }
}

async function getAzureData(key){
    return {
        compute: await getAzureComputeData(key),
        network: await getAzureNetworkData(key),
        // storage: await getAzureStorageData(key),
        // database: await getAzureDatabaseData(key)
    }
}

module.exports = {
    getAllData: getAzureData,
}