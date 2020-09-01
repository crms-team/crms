const AWS = require('aws-sdk')

async function describeImages(key, args=undefined) {
    const data = ["amzn2-ami-hvm-2.0.20200722.0-x86_64-gp2","ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-20200810","ubuntu/images/hvm-ssd/ubuntu-xenial-16.04-amd64-server-20200729","suse-sles-15-sp2-v20200721-hvm-ssd-x86_64","RHEL-8.2.0_HVM-20200423-x86_64-0-Hourly2-GP2","Windows_Server-2019-English-Full-Base-2020.08.12","Windows_Server-2019-English-Full-ContainersLatest-2020.08.12","Windows_Server-1909-English-Core-Base-2020.08.12","Windows_Server-2016-English-Full-Base-2020.08.12","Windows_Server-2016-English-Full-Containers-2020.08.12","Windows_Server-2016-English-Full-SQL_2019_Standard-2020.08.12","Windows_Server-2012-R2_RTM-English-64Bit-SQL_2016_SP2_Standard-2020.08.12","Windows_Server-2012-R2_RTM-English-64Bit-SQL_2016_SP2_Enterprise-2020.08.12","amzn2-x86_64-MATEDE_DOTNET-2020.04.14","ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20200729","suse-sles-12-sp5-v20200615-hvm-ssd-x86_64"]
    AWS.config.update(key)
    let ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })
    return (await ec2.describeImages({
        Filters: [
            {
                Name: 'name',
                Values: data
            }
        ],
    }).promise())['Images']
}

module.exports = {
    default: {
        get: describeImages
    },
    etc: {

    }
}

