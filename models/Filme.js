const db = require('./db');

const Filme = db.sequelize.define('filme',{
    nome:{
        type:db.Sequelize.STRING
    },
    genero:{
        type:db.Sequelize.STRING
    },
    ano:{
        type:db.Sequelize.INTEGER
    },
    descricao:{
        type:db.Sequelize.STRING
    },
    excluido:{
        type:db.Sequelize.BOOLEAN
    },
    idUsuarioAtualizacao:{
        type:db.Sequelize.INTEGER
    },
})

//Filme.sync({ force: true });

module.exports = Filme;