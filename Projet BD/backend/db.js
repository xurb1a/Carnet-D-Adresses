const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '3663',
    database: 'carnet_adresses',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Erreur connexion:', err);
    } else {
        console.log('Connecté à la base de données.');
    }
});

module.exports = db;
