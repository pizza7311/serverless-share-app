const router = require('express').Router()
const jwtAuth=require('../../middlewares/jwtAuth')
const ctr = require('./file.ctr')

router.post('/upload', ctr.createUploadUrl)
router.get('/download/:fileID', jwtAuth.vertify,ctr.getFileInfo, ctr.isExpire, ctr.createDownloadUrl)
router.get('/file/:fileID',ctr.getFileInfo,ctr.isExpire,jwtAuth.autenticate,ctr.viewFile)

module.exports=router