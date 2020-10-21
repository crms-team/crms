import {
    CloudResourceDataFormat
} from "../format";

class Vm extends CloudResourceDataFormat {
    constructor(keyId, data) {
        super(keyId)

        let type = 'server'
        this.type = type
        this.id = this.makeId(type, data.id)
        this.name = data.name 

        let properties = data.properties

        this.data = {
            VmSize: properties.hardwareProfile.vmSize,
            Name: data.name,
            PublicIp: properties.publicIp,
            State: properties.state,
            Os: properties.storageProfile.osDisk.osType
        }
        if(properties.networkProfile.networkInterfaces[0]){
            this.link.push(this.makeId("networkinterface",properties.networkProfile.networkInterfaces[0].id))
        }
    }
}

class Disk extends CloudResourceDataFormat {
    constructor(keyId, data) {
        super(keyId)

        let type = 'volume'
        this.type = type
        this.id = this.makeId(type, data.id)
        this.name = data.name 

        let properties = data.properties

        this.data = {
            VolumeType: data.sku.name,
            EncryptionType : properties.encryption.type,
            Size: properties.diskSizeGB,
            VolumeName: data.name,
            State: properties.diskState,
            CreationTime: properties.timeCreated,
            osType: properties.osType
        }
        
        if(data.managedBy){
            this.link.push(this.makeId("server",data.managedBy))
        }
    }
}



export default {
    server: Vm,
    volume: Disk
}