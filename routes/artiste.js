var express = require('express');
var router = express.Router();
var fs = require('fs')



router.get('/', (req,res) => {
    res.render('form_artiste' , {title: 'Formulaire Artiste' , style: "/stylesheets/form_style.css"})
})

router.post('/' , (req,res) => {
    var file_image = req.files.foo
})
module.exports = router;