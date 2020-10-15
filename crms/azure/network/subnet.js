const fetch = require('node-fetch')
const getToken = require('../token')
const virtualNetworks = require('./vnet').default.get

async function subnets(key, args = undefined) {
    let result = []
    let vnets = await virtualNetworks(key)

    for (let vnet of vnets) {
        let vnetId = vnet.id
        let subnets = vnet.properties.subnets

        for (let i in subnets) {
            subnets[i].properties['virtualNetworkId'] = vnetId
        }

        result = result.concat(subnets)
    }

    return result
}


module.exports = {
    default: {
        get: subnets,
    },
    etc: { }
}