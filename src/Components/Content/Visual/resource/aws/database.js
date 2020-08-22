import {
    CloudResourceDataFormat
} from "../format"

class RDS extends CloudResourceDataFormat{
    constructor(keyId, data) {
        super(keyId)

        let type = 'rds'
        this.type = type
        this.id = this.makeId(type, data.DBInstanceIdentifier)
        let name = data.DBInstanceIdentifier

        this.name = name

        this.data = {
        }

        
        for (let sg of data.VpcSecurityGroups) {
            this.link.push(this.makeId('securitygroup', sg.VpcSecurityGroupId))
        }

        for (let subnet of data.DBSubnetGroup.Subnets) {
            this.link.push(this.makeId('subnet', subnet.SubnetIdentifier))
        }

        let rdsGroupId = this.makeId('rds_group', data.DBSubnetGroup.VpcId)
        
        this.link.push(rdsGroupId)

        let parent = new CloudResourceDataFormat()
        parent.name = "RDS Groups"
        parent.type = "rds_group"
        parent.id = rdsGroupId
        parent.link.push(this.makeId('vpc', data.DBSubnetGroup.VpcId))
        this.parent = parent

    }
}

export default {
    rds: RDS
}