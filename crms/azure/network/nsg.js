const fetch = require('node-fetch')
const getToken = require('../token')

async function networkSecurityGroups(key, args = undefined) {
    let token = await getToken(key)
    let ep = `https://management.azure.com/subscriptions/${key.subscription}/providers/Microsoft.Network/networkSecurityGroups?api-version=2020-05-01`

    return await fetch(ep, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.json()).then(res => res['value'])

}


module.exports = {
    default: {
        get: networkSecurityGroups,
    },
    etc: {
    }
}