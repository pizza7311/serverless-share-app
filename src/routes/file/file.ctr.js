const file = require('../../model/file/file')
const dayjs = require('dayjs')
const aws = require('aws-sdk')
const s3 = new aws.S3({ region:'ap-northeast-2'})
const randomStr = require('crypto-random-string')

exports.createUploadUrl = async (req, resp, next) => {
    const filename = randomStr({ length: 25, type: 'alphanumeric' })
    const prequery = await file.upload({
        filename: filename,
        originalname: req.body.originalname,
        ip:req.ip
    })

    const params = {
        Bucket: process.env.BUCKET,
        Fields: {
            key: filename
        },
        Expires: 5,
        Conditions: [
            ["content-length-range", 0, 2.1475e+9]  //2GB  2.1475e+9
        ]
    }

    s3.createPresignedPost(params, (err, res) => {
        if (err) {
            console.log(err)
            next(err)
            return
        }
        resp.send({
            preSigned: res,
            id:prequery._id
        })
    })
}

exports.createDownloadUrl = (req, resp, next) => {
    //db에서 찾은 파일을 s3 다운로드 링크생성
    const params = {
        Bucket: process.env.BUCKET,
        Key: req.file.filename,
        Expires:5
    }

    s3.getSignedUrl('getObject', params, (err, res) => {
        if (err) {
            next(err)
            return
        }
        resp.send(res)
    })
}

exports.viewFile = (req, resp, next) => {
    //파일 정보, 파일원본이름,만료날짜 등
    const { date, originalname, size,expire } = req.file

    resp.send({
        date: date,
        originalname: originalname,
        size: size,
        expire: expire
    })
}

exports.getFileInfo = (req, resp, next) => {    //id로 파일검색
    const fileID = req.params.fileID
    if (!fileID.match(/^[0-9a-fA-F]{24}$/)) {
        next(new Error('bad request'))
        return
    }

    file.findById(fileID, (err, res) => {
        console.log(res)
        if (err) {
            console.log(err)
            next(err)
            return
        }
        //isValid 유효한 파일(정상 업로드된 파일)이 아니면 없다고 리스폰스
        else if (!res || !res.isValid) {
            next(new Error('file not found'))
            return
        }
        req.file = res
        next()
    })
}

exports.isExpire = (req, resp, next) => {
    const expire = dayjs().isAfter(dayjs.unix(req.file.expire))
    //true일 경우(기간 만료시) 에러 던지기
    if (expire) {
        next(new Error('file not found'))
        return
    }
    next()
}