const fetch = require('node-fetch')
const getToken = require('../token')

async function disks(key, args = undefined) {
    let token = await getToken(key)
    let ep = `https://management.azure.com/subscriptions/${key.subscription}/providers/Microsoft.Compute/disks?api-version=2020-06-30`

    return await fetch(ep, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.json()).then(res => res['value'])

}


async function deleteDisks(key, args = undefined) {
    let token = await getToken(key)
    let ep = `https://management.azure.com/subscriptions/${key.subscription}/resourceGroups/${args.resourceGroupName}/providers/Microsoft.Compute/disks/${args.name}?api-version=2020-06-30`

    let res = await fetch(ep, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: 'DELETE'
    })
    console.log("res:", res)
    console.log("args", args)
    return res.status < 400
}

module.exports = {
    default: {
        get: disks,
        delete: deleteDisks
    },
    etc: {
    }
}