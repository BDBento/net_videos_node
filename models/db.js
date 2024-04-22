const Sequelize = require('sequelize');

//conecxao com o banco de dados
const sequelize = new Sequelize("filmes", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}