const fetch = require('node-fetch')
const getToken = require('../token')

async function virtualMachines(key, args = undefined) {
    let token = await getToken(key)
    let ep = `https://management.azure.com/subscriptions/${key.subscription}/providers/Microsoft.Compute/virtualMachines?api-version=2020-06-01`

    let vmData = await fetch(ep, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.json()).then(res=>res['value'])

    let vmStatus = await fetch(`${ep}&statusOnly=true`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.json()).then(res=>res['value'])

    let publicIps = await fetch(`https://management.azure.com/subscriptions/${key.subscription}/providers/Microsoft.Network/publicIPAddresses?api-version=2020-05-01`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.json()).then(res=>res['value'])
    
    let statusCodeJson = {
        deallocated: 'stopped',
        running: 'running'
    }

    for (let i in vmData) {
        // Add Status Data
        for (let vm of vmStatus) {
            if (vmData[i].id == vm.id) {
                let status = 'creating'
                for (let statusData of vm.properties.instanceView.statuses) {
                    if (statusData.code.indexOf('PowerState') > -1) {
                        status = statusCodeJson[statusData.code.split('/')[1]] == undefined ? statusCodeJson[statusData.code.split('/')[1]]:statusData.code.split('/')[1]
                        break
                    }
                }
                vmData[i]['properties']['status'] = status
                break
            }
        }

        // Add Public Ip Data
        for (let ip of publicIps) {
            let ipAddr = undefined

            for (let nic of vmData[i].properties.networkProfile.networkInterfaces) {
                if (ip.properties.ipConfiguration.id.indexOf(nic.id) > -1) {
                    ipAddr = ip.properties.ipAddress ? ip.properties.ipAddress : ''
                    break
                }
            }

            if (ipAddr != undefined) {
                vmData[i]['properties']['publicIp'] = ipAddr
                break
            }
        }
    }

    return vmData
}

async function powerOff(key, args = undefined) {
    let token = await getToken(key)
    let ep = `https://management.azure.com/subscriptions/${key.subscription}/resourceGroups/${args.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${args.name}/powerOff?api-version=2020-06-01`

    let res = await fetch(ep, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: 'POST'
    })

    return res.status < 400
}

async function start(key, args = undefined) {
    let token = await getToken(key)
    let ep = `https://management.azure.com/subscriptions/${key.subscription}/resourceGroups/${args.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${args.name}/start?api-version=2020-06-01`

    let res = await fetch(ep, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: 'POST'
    })

    return res.status < 400
}

async function deleteVirtualMachines(key, args = undefined) {
    let token = await getToken(key)
    let ep = `https://management.azure.com/subscriptions/${key.subscription}/resourceGroups/${args.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${args.name}?api-version=2020-06-01`

    let res = await fetch(ep, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: 'DELETE'
    })

    return res.status < 400
}

async function runInstances(key, args = undefined) {
    let token = await getToken(key)
    let ep = `https://management.azure.com/subscriptions/${args.subscriptionId}/resourceGroups/${args.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${args.vmName}?api-version=2020-06-01`

    return res.status <  400
}

async function modifyInstanceAttribute(key, args = undefined) {}

module.exports = {
    default: {
        get: virtualMachines,
        post: runInstances,
        put: modifyInstanceAttribute,
        delete: deleteVirtualMachines
    },
    etc: {
        start: start,
        stop: powerOff
    }
}