
module.exports = {
    session: {
        compute: require('./compute'),
        network: require('./network'),
        // database: require('./database'),
        // storage: require('./storage')
    }, 
    data: require('./data'),
    getResourceId: {
        server: resource => resource['id'],
        volume: resource => resource['id'],
        ip: resource => resource['id'],
        keypair: resource => resource['id'],
    
        database: resource => resource['id'],

        bucket: resource => resource['id'],

        subnet: resource => resource['id'],
        securitygroup: resource => resource['id'],
        internetgateway: resource => resource['id'],
        vpc: resource => resource['id'],
    } 
}
