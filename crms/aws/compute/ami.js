const AWS = require('aws-sdk')

async function describeImages(key, args=undefined) {
    const data = ["Amazon Linux 2 AMI 2.0.20200722.0 x86_64 HVM gp2","Canonical, Ubuntu, 18.04 LTS, amd64 bionic image build on 2020-08-10","Canonical, Ubuntu, 16.04 LTS, amd64 xenial image build on 2020-07-29","SUSE Linux Enterprise Server 15 SP2 (HVM, 64-bit, SSD-Backed)","Provided by Red Hat, Inc.","Microsoft Windows Server 2019 with Desktop Experience Locale English AMI provided by Amazon","Microsoft Windows Server 2019 with Containers Locale English AMI provided by Amazon","Microsoft Windows Server 1909 Core Locale English AMI provided by Amazon","Microsoft Windows Server 2016 with Desktop Experience Locale English AMI provided by Amazon","Microsoft Windows Server 2016 with Containers Locale English AMI provided by Amazon","Microsoft Windows Server 2016 Full Locale English with SQL Standard 2019 AMI provided by Amazon","Microsoft Windows Server 2012 R2 RTM 64-bit Locale English with SQL Standard 2016 AMI provided by Amazon","Microsoft Windows Server 2012 R2 RTM 64-bit Locale English with SQL Enterprise 2016 AMI provided by Amazon","Amazon Linux 2 with .Net Core, PowerShell, Mono, and MATE Desktop Environment","Canonical, Ubuntu, 20.04 LTS, amd64 focal image build on 2020-07-29","SUSE Linux Enterprise Server 12 SP5 (HVM, 64-bit, SSD-Backed)"]

    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeImages({
        Filters: [
            {
                Name: 'description',
                Values: data
            }
        ]
    }).promise())['Images']
}

module.exports = {
    default: {
        get: describeImages
    },
    etc: {

    }
}

