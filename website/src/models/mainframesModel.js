var database = require("../database/config");

function listarSetores() {
  var instrucao = `SELECT * FROM setor ORDER BY nome;`;
  return database.executar(instrucao);
}

function listarSistemas() {
  var instrucao = `SELECT * FROM sistema_operacional ORDER BY nome;`;
  return database.executar(instrucao);
}

function listarComponentes() {
  var instrucao = `SELECT id, nome FROM componente ORDER BY id;`;
  return database.executar(instrucao);
}

 function obterOuCriarSetor(nome) {
  const existe = database.executar(`SELECT id FROM setor WHERE nome = '${nome}' LIMIT 1;`);
  if (existe.length > 0) return existe[0].id;

  const novo = database.executar(`INSERT INTO setor (nome) VALUES ('${nome}');`);
  return novo.insertId;
}

 function obterOuCriarSistema(nome) {
  const existe = database.executar(`SELECT id FROM sistema_operacional WHERE nome = '${nome}' LIMIT 1;`);
  if (existe.length > 0) return existe[0].id;

  const novo = database.executar(`INSERT INTO sistema_operacional (nome) VALUES ('${nome}');`);
  return novo.insertId;
}

 function inserirMainframe(fabricante, modelo, mac, fkEmpresa, fkSetor, fkSistemaOperacional) {
  const instrucao = `
    INSERT INTO mainframe (fabricante, modelo, macAdress, fkEmpresa, fkSetor, fkSistemaOperacional)
    VALUES ('${fabricante}', '${modelo}', '${mac}', ${fkEmpresa}, ${fkSetor}, ${fkSistemaOperacional});
  `;
  const result = database.executar(instrucao);
  return result.insertId;
}

 function inserirMetrica(min, max, descricao) {
  const instrucao = `
    INSERT INTO metrica (min, max, descricao) VALUES (${min}, ${max}, '${descricao}');
  `;
  const result = database.executar(instrucao);
  return result.insertId;
}

 function vincularComponenteMainframe(fkComponente, fkMainframe) {
  const instrucao = `
    INSERT INTO componente_mainframe (fkComponente, fkMainframe)
    VALUES (${fkComponente}, ${fkMainframe});
  `;
 database.executar(instrucao);
}

 function atualizarComponenteMetrica(idComponente, idMetrica) {
  const instrucao = `
    UPDATE componente SET fkMetrica = ${idMetrica} WHERE id = ${idComponente};
  `;
 database.executar(instrucao);
}

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

module.exports = {
  listarSetores,
  listarSistemas,
  listarComponentes,
  obterOuCriarSetor,
  obterOuCriarSistema,
  inserirMainframe,
  inserirMetrica,
  vincularComponenteMainframe,
  atualizarComponenteMetrica,
  listarMainframes
};
