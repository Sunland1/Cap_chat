const express = require('express');
const router = express.Router();
const model = require('../model/Model')
const fs = require('fs')




router.get('/:id' , (req,res) => {
    let id_jeux = req.params.id
    model.getAllImageNeutral(id_jeux).then( (tab_neutralImage) => {

        model.getAllImageSing(id_jeux).then( (tab_singImage) => {
            let index = Math.floor(Math.random() * tab_neutralImage.length )
            let use_image = []
            let indice = tab_singImage[Math.floor(Math.random() * tab_singImage.length )].indice
            use_image.push(tab_neutralImage[index])
            use_image.push(tab_singImage[Math.floor(Math.random() * tab_singImage.length )])
            while (use_image.length < 9 ){
                index = Math.floor(Math.random() * tab_neutralImage.length )
                if(!use_image.includes(tab_neutralImage[index])){
                    use_image.push(tab_neutralImage[index])
                }
            }


            res.render("capChat",{use_image: use_image , indice: indice})

        }).catch((err) => res.status(400).json(err))
    }).catch( (err) => {res.status(400).json(err)} )
})


router.post("/verify", (req,res) => {
    let id_image = req.body.id
    let indice  = req.body.indice

    model.verify(id_image,indice).then((boolean) => {
        if(boolean) {
            res.sendStatus(200)
        }
        else res.sendStatus(401)
    }).catch((err) => res.status(400).json(err))
})








module.exports = router;