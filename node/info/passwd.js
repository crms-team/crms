
module.exports = server => {
    server.get('/api/passwd', (req, res)=> {
        console.log('testing')
        res.send({
            result: true
        })       
    })
}