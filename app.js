const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const session = require('express-session'); // Importe o express-session
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const Sequelize = require('sequelize');

const sequelize = new Sequelize("filmes", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/private');
const auth = require('./middleware/auth');

// Importando os models
const Usuario = require('./models/Usuario');
const Filme = require('./models/Filme');
const Categoria = require('./models/Categoria');

// Configurando o express
const app = express();

// Configurando o Handlebars como motor de visualização
app.engine('handlebars', exphbs({
  defaultLayout: 'main', // Layout padrão
  layoutsDir: path.join(__dirname, 'views/layouts'), // Diretório dos layouts
  partialsDir: path.join(__dirname, 'views/partials') // Diretório dos partials
}));
app.set('view engine', 'handlebars');

// Configurando o diretório público para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurando o BodyParser para analisar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurando sessões
app.use(session({
  secret: 'sua_chave_secreta', // Defina sua chave secreta
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize // Supondo que você já configurou o Sequelize corretamente
  })
}));

// Rotas públicas
app.use('/auth', authRoutes);

// Rotas privadas (necessitam autenticação)
app.use('/private', auth, privateRoutes);


// Rotas que necessitam de autenticação
app.use('/cadastroFilme', auth, (req, res, next) => {
  // Se o usuário estiver autenticado, permita o acesso
  next();
}, (req, res) => {
  res.render('novoFilme');
});



//configuracao do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const extensao = path.extname(file.originalname); // Obtém a extensão do arquivo original
    const nomeArquivo = file.fieldname + '-' + Date.now() + extensao; // Nome único do arquivo
    cb(null, nomeArquivo);
  }
})
const upload = multer({ storage: storage });


//rotas 

app.get('/', async (req, res) => {
  try {
    const filmes = await Filme.findAll({ where: { excluidoFilme: false } });
    const filmesJSON = filmes.map(filme => filme.get({ plain: true }));
    res.render('index', { filmes: filmesJSON });
  }catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).send('Erro interno do servidor');
  }
});


//rotas de cadastro

app.get("/cadastro", function (req, res) {
  res.render("formulario")
});

app.get("/login", function (req, res) {
  res.render("login")
}
);

app.get('/cadastroFilme' ,auth, async (req, res) => {
  try {

    const categorias = await Categoria.findAll({ where: { excluido: false } });
    const categoriasJSON = categorias.map(categoria => categoria.get({ plain: true }));
    res.render('novoFilme', { categorias: categoriasJSON });

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
    const filmes = await Filme.findAll({ where: { excluidoFilme: false } });
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


app.post('/criaFilme', upload.single('imagemFilme'), async (req, res) => {
  try {
    const { nomeFilme, categoriaFilme, anoFilme, descricaoFilme } = req.body;
    let fileFilme = '';
    if (req.file) {
      fileFilme = req.file.filename;
    }
    await Filme.create({
      nomeFilme: nomeFilme,
      categoriaFilme: categoriaFilme,
      fileFilme: fileFilme,
      anoFilme: anoFilme,
      descricaoFilme: descricaoFilme,
      excluidoFilme: false,
    });
    res.redirect("/filme");
  } catch (error) {
    console.error('Erro ao cadastrar filme:', error);
    res.send("Erro ao cadastrar filme: " + error.message);
  }
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
    res.redirect('/categoria'); // Redireciona após a criação da categoria
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).send('Erro ao criar categoria');
  }
});

app.post('/deletarCategoria', async (req, res) => {
  const { id } = req.body;
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).send('Categoria não encontrada');
    }
    categoria.excluido = true;
    await categoria.save();
    // Redireciona para a página de categorias após a exclusão da categoria
    res.redirect('/categoria');
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    res.status(500).send('Erro ao excluir categoria');
  }
});

app.post('/deletarFilme', async (req, res) => {
  const { id } = req.body;
  try {
    const filme = await Filme.findByPk(id);
    if (!filme) {
      return res.status(404).send('Filme não encontrado');
    }
    filme.excluidoFilme = true;
    await filme.save();
    // Redireciona para a página de filmes após a exclusão do filme
    res.redirect('/filme');
  } catch (error) {
    console.error('Erro ao excluir filme:', error);
    res.status(500).send('Erro ao excluir filme');
  }
});


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

