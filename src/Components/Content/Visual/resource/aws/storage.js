import {
    CloudResourceDataFormat
} from "../format";

class S3 extends CloudResourceDataFormat{
    constructor(keyId, data) {
        super(keyId)

        let type = 's3'
        this.type = type
        this.id = this.makeId(type, data.Name)
        let name = data.Name

        this.name = name 

        this.data = {
        }

        this.link.push(`${this.keyId}:s3_group`)

        let parent = new CloudResourceDataFormat()
        parent.name = "S3 Groups"
        parent.type = "s3_group"
        parent.id = `${this.keyId}:s3_group`
        parent.link.push(this.keyId)
        this.parent = parent
    }
}

export default {
    s3: S3
}