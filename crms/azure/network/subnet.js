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

async function deleteSubnets(key, args=undefined) {
    let token = await getToken(key)
    let ep = `https://management.azure.com/subscriptions/${key.subscription}/resourceGroups/${args.resourceGroupName}/providers/Microsoft.Network/virtualNetworks/${args.vnetName}/subnets/${args.subnetName}?api-version=2020-05-01`
    
    let res = await fetch(ep, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: 'DELETE'
    })

    return res.status < 400
}

module.exports = {
    default: {
        get: subnets,
        delete: deleteSubnets
    },
    etc: { }
}