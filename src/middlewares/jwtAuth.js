//��ū�߱� �� ���� �̵����
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
        //������ ����id�� ��ū�� ���� id�� �ٸ���(a ���Ͽ����� ��ū�� ������ b ���Ͽ� ����������)
        if (payload.file !== req.params.fileID) {
            next(new Error('invalid'))
            return
        }
        next()
    })
}