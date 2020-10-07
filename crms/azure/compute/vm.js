const fetch = require('node-fetch')
const getToken = require('../token')

async function virtualMachines(key, args = undefined) {
    let token = await getToken(key)
    let ep = `https://management.azure.com/subscriptions/${key.subscription}/providers/Microsoft.Compute/virtualMachines?api-version=2020-06-01`

    return await fetch(ep, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.json()).then(res=>res['value'])

}

async function describeInstanceTypes(key, args = undefined) {}

async function stopInstances(key, args = undefined) {}

async function startInstances(key, args = undefined) {}

async function terminateInstance(key, args = undefined) {}

async function runInstances(key, args = undefined) {}

async function modifyInstanceAttribute(key, args = undefined) {}

module.exports = {
    default: {
        get: virtualMachines,
        post: runInstances,
        put: modifyInstanceAttribute,
        delete: terminateInstance
    },
    etc: {
        types: describeInstanceTypes,
        start: startInstances,
        stop: stopInstances
    }
}