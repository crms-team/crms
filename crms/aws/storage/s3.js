const AWS = require('aws-sdk')

async function listBuckets(key, args=undefined) {
    AWS.config.update(key)
    let s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    return (await s3.listBuckets().promise())['Buckets']
}

module.exports = {
    default: {
        get: listBuckets
    },
    etc: {}
}