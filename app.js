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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//rotas 

app.get('/', function (req, res) {
  res.render('index');
});

app.get("/login", function (req, res) {
  res.render("login")
});

//rotas de cadastro

app.get("/cadastro", function (req, res) {
  res.render("formulario")
});

app.get('/cadastroFilme', async (req, res) => {
  try {

    const categorias = await Categoria.findAll({ where: { excluido: false } });
    const categoriasJSON = categorias.map(categoria => categoria.get({ plain: true }));
    res.render('filmeForm', { categorias: categoriasJSON });

  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).send('Erro interno do servidor');
  }

});

app.get('/cadastroCategoria', (req, res) => {
  res.render('novaCategoriaForm');
});

//rotas de listagem


app.get('/filme', async (req, res) => {
  try {
    const filmes = await Filme.findAll();
    const filmesJSON = filmes.map(filme => filme.get({ plain: true }));
    res.render('listaFilmes', { filmes: filmesJSON });
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.get('/categoria', async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ where: { excluido: false } });
    const categoriasJSON = categorias.map(categoria => categoria.get({ plain: true }));
    res.render('listaCategorias', { categorias: categoriasJSON });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).send('Erro interno do servidor');
  }

})

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
    categoriaFilme: req.body.categoriaFilme,
    anoFilme: req.body.anoFilme,
    descricaoFilme: req.body.descricaoFilme,
    excluido: false,
  }).then(function () {
    res.redirect("/");
  }).catch(function (erro) {
    res.send("Erro ao cadastrar filme: " + erro);
  });
});

app.post('/nova-categoria', async (req, res) => {
  const { genero, descricao, idUsuarioAtualizacao } = req.body;
  try {
    // Cria uma nova categoria no banco de dados
    const novaCategoria = await Categoria.create({
      genero,
      descricao,
      excluido: false,
      idUsuarioAtualizacao
    });
    res.redirect('/categorias'); // Redireciona após a criação da categoria
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).send('Erro ao criar categoria');
  }
});


app.listen(8081, function () {
  console.log("http://localhost:8081/")
});

