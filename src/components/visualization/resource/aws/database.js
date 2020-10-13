import {
    CloudResourceDataFormat
} from "../format"

class RDS extends CloudResourceDataFormat{
    constructor(keyId, data) {
        super(keyId)

        let type = 'database'
        this.type = type
        this.id = this.makeId(type, data.DBInstanceIdentifier)
        let name = data.DBInstanceIdentifier

        this.name = name

        this.data = {
            DBInstanceIdentifier:data.DBInstanceIdentifier,
            DBInstanceClass:data.DBInstanceClass,
            Engine:data.Engine,
            DBInstanceStatus:data.DBInstanceStatus,
            AllocatedStorage: data.AllocatedStorage,
            AvailabilityZone:data.AvailabilityZone,
            DeletionProtection:data.DeletionProtection,
            LatestRestorableTime:data.LatestRestorableTime,
            MultiAZ:data.MultiAZ,
            PubliclyAccessible:data.PubliclyAccessible,
            StorageType:data.StorageType,
            DbInstancePort:data.DbInstancePort,
            StorageEncrypted:data.StorageEncrypted
        }
        
        for (let sg of data.VpcSecurityGroups) {
            this.link.push(this.makeId('securitygroup', sg.VpcSecurityGroupId))
        }

        for (let subnet of data.DBSubnetGroup.Subnets) {
            this.link.push(this.makeId('subnet', subnet.SubnetIdentifier))
        }

        let rdsGroupId = this.makeId('database_groups', data.DBSubnetGroup.VpcId)
        
        this.link.push(rdsGroupId)

        let parent = new CloudResourceDataFormat()
        parent.name = "RDS Groups"
        parent.type = "database_groups"
        parent.id = rdsGroupId
        parent.link.push(this.makeId('vpc', data.DBSubnetGroup.VpcId))
        this.parent = parent

    }
}

export default {
    database: RDS
}