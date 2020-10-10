const fetch = require('node-fetch')
const getToken = require('../token')
const virtualNetworks = require('./vnet').default.get

async function subnets(key, args = undefined) {
    let result = []
    let vnets = await virtualNetworks(key)

    for (let subnet of vnets) {
        result = result.concat(subnet.properties.subnets)
    }

    return result
}


module.exports = {
    default: {
        get: subnets,
    },
    etc: { }
}