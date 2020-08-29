const fs = require('fs')
const PATH = require('path')
const crms = require('../../../crms')

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

function checkCrmsParams(keyId, resourceType, keys, vendor) {
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
    
    // /api/cloud/data
    // get cloud all data
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
            
            let dataFile = crms.data.getLastDataFileName(server.config.path, keyId)
            res.send({
                result: true,
                vendor: vendor,
                time: dataFile.split('.json')[0],
                data: JSON.parse(fs.readFileSync(PATH.normalize(`${server.config.path}/data/${keyId}/log/${dataFile}`)))
            })

        })
    }
    
    // /api/cloud/data/:vendor/:resource
    // get cloud resource data
    {
        server.get("/api/cloud/data/:vendor/:resource", async (req, res) => {
            let keyId = req.query.key_id
            let apiType = req.query.type
            let vendor = req.params.vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            let keys = server.keys.getKeyData(server.config.path)
            let checkParms = checkCrmsParams(keyId, resourceType, keys, vendor)
            let resourceId = req.query.resource_id
            let data = null

            if (checkParms) {
                res.send(checkParms)
                return 
            }


            if (apiType){
                let dataFile = crms.data.getLastDataFileName(server.config.path, keyId)
                data = JSON.parse(fs.readFileSync(PATH.normalize(`${server.config.path}/data/${keyId}/log/${dataFile}`)))[resourceType][resource]
            } else {
                let crmsFunction = crms[vendor]['session'][resourceType][resource]['default']['get']
                data = await crmsFunction(keys[keyId].keys)
            }

            if (resourceId) {
                let check = true
                for (let element of data) {
                    if (crms.data.resourceIdKeys[resource](element) == resourceId) {
                        data = element
                        check = false
                        break
                    }
                }

                if (check) {
                    res.send({
                        result: false,
                        msg: 'Not Exists this resource.'
                    })
                    return
                }
            }

            res.send({
                result: true,
                data: data
            })
        })

        server.post("/api/cloud/data/:resource", async (req, res) => {
            let keyId = req.body.key_id
            let params = req.body.parms
            let vendor = req.params.vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            let keys = server.keys.getKeyData(server.config.path)
            let checkParms = checkCrmsParams(keyId, resourceType, keys, vendor)
            
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

        
        server.put("/api/cloud/data/:resource", async (req, res) => {
            let keyId = req.body.key_id
            let params = req.body.parms
            let vendor = req.params.vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            let keys = server.keys.getKeyData(server.config.path)
            let checkParms = checkCrmsParams(keyId, resourceType, keys, vendor)
            
            if (checkParms) {
                
                res.send(checkParms)
                return 
            }

            let crmsFunction = crms[vendor]['session'][resourceType][resource]['default']['put']

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

        server.delete("/api/cloud/data/:resource", async (req, res) => {
            let keyId = req.body.key_id
            let params = req.body.params
            let vendor = req.params.vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            let keys = server.keys.getKeyData(server.config.path)
            let checkParms = checkCrmsParams(keyId, resourceType, keys, vendor)
            
            if (checkParms) {
                res.send(checkParms)
                return 
            }

            let crmsFunction = crms[vendor]['session'][resourceType][resource]['default']['delete']

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

    // /api/cloud/data/etc/:vendor/:resource/:func
    // execute cloud resource etc functions
    {
        server.post("/api/cloud/data/etc/:vendor/:resource/:func", async (req, res) => {
            let keyId = req.body.key_id
            let vendor = req.params.vendor
            let func = req.params.func
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            let keys = server.keys.getKeyData(server.config.path)
            let checkParms = checkCrmsParams(keyId, resourceType, keys, vendor)
            let args = req.body.args

            if (checkParms) {
                res.send(checkParms)
                return 
            }

            let crmsFunction = crms[vendor]['session'][resourceType][resource]['etc'][func]

            if (crmsFunction == undefined) {
                res.send({
                    result: false,
                    msg: "not support functions"
                })
                return
            }
            
            let result = await crmsFunction(keys[keyId].keys, args)

            res.send({
                result: result
            })
        })
    }
}