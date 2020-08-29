const key = require('./key')
const data = require('./data')
const history = require('./history')

module.exports = server => {
    key(server)
    data(server)
    history(server)
}