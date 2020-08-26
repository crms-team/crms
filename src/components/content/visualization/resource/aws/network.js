import { CloudResourceDataFormat } from "../format";

class SecurityGroup extends CloudResourceDataFormat{
    constructor (keyId, data) {
        super(keyId)

        let type = 'securitygroup'
        this.type = type
        this.id = this.makeId(type, data.GroupId)
        this.name = data.GroupName

        this.data = {
            IpPermissions:data.IpPermissions,
            IpPermissionsEngress:data.IpPermissionsEngress,
            VpcId:data.VpcId
        }       

        let securityGroupsId = this.makeId('securitygroups', data.VpcId)
        this.link.push(securityGroupsId)
        
        let parent = new CloudResourceDataFormat()
        parent.name = "SecurityGroups"
        parent.type = "securitygroups"
        parent.id = securityGroupsId
        parent.link.push(this.makeId('vpc', data.VpcId))
        this.parent = parent
    }
}

class Subnet extends CloudResourceDataFormat{
    constructor (keyId, data) {
        super(keyId)

        let type = 'subnet'
        this.type = type
        this.id = this.makeId(type, data.SubnetId)
        let name = this.getTagName(data.Tags)

        this.name = name === undefined ? data.SubnetId : name        

        this.data = {
            AvailabilityZone: data.AvailabilityZone,
            AvailableIpAddressCount:data.AvailableIpAddressCount,
            CidrBlock : data.CidrBlock,
            MapPublicIpOnLaunch:data.MapPublicIpOnLaunch,
            State: data.State,
            Ipv6CidrBlockAssociationSet: data.Ipv6CidrBlockAssociationSet,
            SubnetId:data.SubnetId,
            VpcId:data.VpcId,
            Tags:data.Tags,
            SubnetArn: data.SubnetArn
        }       

        let subnetsId = this.makeId('subnets', data.VpcId)
        this.link.push(subnetsId)
        
        let parent = new CloudResourceDataFormat()
        parent.name = "Subnets"
        parent.type = "subnets"
        parent.id = subnetsId
        parent.link.push(this.makeId('vpc', data.VpcId))
        this.parent = parent
    }

    getTagName(tagData) {
        for (let tag of tagData) {
            if (tag.Key === "Name")
                return tag.Value
        }
        return undefined
    }
} 

class VPC extends CloudResourceDataFormat{
    constructor (keyId, data) {
        super(keyId)
        
        let type = 'vpc'
        this.type = type
        this.id = this.makeId(type, data.VpcId)
        let name = this.getTagName(data.Tags)

        this.name = name === undefined ? data.VpcId : name        

        this.data = {
            CidrBlock : data.CidrBlock,
            DhcpOptionsId: data.DhcpOptionsId,
            State: data.State,
            InstanceTenancy: data.InstanceTenancy,
            Ipv6CidrBlockAssociationSet: data.Ipv6CidrBlockAssociationSet,
            CidrBlockAssociationSet: data.CidrBlockAssociationSet,
            IsDefault: data.IsDefault,
            Tags:data.Tags
        }       

        // add link Cloud (root)
        this.link.push(this.keyId)
    }

    getTagName(tagData) {
        for (let tag of tagData) {
            if (tag.Key === "Name")
                return tag.Value
        }
        return undefined
    }
}

class InternetGateway extends CloudResourceDataFormat{
    constructor (keyId, data) {
        super(keyId)
        
        let type = 'internetgateway'
        this.type = type
        this.id = this.makeId(type, data.InternetGatewayId)
        let name = this.getTagName(data.Tags)

        this.name = name === undefined ? data.InternetGatewayId : name        

        this.data = {
            State:data.Attachments[0].State, // 원래 배열이니까 바꿔야함
            InternetGatewayId:data.InternetGatewayId,
            Tags:data.Tags
        }       
        
        for (let vpc of data.Attachments) {
            this.link.push(this.makeId('vpc', vpc.VpcId))
        }
    }

    getTagName(tagData) {
        for (let tag of tagData) {
            if (tag.Key === "Name")
                return tag.Value
        }
        return undefined
    }
}



export default {
    subnet: Subnet,
    securityGroup: SecurityGroup,
    vpc: VPC,
    internetGateway: InternetGateway

  }