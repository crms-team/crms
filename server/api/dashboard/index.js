const crms = require('../../../crms')
const fs = require('fs')
const PATH = require('path')

function getStatusData(vendor, data){
    let result = {
    }
    let statusJson = undefined

    if (vendor == "aws") {
        statusJson = {
            server: resource => {
                let status = [0, 0]
                for (let ec2 of resource.compute.ec2) {
                    ec2 = ec2.Instances[0]

                    if (ec2.State.Name == "running") {
                        status[0] += 1
                    }
                    status[1] += 1
                }
                return status
            },
            volume: resource => {
                let status = [0, 0]
                for (let ec2 of resource.compute.ebs) {

                    if (ec2.State == "in-use") {
                        status[0] += 1
                    }
                    status[1] += 1
                }
                return status
            },
            keypair: resource => {
                let status = [resource.compute.keypair.length, resource.compute.keypair.length]
                return status
            },
            ip: resource =>{ 
                let status = [0, 0]
                for (let ip of resource.compute.eip) {
                    if (ip.AllocationId) {
                        status[0] += 1
                    }
                    status[1] += 1
                }
                return status
            },
            database: resource =>{ 
                let status = [0, 0]
                for (let db of resource.database.rds) {
                    if (db.DBInstanceStatus == "available") {
                        status[0] += 1
                    }
                    status[1] += 1
                }
                return status
            },
            vpc: resource =>{ 
                let status = [0, 0]
                for (let vpc of resource.network.vpc) {
                    if (vpc.State == "available") {
                        status[0] += 1
                    }
                    status[1] += 1
                }
                return status
            },
            subnet: resource =>{ 
                let status = [0, 0]
                for (let subnet of resource.network.subnet) {
                    if (subnet.State == "available") {
                        status[0] += 1
                    }
                    status[1] += 1
                }
                return status
            },
            securitygroup: resource =>{ 
                let status = [resource.network.securitygroup.length, resource.network.securitygroup.length]
                return status
            },

            storage: resource => {
                let status = [resource.storage.s3.length, resource.storage.s3.length]
                return status
            
            }
            
        }
    }   

    for (let key in statusJson) {
        result[key] = statusJson[key](data)
    }

    return result
}

module.exports = server => {
    {
        server.get("/api/dashboard", (req, res)=>{
            let result = {
                server : [0, 0],
                volume : [0, 0],
                ip : [0, 0],
                keypair : [0, 0],
                database : [0, 0],
                vpc : [0, 0],
                subnet : [0, 0],
                securitygroup: [0, 0],
                storage : [0, 0],
            }
            let keys = server.keys.getKeyData(server.config.path)

            for (let keyId in keys) {
                let vendor = keys[keyId].vendor
                let dataFile = crms.data.getLastDataFileName(server.config.path, keyId)
                let data = JSON.parse(fs.readFileSync(PATH.normalize(`${server.config.path}/data/${keyId}/log/${dataFile}`)))

                let statusData = getStatusData(vendor, data)

                for (let session in result) {
                    for (let i = 0; i < 2; i++){
                        result[session][i] += statusData[session][i]
                    }
                }
            }

            res.send({
                result: true,
                data: result
            })


        })
    }
}