module.exports = {
    server: require('./ec2'),
    volume: require('./ebs'),
    ip: require('./eip'),
    keypair: require('./key-pair'),
    image: require('./ami')
}

