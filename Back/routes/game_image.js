var express = require('express');
var router = express.Router();
const model = require('../model/Model')


router.use( (req,res,next) => {
    let token = req.headers['authorization']

    if(token == null ) return res.sendStatus(401)
    model.verifyToken(token,(err,user) => {
        if (err) return res.sendStatus(403)
        next()
    })

})


router.get('/' , (req,res) => {
    model.getAllGameImage().then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(400).json(err)
    })
})


router.get('/:id' , (req,res) => {
    let id_theme = req.params.id
    model.getAllGameImageTheme(id_theme).then((data) => {
        res.status(200).json(data)
    }).catch( (err) => {
        res.status(400).json(err)
    })
})


router.post('/' , (req,res) => {
    let id_theme = req.body.id_theme
    let id_artiste = req.body.id_artiste
    let nom = req.body.nom


    model.insertGameImage(id_theme,id_artiste,nom).then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        res.status(400).json(err)
    })
})


router.patch('/:id' , (req,res) => {
    let id_jeux = req.params.id
    let id_theme = req.body.id_theme
    let id_artiste = req.body.id_artiste
    let nom = req.body.nom

    if(id_theme === '' || id_artiste === '' || nom === '') return res.sendStatus(400)
    model.updateGameImage(id_jeux,id_theme,id_artiste,nom).then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        res.status(400).json(err)
    })
})


router.delete('/:id' , (req,res) => {
    let id_jeux = req.params.id
    model.deleteGameImage(id_jeux).then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        res.status(400).json(err)
    })
})



module.exports = router