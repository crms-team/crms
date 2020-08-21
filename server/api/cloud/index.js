const key = require('./key')
const data = require('./data')

module.exports = server => {
    key(server)
    data(server)
}