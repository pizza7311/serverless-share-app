//토큰발급 및 인증 미들웨어
const jwt = require('jsonwebtoken')
const day = require('dayjs')

exports.autenticate = (req, resp, next) => {
    const file = req.file
    const payload = {
        exp: day().add(5, 'minute').unix(),
        file: file._id
    }
    jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
        if (err) {
            console.log(err)
            next(err)
            return
        }
        resp.cookie('token', token, {
            httpOnly: true,
            expires: new Date(day().add(5, 'minute')),
            sameSite: 'none',
            secure: true
        })
        next()
    })
}

exports.vertify = (req, resp, next) => {
    const token = req.cookies.token
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            next(err)
            return
        }
        //접근한 파일id가 토큰의 파일 id와 다를때(a 파일에대한 토큰을 가지고 b 파일에 접근했을때)
        if (payload.file !== req.params.fileID) {
            next(new Error('invalid'))
            return
        }
        next()
    })
}