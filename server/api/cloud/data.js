const fs = require('fs')

const crms = require('../../../data/test')

function getLastDataFileName(path, keyId){


}

function getKeyData(){

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

function getFunction(type, vendor, resource){
    let functions = crms[vendor]
}



module.exports = server => {
    {
        server.get("/api/cloud/data/:vendor/:resource", (req, res) => {
            let keyId = req.query.key_id
            let vendor = req.params.vendor
            let resource = req.params.resource
            let resourceType = getType(vendor, resource)


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

            let func = crms[vendor][resourceType][resource]['get']




            res.send(func())
        })

        server.post("/api/cloud/data/:resource", (req, res) => {

        })
    }

    {
        server.get("/api/cloud/data/list/:resource", (req, res) => {

        })
    }
}