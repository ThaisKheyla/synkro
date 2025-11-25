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
se.nome AS setor,
se.localizacao AS localizacao,
COALESCE(c.nome, 'N/A') AS componente,
COALESCE(a.valor_coletado, 0.00) AS valor_coletado,
COALESCE(g.descricao, 'Normal') AS gravidade,
COALESCE(t.descricao, 'N/A') AS tipo_metrica,
COALESCE(me.max, 0.00) AS max_alerta_valor
FROM mainframe m
JOIN setor se ON m.fkSetor = se.id
LEFT JOIN (
    SELECT
        me_inner.fkMainframe,
        MIN(g_inner.id) AS id_gravidade_maxima,
        (
            SELECT a_max.id
            FROM alerta a_max
            JOIN metrica me_max ON a_max.fkMetrica = me_max.id
            JOIN gravidade g_max ON a_max.fkGravidade = g_max.id
            WHERE me_max.fkMainframe = me_inner.fkMainframe
            AND g_max.id = MIN(g_inner.id)
            ORDER BY a_max.dt_hora DESC
            LIMIT 1
        ) AS max_alerta_id
    FROM alerta a_inner
    JOIN metrica me_inner ON a_inner.fkMetrica = me_inner.id
    JOIN gravidade g_inner ON a_inner.fkGravidade = g_inner.id
    GROUP BY me_inner.fkMainframe
) AS alerta_critico ON m.id = alerta_critico.fkMainframe
LEFT JOIN alerta a ON a.id = alerta_critico.max_alerta_id
LEFT JOIN metrica me ON a.fkMetrica = me.id
LEFT JOIN componente c ON me.fkComponente = c.id
LEFT JOIN gravidade g ON a.fkGravidade = g.id
LEFT JOIN tipo t ON me.fkTipo = t.id
WHERE se.fkEmpresa = 1
ORDER BY m.id;
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

function buscarStatusComponentes(fkEmpresa) {
  console.log("ACESSEI O MAINFRAME MODEL \n \n Executando a função buscarStatusComponentes()...", fkEmpresa);

  var instrucaoSql = `
        SELECT
            m.id AS idMainframe,
            comp.nome AS nomeComponente,
            COALESCE(a.valor_coletado, me.min) AS valor,
            COALESCE(g.descricao, 'Normal') AS status
        FROM mainframe m
        JOIN setor s ON m.fkSetor = s.id
        JOIN metrica me ON m.id = me.fkMainframe
        JOIN componente comp ON me.fkComponente = comp.id
        LEFT JOIN alerta a ON me.id = a.fkMetrica 
        LEFT JOIN gravidade g ON a.fkGravidade = g.id
        WHERE s.fkEmpresa = ${fkEmpresa}
        AND
            (a.id IS NULL OR a.id = (
                SELECT a2.id
                FROM alerta a2
                JOIN metrica me2 ON a2.fkMetrica = me2.id
                JOIN gravidade g2 ON a2.fkGravidade = g2.id
                WHERE me2.fkMainframe = m.id 
                AND me2.fkComponente = comp.id
                ORDER BY g2.id ASC, a2.id DESC -- Prioriza g2.id ASC (Emergência=1) e depois a2.id DESC
                LIMIT 1
            ))
        AND m.id IN (
            SELECT DISTINCT m3.id
            FROM mainframe m3
            JOIN metrica me3 ON m3.id = me3.fkMainframe
            JOIN alerta a3 ON me3.id = a3.fkMetrica
            JOIN gravidade g3 ON a3.fkGravidade = g3.id
            WHERE m3.fkSetor IN (SELECT id FROM setor WHERE fkEmpresa = ${fkEmpresa})
            AND g3.descricao IN ('Urgente', 'Muito Urgente', 'Emergência')
        )
        ORDER BY
            m.id, comp.nome DESC;
    `;

  return database.executar(instrucaoSql);
}

// ======================================================
// NOVAS FUNÇÕES PARA A DASHBOARD DE ALERTAS
// ======================================================

/**
 * 1. Ranking dos Mainframes com mais Alertas (Alta Gravidade - Top 5)
 * @param {number} fkEmpresa O ID da empresa logada.
 */
function buscarRankingAlertas(fkEmpresa) {
  console.log("Acessando o model: buscarRankingAlertas");
  // Consulta otimizada para a lista: Agrega todos os alertas de alta prioridade.
  const instrucaoSql = `
        SELECT
            m.id AS idMainframe,
            m.modelo AS nomeMainframe,
            s.nome AS setor,
            COUNT(a.id) AS alertas
        FROM alerta a
        JOIN metrica me ON a.fkMetrica = me.id
        JOIN gravidade g ON a.fkGravidade = g.id
        JOIN mainframe m ON me.fkMainframe = m.id
        JOIN setor s ON m.fkSetor = s.id
        WHERE
            s.fkEmpresa = ${fkEmpresa} AND
            g.descricao IN ('Emergência', 'Muito Urgente', 'Urgente')
        GROUP BY m.id, m.modelo, s.nome
        ORDER BY alertas DESC
        LIMIT 5;
    `;
  return database.executar(instrucaoSql);
}

/**
 * 2. Busca Status Geral e KPIs (Total de Mainframes e Mainframes com Alerta)
 * Retorna um único objeto com os dois KPIs.
 * @param {number} fkEmpresa O ID da empresa logada.
 */
function buscarStatusGeralEKPIs(fkEmpresa) {
  console.log("Acessando o model: buscarStatusGeralEKPIs");
  const instrucaoSql = `
        SELECT
            (SELECT COUNT(m1.id) FROM mainframe m1
             JOIN setor s1 ON m1.fkSetor = s1.id
             WHERE s1.fkEmpresa = ${fkEmpresa}) AS totalMainframes,
            (SELECT COUNT(DISTINCT m2.id) FROM alerta a
             JOIN metrica me ON a.fkMetrica = me.id
             JOIN mainframe m2 ON me.fkMainframe = m2.id
             JOIN setor s2 ON m2.fkSetor = s2.id
             JOIN gravidade g ON a.fkGravidade = g.id
             WHERE s2.fkEmpresa = ${fkEmpresa} AND g.descricao IN ('Emergência', 'Muito Urgente', 'Urgente')) AS mainframesComAlerta;
    `;
  return database.executar(instrucaoSql);
}

/**
 * 3. Busca a lista detalhada de alertas para UM mainframe.
 * @param {number} idMainframe O ID do mainframe.
 */
function buscarAlertasPorMainframe(idMainframe) {
  console.log("Acessando o model: buscarAlertasPorMainframe");
  const instrucaoSql = `
        SELECT
            a.id AS idAlerta,
            me.nome AS metrica,
            a.valor_coletado AS valor,
            g.descricao AS gravidade,
            DATE_FORMAT(a.data_alerta, '%d/%m/%Y %H:%i:%s') AS dataHora
        FROM alerta a
        JOIN metrica me ON a.fkMetrica = me.id
        JOIN gravidade g ON a.fkGravidade = g.id
        JOIN mainframe m ON me.fkMainframe = m.id
        WHERE m.id = ${idMainframe}
        ORDER BY a.data_alerta DESC
        LIMIT 50; -- Limita para não sobrecarregar
    `;
  return database.executar(instrucaoSql);
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
  buscarStatusComponentes,
  contarAlertasPorMainframe,
  buscarRankingAlertas,
  buscarStatusGeralEKPIs,
  buscarAlertasPorMainframe
};
