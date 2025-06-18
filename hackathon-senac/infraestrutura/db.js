const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'reservarecursos'
});

connection.connect((err) => {
    if (err) {
        console.error(`Erro ao conectar no banco de dados: ${err}`);
        return;
    }
    console.log("Conectado com sucesso ao Banco de Dados!")
});

module.exports = connection;