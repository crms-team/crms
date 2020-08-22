const AWS = require('aws-sdk')

async function describeDBInstances(key, args=undefined) {
    AWS.config.update(key)
    let rds = new AWS.RDS({ apiVersion: '2014-10-31' })
    return (await rds.describeDBInstances().promise())['DBInstances']
}

module.exports = {
    default: {
        get: describeDBInstances
    },
    etc: {}
}

