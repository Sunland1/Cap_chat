var express = require('express');
var router = express.Router();
const model = require('../model/Model')

const fs = require('fs')
const file_manager = require('../Class/FileManager')


router.use((req, res, next) => {
    let token = req.headers['authorization']

    if (token == null) return res.sendStatus(401)
    model.verifyToken(token, (err, user) => {
        if (err) return res.sendStatus(403)
        next()
    })

})

router.post('/neutre/upload/:id_jeux', (req, res) => {
    let fileUpload = req.files.file
    let id_jeux = req.params.id_jeux

    if (fileUpload.mimetype === 'application/zip') {
        fileUpload.mv('./tmp/' + fileUpload.name, (err) => {
            if (err) return res.sendStatus(400)
            model.getInfoPath(id_jeux).then((path) => {
                let newPath = "./public/images/Theme/" + path + "/neutres/"
                if (!fs.existsSync(newPath)) {
                    file_manager.createDir(newPath)
                }
                file_manager.unzipFile(fileUpload.name, newPath, id_jeux).then(() => {
                    res.sendStatus(200)
                }).catch((err) => {
                    res.status(400).json(err)
                })

            }).catch((err) => {
                console.log(err)
                res.status(400).json(err)
            })
        })
    } else if (fileUpload.mimetype === 'image/jpg' || 'image/png') {
        model.getInfoPath(id_jeux).then((path) => {
            let newPath = "./public/images/Theme/" + path + "/neutres/"
            let url = "http://localhost:3000" + newPath.replace('.', '') + fileUpload.name
            if (!fs.existsSync(newPath)) {
                file_manager.createDir(newPath)
            }
            model.insertNeutralImage(id_jeux, url,newPath+fileUpload.name).then((id) => {
                fileUpload.mv(newPath+fileUpload.name, (err) => {
                    if(err) return res.status(400).json(err)
                    res.sendStatus(200)
                })
            }).catch((err) => {
                res.status(400).json(err)
            })

        }).catch((err) => {
            res.status(400).json(err)
        })
    } else {
        res.status(401).json({
            err: "WRONG FORMAT"
        })
    }
})


router.delete("/neutre/:id" , (req,res) => {
    let id_neutre = req.params.id
    model.getNeutralImagePath(id_neutre).then((path) => {
        model.deleteNeutralImage(id_neutre).then(() => {
            file_manager.deleteFile(path)
            res.sendStatus(200)
        }).catch((err) => {
            res.status(400).json(err)
        })
    }).catch((err) => {
        res.status(400).json(err)
    })
})


router.post('/singuliere/:id/upload' , (req,res) => {
    let id_jeux = req.params.id
    let data = req.body.data !== undefined ? JSON.parse(req.body.data) : undefined
    let fileupload =  req.files.file

    if(fileupload.mimetype === "image/jpg" || fileupload.mimetype === "image/png"){
        model.getInfoPath(id_jeux).then( (path) => {
            let newPath = "./public/images/Theme/"+path+"/singuliere/"
            let url = "http://localhost:3000" + newPath.replace('.', '') + fileupload.name
            if(!fs.existsSync(newPath)){
               file_manager.createDir(newPath)
            }
            model.insertSingImage(id_jeux,url,newPath,data.indice).then((id) => {
                fileupload.mv(newPath+fileupload.name,(err) => {
                    res.status(400).json(err)
                })
                res.sendStatus(200)
            }).catch((err) => {
                res.status(400).json(err)
            })

        }).catch((err) => {
            res.status(400).json(err)
        })
    }
})


module.exports = router