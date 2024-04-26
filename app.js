const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// Importando os models
const Usuario = require('./models/Usuario');
const Filme = require('./models/Filme');
const Categoria = require('./models/Categoria');

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


//rotas 
app.get("/cadastro", function (req, res) {
  res.render("formulario")
});
app.get("/cadastroFilme", function (req, res) {
  res.render("filmeForm")
});

app.get("/login", function (req, res) {
  res.render("login")
});
app.get('/', function (req, res) {
  res.render('index');
});

//enviando dados do formulario
app.post('/criaUsuario', function (req, res) {
  Usuario.create({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    excluido: false,
  }).then(function () {
    res.redirect("/login");
  }).catch(function (erro) {
    res.send("Erro ao cadastrar usuário: " + erro);
  });
});

app.post('/criaFilme', function (req, res) {
  Filme.create({
    nomeFilme: req.body.nomeFilme,
    generoFilme: req.body.generoFilme,
    anoFilme: req.body.anoFilme,
    descricaoFilme: req.body.descricaoFilme,
    excluido: false,
  }).then(function () {
    res.redirect("/");
  }).catch(function (erro) {
    res.send("Erro ao cadastrar filme: " + erro);
  });
});

app.post('/criaCategoria', function (req, res) {  
  Categoria.create({
    genero: req.body.genero,
    descricao: req.body.descricao,
    excluido: false,
  }).then(function () {
    res.redirect("/");
  }).catch(function (erro) {
    res.send("Erro ao cadastrar categoria: " + erro);
  });
}
);


app.listen(8081, function () {
  console.log("http://localhost:8081/")
});

