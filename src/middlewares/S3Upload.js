//기존 람다함수에서 s3로 직접올리는 방식에서 s3에 직접 업로드하는 방식으로 교체

/*
const aws = require('aws-sdk')
const multer = require('multer')
const randomString = require('crypto-random-string')

aws.config.region = 'ap-northeast-2'


const s3 = new aws.S3()

class customMulter{
    constructor(opts) {
        this.bucket = opts.bucket
        this.fieldname = opts.fieldname //uploadfile fieldname
        this.limits = (opts.limits || (1024*1024*1024*2))   //2GB
    }

    _handleFile(req, file, cb) {
        if (file.originalname === 'b.jpg') {
            cb(new Error('file error'))
            return
        }
        //TODO
        //아래에생성한 랜덤문자열이 s3에 저장될 파일이름이고 이걸 mongoDB에도 저장해야함
        //파일 이름자체를 링크로 사용
        const randomStr = randomString({ length: 25, type: 'alphanumeric' })
        let size=0
        const param = {
            Bucket: this.bucket,
            Key: randomStr,
            Body: file.stream,
            ContentType: file.mimetype
        }

        s3.upload(param, (err, res) => {
            if (err) cb(err)    
            //req.file
            cb(null, {
                filename: randomStr,
                originalname:file.originalname,
                size:size
            })
        }).on('httpUploadProgress', function (ev) {
            if (ev.total) size=ev.total
        })
        

    }

    _removeFile(req, file, cb) {
        s3.deleteObject({
            Bucket: this.bucket,
            Key:file.filename
        }, cb)
    }
}

exports.uploadToS3 = ({ bucket, fieldname, limits }) => {
    const disk = new customMulter({
        bucket: bucket,
        fieldname: fieldname,
        limits:limits
    })

    return multer({
        storage: disk,
        limits: {
            fileSize:disk.limits
        }
    }).single(disk.fieldname)
}

exports.downloadFile = (bucket, filename) => {
    return s3.getObject({
            Bucket: bucket,
            Key:filename
        }).createReadStream()
}

exports.diskUpload = (opts) => {
    return multer({
        //storage: disk,
        dest:'./upload',
        limits: {
            fileSize: opts.fileSize
        }
    }).single(opts.fieldname)
}



const aws = require('aws-sdk')
const s3=new aws.S3()
const randomStr = require('crypto-random-string')

exports.createUploadURL = (req,resp,next) => {
    
}

exports.createDownloadURL = (req, resp, next) => {
    //다운로드 전에 db로 검색한결과값으로 다운로드할 파일의 key 구함

    const params = {
        Bucket: process.env.BUCKET,
        Key: //
    }

    s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) {
            console.log(err)
            next(err)
        }
        resp.send(url)
    })
}

*/