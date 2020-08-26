import { button } from "react-bootstrap"
import React, { Component } from 'react'

export const resourceSvg = {
    ec2: "/images/compute.svg",
    securitygroup: '/images/security_group.svg',
    subnet: '/images/ec2-container-registry.svg',
    vpc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/AWS_Simple_Icons_Virtual_Private_Cloud.svg/640px-AWS_Simple_Icons_Virtual_Private_Cloud.svg.png',
    aws: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/AWS_Simple_Icons_AWS_Cloud.svg/1200px-AWS_Simple_Icons_AWS_Cloud.svg.png',
    ebs: '/images/ebs.svg',
    rds: '/images/trans-line/rds.svg',
    s3: '/images/storage.svg',
    internetgateway: '/images/internet-gateway.svg'
}

export const resourceState={
    ec2: resource => {
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
    rds:resource=>{
        let status = resource['DBInstanceStatus']
        let scase = {
            available: 0,
            creating: 5,
            delting: 4,
            rebooting: 0,
            starting: 0,
            stopped: 1,
            stopping: 3,
        }
        return scase[status]
    },
    ebs:resource=>{
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
    }
}