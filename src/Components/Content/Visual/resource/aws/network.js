import { CloudResourceDataFormat } from "../format";

class SecurityGroup extends CloudResourceDataFormat{
    constructor (data) {
        super()

        this.type = 'securitygroup'
        this.id = data.GroupId
        this.name = data.GroupName
        let tagname = this.getTagName(data.Tags)        

        this.data = {
            IpPermissions:data.IpPermissions,
            IpPermissionsEngress:data.IpPermissionsEngress,
            VpcId:data.VpcId,
            tagname : tagname == undefined ? "" : tagname

        }       
        // add links subnet
        this.links.push(data.VpcId)

    }
}

class Subnet extends CloudResourceDataFormat{
    constructor (data) {
        super()

        this.type = 'subnet'
        this.id = data.SubnetId
        let name = this.getTagName(data.Tags)

        this.name = name == undefined ? data.SubnetId : name        

        this.data = {
            AvailabilityZone: data.AvailabilityZone,
            AvailabilityZoneId: data.AvailabilityZoneId,
            CidrBlock : data.CidrBlock,
            State: data.State,
            Ipv6CidrBlockAssociationSet: data.Ipv6CidrBlockAssociationSet,
            SubnetArn: data.SubnetArn
        }       

        // add links vpc
        this.links.push(data.VpcId)
    }
}

class VPC extends CloudResourceDataFormat{
    constructor (data) {
        super()
        
        this.type = 'vpc'
        this.id = data.VpcId
        let name = this.getTagName(data.Tags)

        this.name = name == undefined ? data.VpcId : name        

        this.data = {
            CidrBlock : data.CidrBlock,
            DhcpOptionsId: data.DhcpOptionsId,
            State: data.State,
            InstanceTenancy: data.InstanceTenancy,
            Ipv6CidrBlockAssociationSet: data.Ipv6CidrBlockAssociationSet,
            CidrBlockAssociationSet: data.CidrBlockAssociationSet,
            IsDefault: data.IsDefault
        }       

        // add links Cloud (root)
        this.links.push("CLOUD")

    }
}


export default {
    subnet: Subnet,
    securityGroup: SecurityGroup,
    vpc: VPC
  }