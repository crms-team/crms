
module.exports = {
    session: {
        compute: require('./compute'),
        network: require('./network'),
        database: require('./database'),
        storage: require('./storage')
    }, 
    data: require('./data')
}
