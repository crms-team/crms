export const COLUMES = {
  server: [
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'public_ip', numeric: false, disablePadding: false, label: 'Public IP' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' }
  ],
  volume:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'size', numeric: false, disablePadding: false, label: 'Size' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' }
  ],
  ip:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'public_ip', numeric: false, disablePadding: false, label: 'Public IP' },
    { id: 'private_ip', numeric: false, disablePadding: false, label: 'Private IP' },
    { id: 'sever_id', numeric: false, disablePadding: false, label: 'Server ID' }
  ],
  keypair:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'fingerprint', numeric: false, disablePadding: false, label: 'Fingerprint' }
  ],
  database:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'identifier', numeric: false, disablePadding: true, label: 'Identifier' },
    { id: 'engine_type', numeric: false, disablePadding: false, label: 'Engine type' },
    { id: 'engine_version', numeric: false, disablePadding: false, label: 'Engine version' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'size', numeric: false, disablePadding: false, label: 'Size' },
    { id: 'availability', numeric: false, disablePadding: false, label: 'Availability' },
    { id: 'vpc', numeric: false, disablePadding: false, label: 'VPC' }
  ],
  vpc:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'ipv4_cidr', numeric: false, disablePadding: false, label: 'IPv4 CIDR' },
    { id: 'ipv6_cidr', numeric: false, disablePadding: false, label: 'IPv6 CIDR' }
  ],
  subnet:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'vpc', numeric: false, disablePadding: false, label: 'VPC' },
    { id: 'available_ipv4_cidr', numeric: false, disablePadding: false, label: 'Available IPv4 CIDR' },
    { id: 'ipv4_cidr', numeric: false, disablePadding: false, label: 'IPv4 CIDR' },
    { id: 'availability_zone', numeric: false, disablePadding: false, label: 'Availability Zone' }
  ],
  securitygroup:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'vpc_id', numeric: false, disablePadding: false, label: 'VPC ID' },
    { id: 'descryption', numeric: false, disablePadding: false, label: 'Descryption' },
    { id: 'group_name', numeric: false, disablePadding: false, label: 'Group Name' }
  ],
  bucket:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'encryption', numeric: false, disablePadding: false, label: 'Encrpytion' },
    { id: 'region', numeric: false, disablePadding: false, label: 'Region' },
    { id: 'create_data', numeric: false, disablePadding: false, label: 'Create Data' }
  ]
}

