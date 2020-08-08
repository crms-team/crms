module.exports = {
    ...require('./ec2'),
    ...require('./ebs'),
    ...require('./eip'),
    ...require('./key-pair'),
    ...require('./ami')
}

