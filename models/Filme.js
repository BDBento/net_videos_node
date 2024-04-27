const db = require('./db');

const Filme = db.sequelize.define('filme',{
    nomeFilme:{
        type:db.Sequelize.STRING
    },
    categoriaFilme:{
        type:db.Sequelize.STRING
    },
    anoFilme:{
        type:db.Sequelize.INTEGER
    },
    descricaoFilme:{
        type:db.Sequelize.STRING
    },
    excluidoFilme:{
        type:db.Sequelize.BOOLEAN
    },
    idUsuarioAtualizacao:{
        type:db.Sequelize.INTEGER
    },
})

//Filme.sync({ force: true });

module.exports = Filme;