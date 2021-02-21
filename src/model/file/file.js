//file schema
const mongoose = require('mongoose')
const day=require('dayjs')

const file = new mongoose.Schema({
    filename: { type: String, required:true },
    originalname: { type: String, required:true },
    ip: String,
    date: { type: Number, default: day().unix() }, //유닉스 시간으로 나중에 변환해서 사용
    expire: {type:Number,default:day().add(3,'day').unix()}, //업로드 시간으로부터 +3일
    size: { type: Number, required: true },
    isValid: {type:Boolean,default:false}
    }, 
    {
        versionKey: false
    }
)

file.statics.upload = function ({ filename,originalname,ip }) {
    //파일을 업로드 했을때
    const uploadFile = new this({
        filename: filename,
        originalname: originalname,
        ip: ip,
        size:0
    })
    
    return uploadFile.save()
}

module.exports = mongoose.model('file', file)

