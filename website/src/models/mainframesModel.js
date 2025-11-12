var database = require("../database/config");

// ===== LISTAGENS =====
function listarSetores(idEmpresa) {
  var instrucao = `SELECT id, nome, localizacao FROM setor WHERE fkEmpresa = ${idEmpresa} ORDER BY nome;`;
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
function cadastrarSetor(nome, localizacao, idEmpresa) {
  var instrucao = `INSERT INTO setor (nome, localizacao, fkEmpresa) VALUES ('${nome}', '${localizacao}', ${idEmpresa});`;
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
async function obterOuCriarSetor(nome, idEmpresa) {
  const existe = await database.executar(`SELECT id FROM setor WHERE id = '${nome}' AND fkEmpresa = ${idEmpresa};`);
  if (existe.length > 0) return existe[0].id;

  const novo = await database.executar(`INSERT INTO setor (nome, localizacao, fkEmpresa) VALUES ('${nome}', 'Mainframe', ${idEmpresa});`);
  return novo.insertId;
}

async function obterOuCriarSistema(nome) {
  const existe = await database.executar(`SELECT id FROM sistema_operacional WHERE id = '${nome}';`);
  if (existe.length > 0) return existe[0].id;

  const novo = await database.executar(`INSERT INTO sistema_operacional (nome) VALUES ('${nome}');`);
  return novo.insertId;
}

// ===== INSERÇÃO DE MAINFRAME =====
async function inserirMainframe(fabricante, modelo, mac, fkSetor, fkSistemaOperacional) {
  const instrucao = `
    INSERT INTO mainframe (fabricante, modelo, macAdress, fkSetor, fkSistemaOperacional)
    VALUES ('${fabricante}', '${modelo}', '${mac}', ${fkSetor}, ${fkSistemaOperacional});
  `;
  const resultado = await database.executar(instrucao);
  return resultado.insertId;
}

// ===== INSERÇÃO DE MÉTRICA (CORRIGIDA) =====
async function inserirMetrica(descricao, min, max, fkComponente, fkTipo, mac) {
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
    INSERT INTO metrica (id, fkComponente, min, max, fkTipo, fkMainframe)
    VALUES (${novoId}, ${fkComponente}, ${min}, ${max}, ${fkTipo}, 
    (SELECT id FROM mainframe WHERE macAdress = '${mac}'));
  `;

  const resposta = await database.executar(instrucao);
  return resposta.insertId || novoId;
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
    WHERE se.fkEmpresa = ${idEmpresa}
    ORDER BY m.id;
  `;
  return database.executar(instrucao);
}

function visaoGeralPorEmpresa(idEmpresa) {
  const instrucao = `
    SELECT
        m.id,
        m.macAdress,
        se.nome AS setor,
        se.localizacao AS localizacao,
        c.nome AS componente,
        a.valor_coletado,
        g.descricao AS gravidade
    FROM alerta a
    JOIN metrica me ON a.fkMetrica = me.id
    JOIN mainframe m ON me.fkMainframe = m.id
    JOIN gravidade g ON a.fkGravidade = g.id
    JOIN componente c ON me.fkComponente = c.id
    JOIN setor se ON m.fkSetor = se.id
    INNER JOIN (
        SELECT
            me_inner.fkMainframe,
            MAX(a_inner.valor_coletado) AS max_valor
        FROM alerta a_inner
        JOIN metrica me_inner ON a_inner.fkMetrica = me_inner.id
        JOIN mainframe m_inner ON me_inner.fkMainframe = m_inner.id
        JOIN setor se_inner ON m_inner.fkSetor = se_inner.id
        WHERE se_inner.fkEmpresa = ${idEmpresa}
        GROUP BY me_inner.fkMainframe
        ) AS max_alertas ON m.id = max_alertas.fkMainframe
            AND a.valor_coletado = max_alertas.max_valor
    WHERE se.fkEmpresa = ${idEmpresa}
    ORDER BY m.id, a.valor_coletado ASC;
  `;
  return database.executar(instrucao);
}

function contarAlertasPorMainframe(idEmpresa) {
    const instrucao = `
        SELECT
            m.id AS idMainframe,
            m.modelo AS nomeMainframe,
            g.descricao AS gravidade,
            COUNT(a.id) AS qtdAlertas
        FROM alerta a
        JOIN metrica me ON a.fkMetrica = me.id
        JOIN mainframe m ON me.fkMainframe = m.id
        JOIN gravidade g ON a.fkGravidade = g.id
        JOIN setor se ON m.fkSetor = se.id
        WHERE se.fkEmpresa = ${idEmpresa}
          AND g.descricao IN ('Emergência', 'Muito Urgente', 'Urgente')
        GROUP BY m.id, m.modelo, g.descricao
        ORDER BY m.id, FIELD(g.descricao, 'Emergência', 'Muito Urgente', 'Urgente');
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
  listarMainframes,
  visaoGeralPorEmpresa,
  listarPorEmpresa,
  contarAlertasPorMainframe
};
