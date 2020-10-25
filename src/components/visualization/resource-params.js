
const CIRCLE_SIZE_L1 = 50
const CIRCLE_SIZE_L2 = 65
const CIRCLE_SIZE_L3 = 80
const CIRCLE_SIZE_L4 = 95
const CIRCLE_SIZE_L5 = 120
const CIRCLE_SIZE_L6 = 135
const CIRCLE_SIZE_L7 = 150



export const VisualStructure = {
    aws: {
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
    azure: {
        vpc: {
            subnet: {
                networkinterface: {
                    server: {
                        volume: {}
                    },
                    security_group: {}
                }
            }
        }
    }

};

export const IMAGE_TYPE = {
    CRMS: "/images/CRMS.svg",
    aws: {
        volume: "/images/ebs.svg",
        server: "/images/compute.svg",
        database: "/images/rds group.svg",
        bucket: "/images/storage.svg",
        subnet: "/images/ec2-container-registry.svg",
        internetgateway: "/images/internet-gateway.svg",
        securitygroup: "/images/security_group.svg",
        s3_group: "/images/s3 group.svg",
        database_groups: "/images/rds group.svg",
        securitygroups: "/images/securityGroup group.svg",
        subnets: "/images/subnet group.svg",
        vpc: "/images/VPC.svg",
        aws: "/images/cloud.svg",
        nouse: "/images/cloud.svg",
        networkinterface: "/images/ec2-container-registry.svg",
        servergroups: "/images/subnet group.svg",
        volumegroups: "/images/subnet group.svg",
        vpcgroups: "/images/subnet group.svg",
        subnetgroups: "/images/subnet group.svg",
        interenetgroups: "/images/subnet group.svg",
        securitygroups: "/images/subnet group.svg",
        storagegroups: "/images/subnet group.svg",
        databasegroups: "/images/subnet group.svg",
    },
    azure: {
        azure: "/images/cloud.svg",
        volume: "/images/disks.png",
        server: "/images/compute.png",
        database: "/images/rds group.svg",
        bucket: "/images/storage.svg",
        subnet: "/images/subnet.png",
        internetgateway: "/images/internet-gateway.svg",
        securitygroup: "/images/nsg.png",
        s3_group: "/images/s3 group.svg",
        database_groups: "/images/rds group.svg",
        securitygroups: "/images/securityGroup group.svg",
        subnets: "/images/subnet group.svg",
        vpc: "/images/vnet.png",
        aws: "/images/cloud.svg",
        nouse: "/images/cloud.svg",
        networkinterface: "/images/nic.png",
        servergroups: "/images/subnet group.svg",
        volumegroups: "/images/subnet group.svg",
        vpcgroups: "/images/subnet group.svg",
        subnetgroups: "/images/subnet group.svg",
        interenetgroups: "/images/subnet group.svg",
        securitygroups: "/images/subnet group.svg",
        storagegroups: "/images/subnet group.svg",
        databasegroups: "/images/subnet group.svg",
    }
}

export const LINE_TYPE = {
    volume: CIRCLE_SIZE_L1,
    server: CIRCLE_SIZE_L2,
    database: CIRCLE_SIZE_L2,
    bucket: CIRCLE_SIZE_L2,
    subnet: CIRCLE_SIZE_L3,
    internetgateway: CIRCLE_SIZE_L3,
    securitygroup: CIRCLE_SIZE_L3,
    s3_group: CIRCLE_SIZE_L3,
    database_groups: CIRCLE_SIZE_L3,
    securitygroups: CIRCLE_SIZE_L4,
    subnets: CIRCLE_SIZE_L4,
    vpc: CIRCLE_SIZE_L5,
    aws: CIRCLE_SIZE_L6,
    azure: CIRCLE_SIZE_L6,
    nouse: CIRCLE_SIZE_L3,
    networkinterface: CIRCLE_SIZE_L4,
    CRMS: CIRCLE_SIZE_L7,
    servergroups: CIRCLE_SIZE_L4,
    volumegroups: CIRCLE_SIZE_L4,
    vpcgroups: CIRCLE_SIZE_L4,
    subnetgroups: CIRCLE_SIZE_L4,
    interenetgroups: CIRCLE_SIZE_L4,
    securitygroups: CIRCLE_SIZE_L4,
    storagegroups: CIRCLE_SIZE_L4,
    atabasegroups: CIRCLE_SIZE_L4
}

export const resourceState = {
    server: resource => {
        let status = resource['State']
        if (status == undefined) {
            status = resource['status']
        }
        let scase = {
            stopped: 1,
            running: 0,
            terimanted: 4,
            'shutting-down': 2,
            stopping: 3,
            pending: 5,
            undefined: 4
        }
        return scase[status]
    },
    database: resource => {
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
    volume: resource => {
        let status = resource['State']
        let scase = {
            "creating": 11,
            "available": 8,
            "in-use": 6,
            "deleting": 10,
            "deleted": 10,
            "error": 10,
            "Attached": 6,
            "Unattached": 8
        }
        return scase[status]
    },
    vpc: resource => {
        if (resource['State']) {
            let status = resource['State']
            let scase = {
                "available": 0
            }
            return scase[status]
        }
        else {
            return 0
        }
    },
    subnet: resource => {
        if (resource['State']) {
            let status = resource['State']
            let scase = {
                "pending": 5,
                "available": 0
            }
            return scase[status]
        }
        else {
            return 0
        }
    },
    networkinterface: resource => {
        return 0
    }
}