const mysql = require('mysql')

let connection = mysql.createConnection({
    host: "mysql-sunland.alwaysdata.net",
    user: "sunland_coursweb",
    password: "ProjetJS$$",
    database: "sunland_coursweb",
    insecureAuth: true,
});


connection.connect( (err) => {
    if(err) throw err
    console.log("BDD CONNECTER")
})



module.exports = connection;