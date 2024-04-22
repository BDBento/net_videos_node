const db = require('./db');

const Categoria = db.sequelize.define('categoria',{
    genero:{
        type:db.Sequelize.STRING
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

//Categoria.sync({ force: true });

module.exports = Categoria;