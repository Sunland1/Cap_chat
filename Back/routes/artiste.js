const express = require('express');
const router = express.Router();
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
    model.getAllArtiste().then( (data) => {
        res.status(200).json(data)
    }).catch( (err) => {
        res.status(400).json(err)
    })
})


router.get('/:id/allGameImage' , (req,res) => {
    let id_artiste = req.params.id
    model.getAllGameImageArtiste(id_artiste).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(400).json(err)
    })
})


router.post('/' , (req,res) => {
    let name = req.body.nom
    let country = req.body.pays

    if(name === '' || country === '') return res.sendStatus(400)
    model.insertArtiste(name,country).then((id) => {
        res.status(201).json({
            id_artiste: id
        })
    }).catch((err) => {
        res.status(400).json(err)
    })
})


router.patch('/:id', (req,res) => {
    let id_artiste = req.params.id
    let data = req.body

    for(let key in data){
        if(data[key] === ""){
            return res.status(400).json({
                err: "MISSING ARGUMENT"
            })
        }
    }

    model.updateArtiste(id_artiste,data).then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        res.status(400).json(err)
    })
})


router.delete('/:id', (req,res) => {
    let id_artiste = req.params.id
    model.deleteArtiste(id_artiste).then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        res.status(400).json(err)
    })

})


module.exports = router;