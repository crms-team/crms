const passwd = require('./passwd')
const cloud = require('./cloud')
const dashboard = require('./dashboard')
const swagger = require('./swagger')

module.exports = server => {
    swagger(server)
    passwd(server)
    dashboard(server)
    cloud(server)
}