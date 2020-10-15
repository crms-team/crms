
module.exports = {
    vpc: require('./vnet'),
    subnet: require('./subnet'),
    securitygroup: require('./nsg'),
    networkinterface: require('./interface')
    //internetgateway: require('./internet-gatway')
}

d = {aws:{
    vpc: {
        subnet_groups: {
            subnet: {
                server: {
                    volume: {},
                },
            },
        },
        security_groups: {
            security_group: {},
        },
        ig: {},
        database_groups: {
            database: {},
        },
    },
    s3_groups: {
        bucket: {},
    }
},
azure:{
    vpc: {
        subnet: {
            networkinterface: {
                server: {
                    volume: {
                        
                    }
                }
            }
        }
    }    
}}