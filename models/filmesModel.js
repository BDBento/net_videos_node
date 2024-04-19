const Filmes = sequelize.define('filmes',{
    nome:{
        type:Sequelize.STRING
    },
    genero:{
        type:Sequelize.STRING
    },
    ano:{
        type:Sequelize.INTEGER
    },
    descricao:{
        type:Sequelize.STRING
    },
    excluido:{
        type:Sequelize.BOOLEAN
    },
    idUsuarioAtualizacao:{
        type:Sequelize.INTEGER
    },
})

// sincroniazando as models com o banco de dados

// Usuario.sync({ force: true });
// Filmes.sync({ force: true });
// FilmesGenero.sync({ force: true });
