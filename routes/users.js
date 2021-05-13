var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt')
const model = require('../model/Model')

router.post('/register', ((req, res) => {
    let email = req.body.email
    let password = req.body.password

    model.register(email, password).then((id) => {
        model.mailer(id, email)
        res.status(201).json({
            id_usr: id
        })
    }).catch((err) => {
        res.status(400).json({
            err: err
        })

    })
}))


router.get('/emailVerify/:id', (req, res) => {
    let id_usr = req.params.id
    model.verifyEmail(id_usr).then((row) => {
        if (row === undefined) {
            res.status(400).json({
                err: "User NOT FUND"
            })
        } else if (row["is_valide"] === 0) {
            model.validateEmail().then(() => {
                res.sendStatus(202)
            })
        } else {
            res.sendStatus(200)
        }
    }).catch((err) => {
        res.status(400).json(err)
    })
})


router.post("/login", (req, res) => {
    let email = req.body.email
    let password = req.body.password

    model.login(email).then((data) => {
        if (bcrypt.compareSync(password, data[0]['password'])) {
            let token = model.generateToken(data[0]['password'])
            res.status(200).json({
                id_usr: data[0]["id_usr"],
                token: token
            })
        } else {
            res.sendStatus(403)
        }
    }).catch((err) => {
        res.status(400).json({
            err: "MISSING DATA"
        })
    })
})

module.exports = router;
