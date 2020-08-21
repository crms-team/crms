const fs = require('fs')
const crms = require('../../../crms')

function getLastDataFileName(path, keyId){
    let dataDict = `${path}/data/${keyId}`
    let list = fs.readdirSync(dataDict).sort()

    return list[list.length - 1]
}

function getType(vendor, resource){
    let types = Object.keys(crms[vendor]['session'])

    for (let type of types){
        let crmsObject = crms[vendor]['session'][type]
        for (let res in crmsObject){
            if (res == resource) 
                return type
        }
    }

    return undefined
}

function checkKeyParms(keyId, keys) {
    if (!keyId){
        return {
            result: false,
            msg: "Required key ID"
        }
    }

    if (!(keyId in keys)) {
        return {
            result: false,
            msg: "This Key ID is not registered."
        }
    }

    return undefined
}

function checkCrmsParms(keyId, resourceType, keys, vendor) {
    let checkParms = checkKeyParms(keyId, keys)

    if (checkParms) {
        return checkParms
    }

    if (resourceType == undefined){
        return {
            result: false,
            msg: "Not Support this resource"
        }
    }

    if (vendor != keys[keyId].vendor){
        return {
            result: false,
            msg: "This Key Not Support this vendor"
        }
    }

    return undefined
}

module.exports = server => {
    {
        server.get("/api/cloud/data", async (req, res)=> {
            let keyId = req.query.key_id
            let apiType = req.query.type
            let keys = server.keys.getKeyData(server.config.path)
            let vendor = keys[keyId].vendor
            let checkParms = checkKeyParms(keyId, keys)

            if (checkParms) {
                res.send(checkParms)
                return 
            }

            if (apiType){
                await crms.data.saveData(server.config.path, keyId, vendor, keys[keyId].keys)
            }                 
            
            let dataFile = getLastDataFileName(server.config.path, keyId)
            res.send({
                result: true,
                vendor: vendor, 
                data: JSON.parse(fs.readFileSync(`${server.config.path}/data/${keyId}/${dataFile}`))
            })

        })
    }
    
    {
        server.get("/api/cloud/data/:vendor/:resource", async (req, res) => {
            let keyId = req.query.key_id
            let apiType = req.query.type
            let vendor = req.params.vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            let keys = server.keys.getKeyData(server.config.path)
            let checkParms = checkCrmsParms(keyId, resourceType, keys, vendor)

            if (checkParms) {
                res.send(checkParms)
                return 
            }

            if (apiType){
                let dataFile = getLastDataFileName(server.config.path, keyId)
                let data = JSON.parse(fs.readFileSync(`${server.config.path}/data/${keyId}/${dataFile}`))

                res.send({
                    result: true,
                    data: data[resourceType][resource]
                })
            } else {
                let crmsFunction = crms[vendor]['session'][resourceType][resource]['default']['get']
                res.send({
                    result: true,
                    data: await crmsFunction(keys[keyId].keys)
                })
            }

        })

        server.post("/api/cloud/data/:resource", async (req, res) => {
            let keyId = req.body.key_id
            let params = req.body.parms
            let vendor = req.params.vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            let keys = server.keys.getKeyData(server.config.path)
            let checkParms = checkCrmsParms(keyId, resourceType, keys, vendor)
            
            if (checkParms) {
                res.send(checkParms)
                return 
            }

            let crmsFunction = crms[vendor]['session'][resourceType][resource]['default']['post']

            if (crmsFunction) {
                try {
                    crmsFunction(keys[keyId].keys, params)
                    res.send({
                        result: true
                    })
                } catch {
                    res.send({
                        result: false,
                        msg: "API Error"
                    })
                }
            } else {
                res.send({
                    result: false,
                    msg: "this not support resource api"
                })
            }

        })
    }

    {
        server.get("/api/cloud/data/list/:resource", (req, res) => {

        })
    }
}