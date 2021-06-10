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
                "http://localhost:8080/users/verifyEmail/"+id // Change the adress after deploiment
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


    //<---------------- Theme ------------------>
    static getAllTheme(){
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM Theme', (err,rows) => {
                if(err) reject(err)
                resolve(rows)
            })
        })
    }

    static getAllGameImageTheme(id){
        return new Promise((resolve,reject) => {
            connection.query('SELECT Theme.id_theme as id_theme,JI.id_jeux,Theme.nom as nom_theme,JI.nom as nom_jeux\n' +
                'FROM Theme JOIN JeuxImage JI on Theme.id_theme = JI.id_theme WHERE Theme.id_theme=?',[id],
                (err,rows) => {
                    if(err) reject(err)
                    resolve(rows)
                }
            )
        })
    }


    static insertTheme(nom){
        return new Promise((resolve,reject) => {
            connection.query('INSERT INTO Theme (nom) VALUES (?)',[nom] ,(err,row) =>{
                if(err || row === undefined) reject(err)
                else resolve(row.insertId)
            })
        })
    }

    static updateTheme(id,nom){
        return new Promise((resolve,reject) => {
            connection.query('UPDATE Theme SET nom=? WHERE id_theme=?',[id,nom],
                (err) => {
                    if(err) reject(err)
                    resolve()
                }
            )
        })
    }

    static deleteTheme(id){
        return new Promise((resolve,reject) => {
            connection.query('DELETE Theme WHERE id_theme=?',[id],(err) => {
                if(err) reject(err)
                resolve()
            })
        })
    }

    //<---------------------- Jeux d'images ---------------------------->

    static getAllGameImage(){
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM JeuxImage',(err,rows) => {
                if(err) reject(err)
                resolve(rows)
            })
        })
    }


    static insertGameImage(id_theme,id_artiste,nom){
        return new Promise((resolve,reject) => {
            connection.query('INSERT INTO JeuxImage (id_theme,id_artiste,nom) VALUES (?,?,?)',[id_theme,id_artiste,nom],
                (err) => {
                    if(err) reject(err)
                    resolve()
                }
            )
        })
    }

    static updateGameImage(id,id_theme,id_artiste,nom){
        return new Promise((resolve,reject) => {
            connection.query("UPDATE JeuxImage SET id_theme=?,id_artiste=?,nom=? WHERE id_jeux=?",
                [id_theme,id_artiste,nom,id],(err) => {
                    if(err) reject(err)
                    resolve()
                }
            )
        })
    }

    static deleteGameImage(id){
        return new Promise((resolve,reject) => {
            connection.query("DELETE FROM JeuxImage WHERE id_jeux=?" , [id], (err) => {
                if(err) reject(err)
                resolve()
            })
        })
    }


    static getInfoPath(id_jeux){
        return new Promise((resolve,reject) => {
            connection.query('SELECT JeuxImage.nom as game_name,T.nom as theme_name ' +
                'FROM JeuxImage JOIN Theme T on T.id_theme = JeuxImage.id_theme WHERE JeuxImage.id_jeux = ?',
                [id_jeux],(err,row) => {
                    if(err) reject(err)
                    else if(row[0] === undefined) reject(Error("NO CONTENT"))
                    else resolve(row[0].theme_name+"/"+row[0].game_name)
                }
            )
        })
    }


    //<-------------------- Image Section ----------------------------------->
    static insertNeutralImage(id_jeux,url,path){
        return new Promise((resolve,reject) => {
            connection.query('INSERT INTO ImageNeutre (id_jeux,url,path) VALUES (?,?,?)' , [id_jeux,url,path],
                (err,row) => {
                    if(err || row === undefined) reject(err)
                    else resolve(row.insertId)
                }
            )
        })
    }


    static deleteNeutralImage(id_neutre){
        return new Promise((resolve,reject) => {
            connection.query('DELETE FROM ImageNeutre WHERE id_neutre=?' , [id_neutre] , (err) => {
                if(err) reject(err)
                resolve()
            })
        })
    }

    static getNeutralImagePath(id_neutre){
        return new Promise( (resolve,reject) => {
            connection.query('SELECT path FROM ImageNeutre WHERE id_neutre=?',[id_neutre],(err,row) => {
                if(err || row[0] === undefined) return reject(err)
                resolve(row[0].path)
            })
        })
    }


    static insertSingImage(id_jeux,url,path,indice){
        return new Promise((resolve,reject) => {
            connection.query('INSERT INTO ImageSinguliere (id_jeux,indice,url,path) VALUES (?,?,?,?)',
                [id_jeux,indice,url,path],(err,row) => {
                    if(err) console.log(err)
                    resolve(row)
                }
            )
        })
    }



}



module.exports = Model