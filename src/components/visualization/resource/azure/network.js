import { CloudResourceDataFormat } from "../format";

class SecurityGroup extends CloudResourceDataFormat{
    constructor (keyId, data) {
        super(keyId)

        let type = 'securitygroup'
        this.type = type
        this.id = this.makeId(type, data.id)
        this.name = data.name

        let properties = data.properties

        this.data = {
            provisioningState:properties.provisioningState,
            resourceGuid:properties.resourceGuid,
            securityRules:properties.securityRules,
            defaultSecurityRules:properties.defaultSecurityRules,
            networkInterfaces:properties.networkInterfaces
        }       
        
        this.link.push(this.makeId("networkinterface",properties.networkInterfaces))
    }
}

class Subnet extends CloudResourceDataFormat{
    constructor (keyId, data) {
        super(keyId)

        let type = 'subnet'
        this.type = type
        this.id = this.makeId(type, data.id)
        this.name = data.name  

        let properties = data.properties

        this.data = {
            provisioningState: properties.provisioningState,
            addressPrefix:properties.addressPrefix,
            ipConfigurations : properties.ipConfigurations,
            delegations:properties.delegations,
            privateEndpointNetworkPolicies: properties.privateEndpointNetworkPolicies,
            privateLinkServiceNetworkPolicies: properties.privateLinkServiceNetworkPolicies,
            subnetID: properties.subnetID,
            virtualNetworkId: properties.virtualNetworkId
        }       

        this.link.push(this.makeId("vpc",properties.virtualNetworkId))
    }

} 

class VPC extends CloudResourceDataFormat{
    constructor (keyId, data) {
        super(keyId)
        
        let type = 'vpc'
        this.type = type
        this.id = this.makeId(type, data.id)
        this.name = data.name     

        let properties = data.properties

        this.data = {
            provisioningState : properties.provisioningState,
            resourceGuid: properties.resourceGuid,
            addressSpace: properties.addressSpace,
            subnets: properties.subnets,
            virtualNetworkPeerings: properties.virtualNetworkPeerings,
            enableDdosProtection: properties.enableDdosProtection,
            enableVmProtection: properties.enableVmProtection,
        }       

        // add link Cloud (root)
        this.link.push(this.keyId)
    }

}

class NetworkInterface extends CloudResourceDataFormat{
    constructor (keyId, data) {
        super(keyId)
        
        let type = 'networkinterface'
        this.type = type
        this.id = this.makeId(type, data.id)
        this.name = data.name       

        let properties = data.properties

        this.data = {
            provisioningState:properties.provisioningState, // 원래 배열이니까 바꿔야함
            resourceGuid:properties.resourceGuid,
            ipConfigurations:properties.ipConfigurations,
            dnsSettings:properties.dnsSettings,
            macAddress:properties.macAddress,
            enableAcceleratedNetworking:properties.enableAcceleratedNetworking,
            enableIPForwarding:properties.enableIPForwarding,
            networkSecurityGroup:properties.networkSecurityGroup,
            primary:properties.primary,
            virtualMachine:properties.virtualMachine,
            hostedWorkloads:properties.hostedWorkloads,
            tapConfigurations:properties.tapConfigurations,
            nicType:properties.nicType,
        }       
        
        this.link.push(this.makeId("subnet",properties.ipConfigurations[0].properties.subnet.id))
    }

}



export default {
    subnet: Subnet,
    securitygroup: SecurityGroup,
    vpc: VPC,
    networkinterface: NetworkInterface

  }