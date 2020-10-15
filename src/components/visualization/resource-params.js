
const CIRCLE_SIZE_L1 = 50
const CIRCLE_SIZE_L2 = 65
const CIRCLE_SIZE_L3 = 80
const CIRCLE_SIZE_L4 = 95
const CIRCLE_SIZE_L5 = 120
const CIRCLE_SIZE_L6 = 135
const CIRCLE_SIZE_L7 = 150



export const VisualStructure = {
    aws:{
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
    }

};

export const IMAGE_TYPE={
    volume:{
        image:"/images/ebs.svg", circle_size: CIRCLE_SIZE_L1
    },
    server:{
        image:"/images/compute.svg", circle_size:CIRCLE_SIZE_L2
    },
    database:{
        image:"/images/rds group.svg", circle_size:CIRCLE_SIZE_L2
    },
    bucket:{
        image:"/images/storage.svg", circle_size:CIRCLE_SIZE_L2
    },
    subnet:{
        image:"/images/ec2-container-registry.svg", circle_size: CIRCLE_SIZE_L3
    },
    internetgateway: {
        image:"/images/internet-gateway.svg", circle_size: CIRCLE_SIZE_L3
    },
    securitygroup:{
        image:"/images/security_group.svg", circle_size: CIRCLE_SIZE_L3
    },
    s3_group:{
        image:"/images/s3 group.svg", circle_size: CIRCLE_SIZE_L3
    },
    database_groups:{
        image:"/images/rds group.svg", circle_size: CIRCLE_SIZE_L3
    },
    securitygroups:{
        image:"/images/securityGroup group.svg", circle_size: CIRCLE_SIZE_L4
    },
    subnets:{
        image:"/images/subnet group.svg", circle_size: CIRCLE_SIZE_L4
    },
    vpc:{
        image:"/images/VPC.svg", circle_size: CIRCLE_SIZE_L5
    },
    aws: {
        image:"/images/cloud.svg", circle_size: CIRCLE_SIZE_L6
    },
    nouse: {
        image:"/images/cloud.svg", circle_size: CIRCLE_SIZE_L3
    },
    networkinterface:{
        image:"/images/ec2-container-registry.svg", circle_size: CIRCLE_SIZE_L4
    },
    CRMS: {
        image:"/images/CRMS.svg", circle_size: CIRCLE_SIZE_L7
    },
    servergroups:{
        image:"/images/subnet group.svg", circle_size: CIRCLE_SIZE_L4
    },volumegroups:{
        image:"/images/subnet group.svg", circle_size: CIRCLE_SIZE_L4
    },vpcgroups:{
        image:"/images/subnet group.svg", circle_size: CIRCLE_SIZE_L4
    },subnetgroups:{
        image:"/images/subnet group.svg", circle_size: CIRCLE_SIZE_L4
    },interenetgroups:{
        image:"/images/subnet group.svg", circle_size: CIRCLE_SIZE_L4
    },securitygroups:{
        image:"/images/subnet group.svg", circle_size: CIRCLE_SIZE_L4
    },storagegroups:{
        image:"/images/subnet group.svg", circle_size: CIRCLE_SIZE_L4
    },databasegroups:{
        image:"/images/subnet group.svg", circle_size: CIRCLE_SIZE_L4
    }

}

export const resourceState={
    server: resource => {
        let status = resource['State']
        let scase = {
            stopped: 1,
            running: 0,
            terimanted: 4,
            'shutting-down': 2,
            stopping: 3,
            pending:5
        }
        return scase[status]
    },
    database:resource=>{
        let status = resource['DBInstanceStatus']
        let scase = {
            available: 0,
            creating: 5,
            deleting: 4,
            rebooting: 0,
            starting: 0,
            stopped: 1,
            stopping: 3,
        }
        return scase[status]
    },
    volume:resource=>{
        let status = resource['State']
        let scase = {
            "creating": 11,
            "available": 8,
            "in-use": 6,
            "deleting": 10,
            "deleted": 10,
            "error": 10,
        }
        return scase[status]
    },
    vpc:resource=>{
        let status = resource['State']
        let scase = {
            "available": 0
        }
        return scase[status]
    },
    subnet:resource=>{
        let status = resource['State']
        let scase = {
            "pending": 5,
            "available": 0
        }
        return scase[status]
    },
    networkinterface: resource=>{
        let status = resource['State']
        let scase = {
            "available": 0
        }
        return scase[status]
    }
}