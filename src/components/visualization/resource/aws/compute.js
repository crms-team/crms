import {
    CloudResourceDataFormat
} from "../format";

class EC2 extends CloudResourceDataFormat {
    constructor(keyId, data) {
        super(keyId)
        data = data.Instances[0]

        let type = 'server'
        this.type = type
        this.id = this.makeId(type, data.InstanceId)
        let name = this.getTagName(data.Tags)

        this.name = name === undefined ? data.InstanceId : name


        this.data = {
            State: data.State.Name,
            ImageId:data.ImageId,
            InstanceId:data.InstanceId,
            InstanceType:data.InstanceType,
            KeyName:data.KeyName,
            LaunchTime:data.LaunchTime,
            AvailabilityZone:data.Placement.AvailabilityZone,
            PrivateIpAddress:data.PrivateIpAddress,
            PublicIpAddress:data.PublicIpAddress,
            SubnetId:data.SubnetId,
            VpcId:data.VpcId,
            Tags:data.Tags
        }

        
        // add link subnet
        this.link.push(this.makeId('subnet', data.SubnetId))

        // add link security group
        for (let sg of data.SecurityGroups) {
            this.link.push(this.makeId('securitygroup', sg.GroupId))
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

class EBS extends CloudResourceDataFormat {
    constructor(keyId, data) {
        super(keyId)

        let type = 'volume'
        this.type = type
        this.id = this.makeId(type, data.VolumeId)
        let name = this.getTagName(data.Tags)

        this.name = name === undefined ? data.VolumeId : name

        this.data = {
            AvailabilityZone:data.AvailabilityZone,
            Encrypted : data.Encrypted,
            Size:data.Size,
            SnapshotId:data.SnapshotId,
            State:data.State,
            VolumeId:data.VolumeId,
            Iops:data.Iops,
            VolumeType:data.VolumeType,
            MultiAttachEnabled:data.MultiAttachEnabled
        }


        // add link EC2
        for (let ec2 of data.Attachments) {
            this.link.push(this.makeId('server', ec2.InstanceId))
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

class EIP extends CloudResourceDataFormat {
    constructor(keyId, data) {
        super(keyId)
        data = data.Instances[0]

        let type = 'ip'
        this.type = type
        this.id = this.makeId(type, data.InstanceId)
        let name = this.getTagName(data.Tags)

        this.name = name === undefined ? data.InstanceId : name


        this.data = {}

        for (let key in data) {
            this.data[key] = data[key]
        }
        
        // add link subnet
        this.link.push(this.makeId('subnet', data.SubnetId))

        // add link security group
        for (let sg of data.SecurityGroups) {
            this.link.push(this.makeId('securitygroup', sg.GroupId))
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
    server: EC2,
    volume: EBS
}
