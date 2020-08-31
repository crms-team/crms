import * as awsManager from './aws'

const managerType = {
    aws: {
      server: 'ec2',
      volume: 'ebs',
      ip: 'eip',
      keypair:'keypair',
      database:'rds',
      vpc:'vpc',
      subnet:'subnet',
      securitygroup:'securitygroup',
      bucket:'s3'
    }
  }

const idType ={
  aws:{
    server: {
      manage:awsManager.EC2Manager,
      id: "id"
    },
    volume: {
      manage:awsManager.EBSManager,
      id: "id"
    },
    ip: {
      manage:awsManager.EIPManager,
      id: "id"
    },
    keypair: {
      manage:awsManager.KeyPairManager,
      id: "id"
    },
    database: {
      manage:awsManager.RDSManager,
      id: "identifier"
    },
    vpc: {
      manage:awsManager.VpcManager,
      id: "id"
    },
    subnet: {
      manage:awsManager.SubnetManager,
      id: "id"
    },
    securitygroup: {
      manage:awsManager.SecurityGroupManager,
      id: "id"
    },
    bucket: {
      manage:awsManager.S3Manager,
      id: "name"
    }
  }
}

const summaryType ={
  "ec2": {
    manage: awsManager.EC2Manager,
  },
  ebs: {
    manage: awsManager.EBSManager,
  },
  subnet: {
    manage: awsManager.EIPManager,
  },
  keypair: {
    manage: awsManager.KeyPairManager,
  },
  rds: {
    manage: awsManager.RDSManager,
  },
  vpc: {
    manage: awsManager.VpcManager,
  },
  subnet: {
    manage: awsManager.SubnetManager,
  },
  securitygroup: {
    manage: awsManager.SecurityGroupManager,
  },
  s3: {
    manage: awsManager.S3Manager,
  }
}
  

export { awsManager, managerType, idType , summaryType}