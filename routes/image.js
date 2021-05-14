var express = require('express');
var router = express.Router();
const model = require('../model/Model')

const fs = require('fs')


router.use( (req,res,next) => {
    let token = req.headers['authorization']

    if(token == null ) return res.sendStatus(401)
    model.verifyToken(token,(err,user) => {
        if (err) return res.sendStatus(403)
        next()
    })

})



router.post('/test' , (req,res) =>{

    let fileUpload = req.files.zip
    fileUpload.name = "1.png"
    fileUpload.mv('./'+fileUpload.name,(err) => {
        if(err) return res.sendStatus(500)
        res.end()
    })

})




module.exports = router