// Defina o ambiente: 'desenvolvimento' ou 'producao'
// var ambiente_processo = 'desenvolvimento';
var ambiente_processo = 'producao';

// Caminho do arquivo .env
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

const express = require("express");
const cors = require("cors");
const path = require("path");

const PORTA_APP = process.env.APP_PORT || 8000;
const HOST_APP = process.env.APP_HOST || "localhost";

const app = express();

const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuarios");
const empresasRouter = require("./src/routes/empresas");
const cadastroEmpresaRouter = require("./src/routes/cadastroEmpresa");
const aceitarEmpresasRouter = require("./src/routes/aceitarEmpresas");
const mainframesRouter = require("./src/routes/mainframes");
const funcionariosRouter = require("./src/routes/funcionarios");
const empresaDetalhadaRouter = require("./src/routes/empresaDetalhada");
const csvRouter = require("./src/routes/csv");
const dashboardRouter = require("./src/routes/dashboard");

const s3Router = require('./src/routes/s3Route');
app.use('/', s3Router);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresas", empresasRouter);
app.use("/cadastroEmpresa", cadastroEmpresaRouter);
app.use("/aceitarEmpresas", aceitarEmpresasRouter);
app.use("/mainframes", mainframesRouter);
app.use("/funcionarios", funcionariosRouter);
app.use("/empresa", empresaDetalhadaRouter);
app.use("/csv", csvRouter);
app.use("/dashboard", dashboardRouter);

app.listen(PORTA_APP, () => {
  console.log(`
  ##########################################################
  Servidor rodando em: http://${HOST_APP}:${PORTA_APP}
  Ambiente: ${process.env.AMBIENTE_PROCESSO || ambiente_processo}
  
  -> Se estiver em desenvolvimento, conectando ao banco local
  -> Se estiver em produção, conectando ao banco remoto
  ##########################################################
  `);
});
