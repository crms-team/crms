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
            let result = true

            if (checkParms) {
                res.send(checkParms)
                return 
            }

            if (apiType){
                result = await crms.data.saveData(server.config.path, keyId, vendor, keys[keyId].keys)
            }            
            
            if (result) {            
                let dataFile = crms.data.getLastDataFileName(server.config.path, keyId)
                if (dataFile) {
                    res.send({
                        result: true,
                        vendor: vendor,
                        time: dataFile.split('.json')[0],
                        data: JSON.parse(fs.readFileSync(PATH.normalize(`${server.config.path}/data/${keyId}/log/${dataFile}`)))
                    })    
                } else {
                    res.send({
                        result: false,
                        msg: 'No Data File'
                    })
                }
            } else {
                res.send({
                    result: false,
                    msg: 'Key Error'
                })
            }

        })
    }
    
    // /api/cloud/data/:resource
    // get cloud resource data
    {
        server.get("/api/cloud/data/:resource", async (req, res) => {
            let data = null
            let keyId = req.query.key_id
            let apiType = req.query.type
            let resource = req.params.resource
            let resourceId = req.query.resource_id
            let keys = server.keys.getKeyData(server.config.path)
            let check = checkKeyParms(keyId, keys)

            if (check) {
                res.send(check)
                return
            }

            let vendor = keys[keyId].vendor
            let resourceType = getType(vendor, resource)

            if (resourceType == undefined) { 
                res.send({
                    result: false,
                    msg: "Not Support this resource"
                })
                return
            }


            if (apiType){
                let crmsFunction = crms[vendor]['session'][resourceType][resource]['default']['get']
                data = await crmsFunction(keys[keyId].keys)
            } else {
                let dataFile = crms.data.getLastDataFileName(server.config.path, keyId)
                if (dataFile) {
                    data = JSON.parse(fs.readFileSync(PATH.normalize(`${server.config.path}/data/${keyId}/log/${dataFile}`)))[resourceType][resource]
                } else {
                    console.log("No such log File or Key Error")
                    data = []
                }
            }

            if (resourceId) {
                let check = true
                for (let element of data) {
                    if (crms[vendor].getResourceId[resource](element) == resourceId) {
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
            let args = req.body.args
            let keys = server.keys.getKeyData(server.config.path)
            let check = checkKeyParms(keyId, keys)

            if (check) {
                res.send(check)
                return
            }

            let vendor = keys[keyId].vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            
            if (resourceType == undefined) { 
                res.send({
                    result: false,
                    msg: "Not Support this resource"
                })
                return
            }

            let crmsFunction = crms[vendor]['session'][resourceType][resource]['default']['post']

            if (crmsFunction) {
                try {
                    res.send({
                        result: true,
                        data: await crmsFunction(keys[keyId].keys, args)
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
            let args = req.body.args
            let keys = server.keys.getKeyData(server.config.path)
            let check = checkKeyParms(keyId, keys)

            if (check) {
                res.send(check)
                return
            }

            let vendor = keys[keyId].vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            
            if (resourceType == undefined) { 
                res.send({
                    result: false,
                    msg: "Not Support this resource"
                })
                return
            }

            let crmsFunction = crms[vendor]['session'][resourceType][resource]['default']['put']

            if (crmsFunction) {
                try {
                    res.send({
                        result: true,
                        data: await crmsFunction(keys[keyId].keys, args)
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
            let args = req.body.args
            let keys = server.keys.getKeyData(server.config.path)
            let check = checkKeyParms(keyId, keys)

            if (check) {
                res.send(check)
                return
            }

            let vendor = keys[keyId].vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            
            if (resourceType == undefined) { 
                res.send({
                    result: false,
                    msg: "Not Support this resource"
                })
                return
            }

            let crmsFunction = crms[vendor]['session'][resourceType][resource]['default']['delete']

            if (crmsFunction) {
                try {
                    res.send({
                        result: true,
                        data: await crmsFunction(keys[keyId].keys, args)
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

    // /api/cloud/data/:resource/etc/:func
    // execute cloud resource etc functions
    {
        server.post("/api/cloud/data/:resource/etc/:func", async (req, res) => {
            let keyId = req.body.key_id
            let func = req.params.func
            let resource = req.params.resource
            let keys = server.keys.getKeyData(server.config.path)

            let check = checkKeyParms(keyId, keys)

            if (check) {
                res.send(check)
                return
            }

            let vendor = keys[keyId].vendor
            let resourceType = getType(vendor, resource)
            let args = req.body.args
            
            if (resourceType == undefined) { 
                res.send({
                    result: false,
                    msg: "Not Support this resource"
                })
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
                result: true,
                data: result
            })
        })
    }
}