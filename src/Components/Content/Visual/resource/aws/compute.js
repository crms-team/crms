class CloudResourceDataFormat {
    constructor () {
        this.id = undefined;
        this.name = undefined;
        this.type = undefined;
        this.links = []
    }

    getTagName(tagData) {
        for (let tag of tagData) {
            if (tag.Key == "Name")
                return tag.Value
        }
        return undefined
    }
}

class EC2 extends CloudResourceDataFormat { 
    constructor (data) {
        super()

        this.type = 'ec2'
        this.id = data.InstanceId
        let name = this.getTagName(data.Tags)

        this.name = name == undefined ? data.InstanceId : name        

        this.data = {
            InstanceType: data.InstanceType,
            ImageId:data.ImageId,
            InstanceId:data.InstanceId,
            BlockDeviceMappings:data.BlockDeviceMappings,
            KeyName:data.KeyName,
            MaxCount: typeof(data.MaxCount)=="number" ? data.MaxCount : 1,
            MinCount:typeof(data.MinCount)=="number" ? data.MinCount : 1,
            SecurityGroups:data.SecurityGroups,
            SubnetId:data.SubnetId,
            Tags:data.Tags
        }
        
        // add links subnet
        this.links.push(data.SubnetId)
        
        for (let sg of data.SecurityGroups){
            this.links.push(sg.GroupId)
        }
    }
}

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

        this.name = name == undefined ? data.InstanceId : name        

        this.data = {
            AvailabilityZone:this.AvailabilityZone,
            AvailabilityZoneId:data.AvailabilityZoneId,
            CidrBlock : data.CidrBlock,
            State:data.State,
            Ipv6CidrBlockAssociationSet:data.Ipv6CidrBlockAssociationSet,
            SubnetArn:data.SubnetArn
        }       
        // add links subnet
        this.links.push(data.VpcId)

    }
}

class EBS extends CloudResourceDataFormat{
  constructor (data) {
      super()

      this.type = 'ebs'
      ebs_data=[];
      var i=0;

      for(let tmp of data.Volumes){
        let name = this.getTagName(tmp.Tags)

        ebs_data[i].name = name == undefined ? "" : name
        ebs_data[i].Attachments=data.Attachments;
        ebs_data[i].AvailabilityZone=data.AvailabilityZone;
        ebs_data[i].Encrypted=data.Encrypted;
        ebs_data[i].Size=data.Size;
        ebs_data[i].SnapshotId=data.SnapshotId;
        ebs_data[i].State=data.State;
        ebs_data[i].VolumeId=data.VolumeId;
        ebs_data[i].Iops=data.Iops;
        ebs_data[i].VolumeType=data.VolumeType;
        ebs_data[i].MultiAttachEnabled=data.MultiAttachEnabled;
        i++;
      }      

      this.data = {
          Volumes:ebs_data
      }       
      // add links subnet
      this.links.push("CLOUD")

  }
}

class VPC extends CloudResourceDataFormat{
    constructor (data) {
        super()

        this.type = 'vpc'
        this.id = data.VpcId
        let name = this.getTagName(data.Tags)

        this.name = name == undefined ? data.InstanceId : name        

        this.data = {
            CidrBlock : this.CidrBlock,
            DhcpOptionsId: this.DhcpOptionsId,
            State:this.State,
            InstanceTenancy:this.InstanceTenancy,
            Ipv6CidrBlockAssociationSet:this.Ipv6CidrBlockAssociationSet,
            CidrBlockAssociationSet:CidrBlockAssociationSet,
            IsDefault:this.IsDefault
        }       
        // add links subnet
        this.links.push("CLOUD")

    }
}

class RDS extends CloudResourceDataFormat{
    
}

let tdata = {
    "AmiLaunchIndex": 0,
    "ImageId": "ami-0a25005e83c56767a",
    "InstanceId": "i-0acd99ba8df692892",
    "InstanceType": "t2.micro",
    "KeyName": "NevationKey",
    "LaunchTime": "2020-08-10T13:29:55.000Z",
    "Monitoring": {
      "State": "disabled"
    },
    "Placement": {
      "AvailabilityZone": "ap-northeast-2c",
      "GroupName": "",
      "Tenancy": "default"
    },
    "PrivateDnsName": "ip-172-31-47-215.ap-northeast-2.compute.internal",
    "PrivateIpAddress": "172.31.47.215",
    "ProductCodes": [],
    "PublicDnsName": "",
    "State": {
      "Code": 80,
      "Name": "stopped"
    },
    "StateTransitionReason": "User initiated (2020-08-10 13:33:04 GMT)",
    "SubnetId": "subnet-6ed08922",
    "VpcId": "vpc-2bef1440",
    "Architecture": "x86_64",
    "BlockDeviceMappings": [
      {
        "DeviceName": "/dev/sda1",
        "Ebs": {
          "AttachTime": "2019-07-24T10:43:57.000Z",
          "DeleteOnTermination": true,
          "Status": "attached",
          "VolumeId": "vol-0e537238313263ee4"
        }
      }
    ],
    "ClientToken": "",
    "EbsOptimized": false,
    "EnaSupport": true,
    "Hypervisor": "xen",
    "ElasticGpuAssociations": [],
    "ElasticInferenceAcceleratorAssociations": [],
    "NetworkInterfaces": [
      {
        "Attachment": {
          "AttachTime": "2019-07-24T10:43:56.000Z",
          "AttachmentId": "eni-attach-0840108df9f6d8b15",
          "DeleteOnTermination": true,
          "DeviceIndex": 0,
          "Status": "attached"
        },
        "Description": "",
        "Groups": [
          {
            "GroupName": "launch-wizard-1",
            "GroupId": "sg-00174d37f556e051b"
          }
        ],
        "Ipv6Addresses": [],
        "MacAddress": "0a:cc:b6:92:a8:62",
        "NetworkInterfaceId": "eni-0239f8a62c60c7ca8",
        "OwnerId": "236966029519",
        "PrivateDnsName": "ip-172-31-47-215.ap-northeast-2.compute.internal",
        "PrivateIpAddress": "172.31.47.215",
        "PrivateIpAddresses": [
          {
            "Primary": true,
            "PrivateDnsName": "ip-172-31-47-215.ap-northeast-2.compute.internal",
            "PrivateIpAddress": "172.31.47.215"
          }
        ],
        "SourceDestCheck": true,
        "Status": "in-use",
        "SubnetId": "subnet-6ed08922",
        "VpcId": "vpc-2bef1440",
        "InterfaceType": "interface"
      }
    ],
    "RootDeviceName": "/dev/sda1",
    "RootDeviceType": "ebs",
    "SecurityGroups": [
      {
        "GroupName": "launch-wizard-1",
        "GroupId": "sg-00174d37f556e051b"
      }
    ],
    "SourceDestCheck": true,
    "StateReason": {
      "Code": "Client.UserInitiatedShutdown",
      "Message": "Client.UserInitiatedShutdown: User initiated shutdown"
    },
    "Tags": [
      {
        "Key": "Name",
        "Value": "NevationServer"
      }
    ],
    "VirtualizationType": "hvm",
    "CpuOptions": {
      "CoreCount": 1,
      "ThreadsPerCore": 1
    },
    "CapacityReservationSpecification": {
      "CapacityReservationPreference": "open"
    },
    "HibernationOptions": {
      "Configured": false
    },
    "Licenses": [],
    "MetadataOptions": {
      "State": "applied",
      "HttpTokens": "optional",
      "HttpPutResponseHopLimit": 1,
      "HttpEndpoint": "enabled"
    }
  }

let test = new EC2(tdata)

console.log(test)


