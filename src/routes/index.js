const router=require('express').Router()
const file = require('./file/index')

router.use(file)

module.exports=router