//file schema
const mongoose = require('mongoose')
const day=require('dayjs')

const file = new mongoose.Schema({
    filename: { type: String, required:true },
    originalname: { type: String, required:true },
    ip: String,
    date: { type: Number, default: day().unix() }, //���н� �ð����� ���߿� ��ȯ�ؼ� ���
    expire: {type:Number,default:day().add(3,'day').unix()}, //���ε� �ð����κ��� +3��
    size: { type: Number, required: true },
    isValid: {type:Boolean,default:false}
    }, 
    {
        versionKey: false
    }
)

file.statics.upload = function ({ filename,originalname,ip }) {
    //������ ���ε� ������
    const uploadFile = new this({
        filename: filename,
        originalname: originalname,
        ip: ip,
        size:0
    })
    
    return uploadFile.save()
}

module.exports = mongoose.model('file', file)

