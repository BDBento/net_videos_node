const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

// Define o diretório 'public' como o diretório para arquivos estáticos
app.use(express.static('public'));



//configuracao do handlebars
//template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//configuracao do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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


//enviando dados do formulario
app.post('/criaUsuario', function (req, res) {
  req.body.nome;
  req.body.email;
  req.body.senha;
  res.send("Usuario criado com sucesso")
  res.redirect('/login');
});


app.listen(8081, function () {
  console.log("http://localhost:8081/")
});

