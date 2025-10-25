var database = require("../database/config");

// ===== LISTAGENS =====
function listarSetores() {
  var instrucao = `SELECT id, nome FROM setor ORDER BY nome;`;
  return database.executar(instrucao);
}

function listarSistemas() {
  var instrucao = `SELECT id, nome FROM sistema_operacional ORDER BY nome;`;
  return database.executar(instrucao);
}

function listarComponentes() {
  var instrucao = `SELECT id, nome FROM componente ORDER BY nome;`;
  return database.executar(instrucao);
}

function listarTipos() {
  var instrucao = `SELECT id, descricao FROM tipo ORDER BY id;`;
  return database.executar(instrucao);
}

// ===== CADASTROS SIMPLES =====
function cadastrarSetor(nome) {
  var instrucao = `INSERT INTO setor (nome) VALUES ('${nome}');`;
  return database.executar(instrucao);
}

function cadastrarSistema(nome) {
  var instrucao = `INSERT INTO sistema_operacional (nome) VALUES ('${nome}');`;
  return database.executar(instrucao);
}

function cadastrarComponente(nome) {
  var instrucao = `INSERT INTO componente (nome) VALUES ('${nome}');`;
  return database.executar(instrucao);
}

function cadastrarTipo(descricao) {
  var instrucao = `INSERT INTO tipo (descricao) VALUES ('${descricao}');`;
  return database.executar(instrucao);
}

// ===== OBTÉM OU CRIA REGISTROS =====
async function obterOuCriarSetor(nome) {
  const existe = await database.executar(`SELECT id FROM setor WHERE nome = '${nome}' LIMIT 1;`);
  if (existe.length > 0) return existe[0].id;

  const novo = await database.executar(`INSERT INTO setor (nome) VALUES ('${nome}');`);
  return novo.insertId;
}

async function obterOuCriarSistema(nome) {
  const existe = await database.executar(`SELECT id FROM sistema_operacional WHERE nome = '${nome}' LIMIT 1;`);
  if (existe.length > 0) return existe[0].id;

  const novo = await database.executar(`INSERT INTO sistema_operacional (nome) VALUES ('${nome}');`);
  return novo.insertId;
}

// ===== INSERÇÃO DE MAINFRAME =====
async function inserirMainframe(fabricante, modelo, mac, fkEmpresa, fkSetor, fkSistemaOperacional) {
  const instrucao = `
    INSERT INTO mainframe (fabricante, modelo, macAdress, fkEmpresa, fkSetor, fkSistemaOperacional)
    VALUES ('${fabricante}', '${modelo}', '${mac}', ${fkEmpresa}, ${fkSetor}, ${fkSistemaOperacional});
  `;
  const resultado = await database.executar(instrucao);
  return resultado.insertId;
}

// ===== INSERÇÃO DE MÉTRICA (CORRIGIDA) =====
async function inserirMetrica(descricao, min, max, fkComponente, fkTipo) {
  // Primeiro busca o maior ID atual para o componente
  const consultaId = `
    SELECT IFNULL(MAX(id), 0) + 1 AS novoId
    FROM metrica
    WHERE fkComponente = ${fkComponente};
  `;
  
  const resultado = await database.executar(consultaId);
  const novoId = resultado[0].novoId;

  // Depois insere com o ID calculado
  const instrucao = `
    INSERT INTO metrica (id, fkComponente, min, max, fkTipo)
    VALUES (${novoId}, ${fkComponente}, ${min}, ${max}, ${fkTipo});
  `;
  
  const resposta = await database.executar(instrucao);
  return resposta.insertId || novoId;
}

// ===== VÍNCULO ENTRE COMPONENTE E MAINFRAME =====
async function vincularComponenteMainframe(fkComponente, fkMainframe, fkMetrica) {
  const instrucao = `
    INSERT INTO componente_mainframe (fkComponente, fkMainframe, fkMetrica)
    VALUES (${fkComponente}, ${fkMainframe}, ${fkMetrica});
  `;
  return database.executar(instrucao);
}

// ===== LISTAGENS DE MAINFRAME =====
function listarMainframes() {
  const instrucao = `
    SELECT 
      m.id,
      m.fabricante,
      m.modelo,
      s.nome AS sistema,
      se.nome AS setor,
      e.nomeEmpresarial AS empresa
    FROM mainframe m
    JOIN sistema_operacional s ON m.fkSistemaOperacional = s.id
    JOIN setor se ON m.fkSetor = se.id
    JOIN empresa e ON m.fkEmpresa = e.id
    ORDER BY m.id;
  `;
  return database.executar(instrucao);
}

function listarPorEmpresa(idEmpresa) {
  const instrucao = `
    SELECT 
      m.id,
      m.fabricante,
      m.modelo,
      s.nome AS sistema,
      se.nome AS setor
    FROM mainframe m
    JOIN sistema_operacional s ON m.fkSistemaOperacional = s.id
    JOIN setor se ON m.fkSetor = se.id
    WHERE m.fkEmpresa = ${idEmpresa}
    ORDER BY m.id;
  `;
  return database.executar(instrucao);
}

// ===== EXPORTA TODAS AS FUNÇÕES =====
module.exports = {
  listarSetores,
  listarSistemas,
  listarComponentes,
  listarTipos,
  cadastrarSetor,
  cadastrarSistema,
  cadastrarComponente,
  cadastrarTipo,
  obterOuCriarSetor,
  obterOuCriarSistema,
  inserirMainframe,
  inserirMetrica,
  vincularComponenteMainframe,
  listarMainframes,
  listarPorEmpresa
};
