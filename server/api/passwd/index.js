const fs = require('fs')

function atob(data) {
    return Buffer.from(data, 'base64').toString()
}


module.exports = server => {
    // /api/passwd: passwd api
    {
        server.get('/api/passwd', (req, res)=> {
            const result = server.config.passwd == atob(req.query.passwd)
            res.send({result: result})
        })

        server.post('/api/passwd', (req, res)=> {
            res.send({result: false, msg: 'API Not support'})
        })

        server.put('/api/passwd', (req, res)=> {
            if (server.config.passwd == atob(req.query.passwd)){
                server.config.passwd = atob(req.query.passwd)
                fs.writeFileSync(`${server.config.path}/data/crms.config`, JSON.stringify(server.config))
                res.send({result: true})
            } else {
                res.send({result: false, msg: 'Uncorrect Password'})
            }
        })

        server.delete('/api/passwd', (req, res)=> {
            res.send({result: false, msg: 'API Not support'})
        })
    }
}