export const MATCHINGS = {
  aws: {
    server: (key_id, resource) => {
      let attr = resource
      let name = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.InstanceId,
        public_ip: attr.PublicIpAddress,
        status: attr.State.Name,
        type: attr.InstanceType,
      }
    },
    volume: (key_id, resource) => {
      let attr = resource
      let name = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.VolumeId,
        state: attr.State,
        size: attr.Size,
        type: attr.VolumeType,
      }
    },
    ip: (key_id, resource) => {
      let attr = resource
      let name = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.AllocationId,
        public_ip: attr.PublicIp,
        private_ip: attr.PrivateIpAddress,
        sever_id: attr.InstanceId,
      }
    },
    keypair: (key_id, resource) => {
      let attr = resource
      let name = ""
      
      return {
        key_id: key_id,
        name: attr.KeyName,
        id: attr.KeyPairId,
        fingerprint: attr.KeyFingerprint,
      }
    },
    database: (key_id, resource) => {
      let attr = resource

      return {
        key_id: key_id,
        identifier: attr.DBInstanceIdentifier,
        engine_type: attr.Engine,
        engine_version: attr.EngineVersion,
        state:attr.DBInstanceStatus,
        size: attr.AllocatedStorage,
        availability: attr.AvailabilityZone,
        vpc: attr.DBSubnetGroup.VpcId
      }
    },
    vpc: (key_id, resource) => {
      let attr = resource
      let name = ""
      let ipv6 = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }

      for (let ipv6 of attr.Ipv6CidrBlockAssociationSet) {
        if (ipv6.Key == "CidrBlock")  {
          ipv6 = ipv6.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.VpcId,
        state: attr.State,
        ipv4_cidr: attr.CidrBlock,
        ipv6_cidr: ipv6
      }
    },
    subnet: (key_id, resource) => {
      let attr = resource
      let name = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.SubnetId,
        vpc: attr.VpcId,
        state: attr.State,
        available_ipv4_cidr: attr.CidrBlock,
        ipv4_cidr: attr.CidrBlock,
        availability_zone: attr.AvailabilityZone
      }
    },
    securitygroup: (key_id, resource) => {
      let attr = resource
      let name = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.GroupId,
        vpc_id: attr.VpcId,
        descryption: attr.Description,
        group_name: attr.GroupName,
      }
    },
    bucket: (key_id, resource) => {
      let attr = resource
      
      return {
        key_id: key_id,
        name: attr.Name,
        encryption: attr.Encryption == null ? "null" : attr.Encryption,
        region: attr.LocationConstraint,
        create_data: attr.CreationDate,
      }
    }
  },
  azure: {
      server: (key_id, resource) => {
          let attr = resource.properties
          return {
              key_id: key_id,
              name: resource.name,
              id: resource.id,
              public_ip: attr.publicIp,
              status: attr.status,
              type: attr.hardwareProfile.vmSize
          }
      },
      volume: (key_id, resource) => {
          let attr = resource.properties
          return {
              key_id: key_id,
              name: resource.name,
              id: resource.id,
              state: attr.diskState,
              size: attr.diskSizeGB,
              type: attr.hyperVGeneration
          }
      },
      ip: (key_id, resource) => {
          let attr = resource.properties
          return {
            key_id: key_id,
            name: resource.name,
            id: resource.id,
            public_ip: attr.ipAddress ? attr.ipAddress: '',
            private_ip: '',
            sever_id: '',
          }
      },
      keypair: (key_id, resource) => {
          let attr = resource.properties
          return {
            key_id: key_id,
            name: resource.name,
            id: resource.id,
            fingerprint: attr.publicKey.split('\r\n')[0],
          }
      },
      database: (key_id, resource) => {
        let attr = resource.properties
  
        return {
          key_id: key_id,
          identifier: resource.id,
          engine_type: attr.Engine,
          engine_version: attr.EngineVersion,
          state:attr.DBInstanceStatus,
          size: attr.AllocatedStorage,
          availability: attr.AvailabilityZone,
          vpc: attr.DBSubnetGroup.VpcId
        }
      },
      vpc: (key_id, resource) => {
        let attr = resource.properties
        let name = ""
        let ipv6 = ""
        let ipv4 = ""
        
        return {
          key_id: key_id,
          name: resource.name,
          id: resource.id,
          state: attr.provisioningState,
          ipv4_cidr: attr.addressSpace.addressPrefixes[0],
          ipv6_cidr: ipv6
        }
      },
      subnet: (key_id, resource) => {
        let attr = resource.properties
        let name = ""
        let tmp = ""
        
        return {
          key_id: key_id,
          name: resource.name,
          id: resource.id,
          vpc: attr.virtualNetworkId,
          state: attr.provisioningState,
          available_ipv4_cidr: attr.addressPrefix,
          ipv4_cidr: attr.addressPrefix,
          availability_zone: tmp
        }
      },
      securitygroup: (key_id, resource) => {
        let attr = resource.properties
        let name = ""
        
        return {
          key_id: key_id,
          name: resource.name,
          id: resource.id,
          vpc_id: attr.networkInterfaces[0].id,
          descryption: resource.name,
          group_name: attr.GroupName,
        }
      },
      bucket: (key_id, resource) => {
      let attr = resource
      
      return {
        key_id: key_id,
        name: attr.Name,
        encryption: attr.Encryption == null ? "null" : attr.Encryption,
        region: attr.LocationConstraint,
        create_data: attr.CreationDate,
      }
    }
  }
}
