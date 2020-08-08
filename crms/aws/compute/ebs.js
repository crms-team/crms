const AWS = require('aws-sdk')

module.exports = {
    describeVolumes: async (key) => {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        return await ec2.describeVolumes().promise()
    }
}