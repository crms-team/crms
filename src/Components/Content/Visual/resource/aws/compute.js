import { CloudResourceDataFormat } from "../format";

class EC2 extends CloudResourceDataFormat { 
    constructor (data) {
        super()
        data = data.Instances[0]

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
        
        // add links security group
        for (let sg of data.SecurityGroups){
            this.links.push(sg.GroupId)
        }
    }
}

class EBS extends CloudResourceDataFormat { 
  constructor (data) {
      super()

      this.type = 'ebs'
      this.id = data.VolumeId
      let name = this.getTagName(data.Tags)

      this.name = name == undefined ? data.VolumeId : name        

      this.data = {}

      for (let key in data) {
        this.data[key] = data[key]
      }
      
      // add links EC2
      for (let ec2 of data.Attachments){
          this.links.push(ec2.InstanceId)
      }
  }
}


export default {
  ec2: EC2,
  ebs: EBS
}
