import {
    CloudResourceDataFormat
} from "../format";

class EC2 extends CloudResourceDataFormat {
    constructor(keyId, data) {
        super(keyId)
        data = data.Instances[0]

        let type = 'ec2'
        this.type = type
        this.id = this.makeId(type, data.InstanceId)
        let name = this.getTagName(data.Tags)

        this.name = name === undefined ? data.InstanceId : name

        this.data = {
            InstanceType: data.InstanceType,
            ImageId: data.ImageId,
            InstanceId: data.InstanceId,
            BlockDeviceMappings: data.BlockDeviceMappings,
            KeyName: data.KeyName,
            MaxCount: typeof(data.MaxCount) == "number" ? data.MaxCount : 1,
            MinCount: typeof(data.MinCount) == "number" ? data.MinCount : 1,
            SecurityGroups: data.SecurityGroups,
            SubnetId: data.SubnetId,
            Tags: data.Tags
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

        let type = 'ebs'
        this.type = type
        this.id = this.makeId(type, data.VolumeId)
        let name = this.getTagName(data.Tags)

        this.name = name === undefined ? data.VolumeId : name

        this.data = {}

        for (let key in data) {
            this.data[key] = data[key]
        }

        // add link EC2
        for (let ec2 of data.Attachments) {
            this.link.push(this.makeId('ec2', ec2.InstanceId))
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
    ec2: EC2,
    ebs: EBS
}
