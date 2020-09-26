
module.exports = {
    session: {
        compute: require('./compute'),
        network: require('./network'),
        database: require('./database'),
        storage: require('./storage')
    }, 
    data: require('./data'),
    getResourceId: {
        server: resource => resource['Instances'][0]['InstanceId'],
        volume: resource => resource['VolumeId'],
        ip: resource => resource['AllocationId'],
        keypair: resource => resource['KeyPairId'],
    
        database: resource => resource['DBInstanceIdentifier'],

        bucket: resource => resource['Name'],

        subnet: resource => resource['SubnetId'],
        securitygroup: resource => resource['GroupId'],
        internetgateway: resource => resource['InternetGatewayId'],
        vpc: resource => resource['VpcId'],
    } 
}
