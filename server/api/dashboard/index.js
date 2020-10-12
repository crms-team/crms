const crms = require('../../../crms')
const fs = require('fs')
const PATH = require('path')

function getStatusData(vendor, data){
    let result = {}
    let statusJson = {
        aws: {
            server: resource => {
                let status = [0, 0]
                for (let ec2 of resource.compute.server) {
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
                for (let ec2 of resource.compute.volume) {
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
                for (let ip of resource.compute.ip) {
                    if (ip.AllocationId) {
                        status[0] += 1
                    }
                    status[1] += 1
                }
                return status
            },
            database: resource =>{ 
                let status = [0, 0]
                for (let db of resource.database.database) {
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

            bucket: resource => {
                let status = [resource.storage.bucket.length, resource.storage.bucket.length]
                return status
            
            }
            
        },
        azure: {
            server: resource => {
                let status = [0, 0]
                for (let vm of resource.compute.server) {
                    if (vm.properties.status == "running") {
                        status[0] += 1
                    }
                    status[1] += 1
                }
                return status

            },
            volume: resource => {
                let status = [0, 0]

                for (let disk of resource.compute.volume) {
                    status[0] += 1
                    status[1] += disk.properties.diskState == "Attached"
                }
                
                return status
            },
            ip: resource => {
                let status = [resource.compute.ip.length, resource.compute.ip.length]
                return status
            },
            keypair: resource => {
                let status = [resource.compute.keypair.length, resource.compute.keypair.length]
                return status
            },
            vpc: resource => {
                let status = [resource.network.vpc.length, resource.network.vpc.length]
                return status
            },
            subnet: resource => {
                let status = [resource.network.subnet.length, resource.network.subnet.length]
                return status
            },
            securitygroup: resource => {
                let status = [resource.network.securitygroup.length, resource.network.securitygroup.length]
                return status
            },
        }
    }[vendor]


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
                bucket : [0, 0],
            }
            let keys = []
            
            if (req.query.key_id) {
                let keyId = req.query.key_id
                keys[keyId] = server.keys.getKeyData(server.config.path)[keyId]
            } else {
                keys = server.keys.getKeyData(server.config.path)
            }

            for (let keyId in keys) {
                let vendor = keys[keyId].vendor
                let dataFile = crms.data.getLastDataFileName(server.config.path, keyId)

                if (dataFile == undefined) {
                    continue
                }

                let data = JSON.parse(fs.readFileSync(PATH.normalize(`${server.config.path}/data/${keyId}/log/${dataFile}`)))

                let statusData = getStatusData(vendor, data)

                for (let session in result) {
                    for (let i = 0; i < 2; i++){
                        try {
                            result[session][i] += statusData[session][i]
                        } catch { break }
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