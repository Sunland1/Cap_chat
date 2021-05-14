const connection = require('../bin/bdd')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const fs = require('fs')


class Model {

    static generateToken(id){
        let key = fs.readFileSync('./bin/private.pem')
        return jwt.sign(id+"CapChat213",key, { algorithm: 'RS256'})
    }

    static verifyToken(token,cb){
        let key = fs.readFileSync('./bin/public.pem')
        jwt.verify(token,key,(err,user) => {
            cb(err,user)
        })
    }

    static async mailer(id,email){

        let transporter = nodemailer.createTransport({
            host: "smtp-sunland.alwaysdata.net",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "sunland@alwaysdata.net", // generated ethereal user
                pass: "ProjetJS$$", // generated ethereal password
            },
        });


        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <noreply@gloup.fr>', // sender address
            to: email, // list of receivers
            subject: "Verify email", // Subject line
            text: "👻 Pour Valider votre compte clicker sur ce lien : " +
                "http://localhost:3000/users/verifyEmail/"+id // Change the adress after deploiment
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


    }

    static register(email,password){
        return new Promise( (resolve,reject) => {
            let hash_password = bcrypt.hashSync(password,10)
            connection.query("INSERT INTO Utilisateur (email,password) VALUES (?,?)" , [email,hash_password],
                (err,row) => {
                    if(err || row === undefined){
                        reject(err)
                    }else{
                        resolve(row.insertId)
                    }
                }
            )
        })
    }

    static login(email){
        return new Promise((resolve,reject) => {
            connection.query('SELECT id_usr,password FROM Utilisateur WHERE email=?',[email],
                (err,row) => {
                    if(err) reject(err)
                    resolve(row)
                }
            )
        })
    }

    static verifyEmail(id){
        return new Promise( (resolve,reject) => {
            connection.query("SELECT is_valide FROM Utilisateur WHERE id_usr=?",[id],
                (err,row) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(row[0])
                    }
                }
            )
        })
    }

    static validateEmail(){
        return new Promise((resolve,reject) => {
            connection.query("UPDATE Utilisateur SET is_valide=1",(err) => {
                if(err) throw reject(err)
                resolve()
            })
        })
    }


    //<------------------ Artiste ------------------------------------>

    static getAllArtiste(){
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM Artiste' , (err,rows) => {
                if(err) reject(err)
                resolve(rows)
            })
        })
    }


    static getAllGameImageArtiste(id){
        return new Promise((resolve,reject) => {
            connection.query('SELECT id_jeux,id_theme,Artiste.nom as nom_artiste,pays,JI.nom as nom_jeux_image\n' +
                'FROM Artiste JOIN JeuxImage JI on Artiste.id_artiste = JI.id_artiste WHERE Artiste.id_artiste=?',
                [id],(err,rows) => {
                    if(err) reject(err)
                    resolve(rows)
                }
            )
        })
    }


    static insertArtiste(name,country){
        return new Promise((resolve,reject) => {
            connection.query('INSERT INTO Artiste (nom,pays) VALUES (?,?)',[name,country],
                (err,row) => {
                    if(err || row === undefined) reject(err)
                    else resolve(row.insertId)
                }
            )
        })
    }

    static updateArtiste(id,data){
        return new Promise((resolve,reject) => {
            connection.query('UPDATE Artiste SET nom=?,pays=? WHERE id_artiste=?',[data.nom,data.pays,id],
                (err) => {
                    if(err) reject(err)
                    resolve()
                }
            )
        })
    }


    static deleteArtiste(id){
        return new Promise((resolve,reject) => {
            connection.query('DELETE FROM Artiste WHERE id_artiste=?',[id],
                (err) => {
                    if(err) reject(err)
                    resolve()
                }
            )
        })
    }




}



module.exports = Model