const db = require('./db');

const Usuario = db.sequelize.define('usuario',{
    nome:{
        type:db.Sequelize.STRING,
        unique:true,
    },
    email:{
        type:db.Sequelize.STRING,
        unique:true,        
    },
    senha:{
        type:db.Sequelize.STRING
    },
    excluido:{
        type:db.Sequelize.BOOLEAN
    },

})

// sincroniazando as models com o banco de dados (executar esta tabela apenas uma vez)
//Usuario.sync({ force: true });
  
module.exports = Usuario;