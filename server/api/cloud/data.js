const fs = require('fs')
const crms = require('../../../crms')

function getLastDataFileName(path, keyId){
    let dataDict = `${path}/data/${keyId}`
    let list = fs.readdirSync(dataDict).sort()

    return list[list.length - 1]
}

function getType(vendor, resource){
    let types = Object.keys(crms[vendor])

    for (let type of types){
        let crmsObject = crms[vendor][type]
        for (let res in crmsObject){
            if (res == resource) 
                return type
        }
    }

    return undefined
}

module.exports = server => {
    {
        server.get("/api/cloud/data/:vendor/:resource", async (req, res) => {
            let keyId = req.query.key_id
            let apiType = req.query.type
            let vendor = req.params.vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)
            let keys = server.keys.getKeyData(server.config.path)

            if (!keyId){
                res.send({
                    result: false,
                    msg: "Required key ID"
                })
                return
            }

            if (resourceType == undefined){
                res.send({
                    result: false,
                    msg: "Not Support this resource"
                })
                return
            }

            if (!(keyId in keys)) {
                res.send({
                    result: false,
                    msg: "This Key ID is not registered."
                })
                return
            }

            if (vendor != keys[keyId].vendor){
                res.send({
                    result: false1
                })
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
                let crmsFunction = crms[vendor][resourceType][resource]['default']['get']
                console.log(keys[keyId].keys)
                res.send({
                    result: true,
                    data: await crmsFunction(keys[keyId].keys)
                })
            }

        })

        server.post("/api/cloud/data/:resource", (req, res) => {

        })
    }

    {
        server.get("/api/cloud/data/list/:resource", (req, res) => {

        })
    }
}