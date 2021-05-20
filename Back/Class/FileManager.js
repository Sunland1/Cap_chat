const fs = require('fs')
const etl = require('etl')
const path = require('path')
const unzipper = require('unzipper')
const model = require('../model/Model')


class FileManager{


    static unzipFile(zipFilePath,newPath,id_jeux){
        return new Promise((resolve,reject) => {
            fs.createReadStream('./tmp/'+zipFilePath).pipe(unzipper.Parse())
                .pipe(etl.map( async entry => {
                    if(entry.path.split('.')[1] === "jpg"){
                        const content = await entry.buffer()
                        let currentPath = path.join(newPath+entry.path.split('/')[1].split(' ').join('_'))
                        let url = "http://localhost:3000/"+currentPath.split('\\').join('/')
                        model.insertNeutralImage(id_jeux,url,currentPath).then( () => {
                            fs.appendFileSync(currentPath,content)
                        }).catch( (err) => reject(err) )
                    }
                    entry.autodrain()
                }))
                .on('finish' , () => {
                    fs.rmSync(zipFilePath)
                    resolve()
                })

        })
    }


    static createDir(path){
        fs.mkdirSync(path)
    }

    static deleteDir(path){
        fs.rmdirSync(path)
    }

    static deleteFile(path){
        fs.unlinkSync(path)
    }





}

module.exports = FileManager