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

router.get('/', (req, res) => {
    model.getAllTheme().then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(400).json(err)
    })
})

router.get('/:id/allGameImage' , (req,res) => {
    let id_theme = req.body.params
    model.getAllGameImageArtiste(id_theme).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(400).json(err)
    })
})

router.post('/', (req, res) => {
    let name = req.body.nom
    if (name === '') return res.sendStatus(400)
    model.insertTheme(name).then((id) => {
        res.status(201).json({
            id_theme: id
        })
    }).catch((err) => {
        res.status(400).json(err)
    })
})

router.patch('/:id', (req, res) => {
    let id_theme = req.params.id
    let nom = req.body.nom

    if (nom === '') return res.sendStatus(400)
    model.updateTheme(id_theme, nom).then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        res.status(400).json(err)
    })
})

router.delete('/:id' , (req,res) => {
    let id_theme = req.params.id
    model.deleteArtiste(id_theme).then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        res.status(400).json(err)
    })
})


module.exports = router