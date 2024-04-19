const Usuario = sequelize.define('usuario',{
    nome:{
        type:Sequelize.STRING,
        unique:true,
    },
    email:{
        type:Sequelize.STRING,
        unique:true,        
    },
    senha:{
        type:Sequelize.STRING
    },
    excluido:{
        type:Sequelize.BOOLEAN
    },

})

// sincroniazando as models com o banco de dados

// Usuario.sync({ force: true });
// Filmes.sync({ force: true });
// FilmesGenero.sync({ force: true });


function criarUsuario(nome,email,senha){
    Usuario.create({
        nome:nome,
        email:email,
        senha:senha
    });
}

criarUsuario("admin","admin@email","root");
