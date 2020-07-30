const passwd = require('./passwd')
const cloud = require('./cloud')

module.exports = server => {
    passwd(server)
    cloud(server)
}