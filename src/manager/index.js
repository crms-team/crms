import * as awsManager from "./aws";
import * as azureManager from "./azure";

const managerType = {
    aws: {
        server: "ec2",
        volume: "ebs",
        ip: "eip",
        keypair: "keypair",
        database: "rds",
        vpc: "vpc",
        subnet: "subnet",
        securitygroup: "securitygroup",
        bucket: "s3",
    },
    azure: {
        server: "ec2",
        volume: "ebs",
        ip: "eip",
        keypair: "keypair",
        database: "rds",
        vpc: "vpc",
        subnet: "subnet",
        securitygroup: "securitygroup",
        bucket: "s3",
    },
};

const idType = {
    aws: {
        server: {
            manage: awsManager.EC2Manager,
            id: "id",
        },
        volume: {
            manage: awsManager.EBSManager,
            id: "id",
        },
        ip: {
            manage: awsManager.EIPManager,
            id: "id",
        },
        keypair: {
            manage: awsManager.KeyPairManager,
            id: "id",
        },
        database: {
            manage: awsManager.RDSManager,
            id: "identifier",
        },
        vpc: {
            manage: awsManager.VpcManager,
            id: "id",
        },
        subnet: {
            manage: awsManager.SubnetManager,
            id: "id",
        },
        securitygroup: {
            manage: awsManager.SecurityGroupManager,
            id: "id",
        },
        bucket: {
            manage: awsManager.S3Manager,
            id: "name",
        },
    },
    azure: {
        server: {
            manage: azureManager.VMManager,
            id: "id",
        },
        volume: {
            manage: azureManager.DiskManager,
            id: "id",
        },
        ip: {
            manage: azureManager.IpAddrManager,
            id: "id",
        },
        keypair: {
            manage: azureManager.KeyPairManager,
            id: "id",
        },
        database: {
            manage: "",
            id: "identifier",
        },
        vpc: {
            manage: "",
            id: "id",
        },
        subnet: {
            manage: "",
            id: "id",
        },
        securitygroup: {
            manage: "",
            id: "id",
        },
        bucket: {
            manage: "",
            id: "name",
        },
    },
};

const summaryType = {
    server: {
        manage: awsManager.EC2Manager,
    },
    volume: {
        manage: awsManager.EBSManager,
    },
    subnet: {
        manage: awsManager.EIPManager,
    },
    keypair: {
        manage: awsManager.KeyPairManager,
    },
    database: {
        manage: awsManager.RDSManager,
    },
    vpc: {
        manage: awsManager.VpcManager,
    },
    ip: {
        manage: awsManager.EIPManager,
    },
    subnet: {
        manage: awsManager.SubnetManager,
    },
    securitygroup: {
        manage: awsManager.SecurityGroupManager,
    },
    s3: {
        manage: awsManager.S3Manager,
    },
};

export { awsManager, azureManager, managerType, idType, summaryType };
