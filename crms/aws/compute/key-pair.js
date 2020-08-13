const AWS = require('aws-sdk')

module.exports = {
    describeKeyPair: async (key) => {
        AWS.config.update(key)
        let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
        return await ec2.describeKeyPairs().promise()
    },

    deleteKeyPair: async (key, id) => {
        try {
            AWS.config.update(key)
            let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
            await ec2.deleteKeyPair({KeyPairId: id}).promise()
            return true
        } catch {
            return false
        }
    }
}

