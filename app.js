const express = require('express');
const exphbs = require('express-handlebars');


const app = express();
const Sequelize = require('sequelize');

// Define o diretório 'public' como o diretório para arquivos estáticos
app.use(express.static('public'));



//configuracao do handlebars
//template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



//conecxao com o banco de dados
const sequelize = new Sequelize("filmes", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
//rotas 
app.get("/cadastro", function (req, res) {
  res.render("formulario")
});
app.get("/login", function (req, res) {
  res.render("login")
});


app.get('/', function (req, res) {
  res.render('index');
});


app.listen(8081, function () {
  console.log("http://localhost:8081/")
});

