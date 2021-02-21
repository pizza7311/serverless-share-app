exports.errorHandler = (err, req, resp, next) => {
    const error = err.message
    console.log(error)
    switch (error) {
        case 'Unexpected field':
        case 'bad request':
            resp.status(400)
            resp.send('bad request')
            break
        case 'invalid':                 //유효하지 않을경우
            resp.status(403)
            resp.send('forbidden')
            break
        case 'jwt must be provided':    //토큰이 없을경우
            resp.status(401)
            resp.send('need token')
            break
        case 'file too large':
            resp.status(403)
            resp.send('file too large')
            break
        case 'file not found':
            resp.status(404)
            resp.send('file not Found')
            break
        default:
            resp.status(500)
            resp.send('server error')
    }

}

exports._404Handler = (req, resp, next) => {
    resp.status(404).send('hi there this is 404')
}