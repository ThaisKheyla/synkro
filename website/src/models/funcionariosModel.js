var database = require("../database/config");

function listarCargos() {
  var instrucao = "SELECT idCargo, nome FROM cargo ORDER BY nome;";
  return database.executar(instrucao);
}

function listarEmpresas() {
  var instrucao = "SELECT id, nomeEmpresarial FROM empresa WHERE statusAcesso = 3;";
  return database.executar(instrucao);
}

function buscarPorCpf(cpf) {
  var instrucao = `SELECT id FROM funcionario WHERE cpf = '${cpf}' LIMIT 1;`;
  return database.executar(instrucao);
}

function buscarPorEmail(email) {
  var instrucao = `SELECT id FROM funcionario WHERE email = '${email}' LIMIT 1;`;
  return database.executar(instrucao);
}

function cadastrarFuncionario(nome, email, cpf, dtnascimento, senha, fkCargo, fkEmpresa) {
  var instrucao = `
    INSERT INTO funcionario (nome, email, cpf, dtnascimento, senha, fkPerfilAtivo, fkCargo, fkEmpresa)
    VALUES ('${nome}', '${email}', '${cpf}', '${dtnascimento}', SHA2('${senha}',256), 1, ${fkCargo}, ${fkEmpresa});
  `;
  return database.executar(instrucao);
}

function listarPorEmpresa(idEmpresa) {
  var instrucao = `
    SELECT f.id, f.nome, f.email, c.nome AS cargo
    FROM funcionario f
    LEFT JOIN cargo c ON f.fkCargo = c.idCargo
    WHERE f.fkEmpresa = ${idEmpresa}
    ORDER BY f.nome;
  `;
  return database.executar(instrucao);
}

function obterFuncionario(idFuncionario) {
  var instrucao = `SELECT * FROM funcionario WHERE id = ${idFuncionario} LIMIT 1;`;
  return database.executar(instrucao);
}

function atualizarFuncionario(idFuncionario, campos) {
  const updates = [];
  if (campos.nome) updates.push(`nome = '${campos.nome}'`);
  if (campos.email) updates.push(`email = '${campos.email}'`);
  if (campos.cpf) updates.push(`cpf = '${campos.cpf}'`);
  if (campos.dtnascimento) updates.push(`dtnascimento = '${campos.dtnascimento}'`);
  if (typeof campos.fkCargo !== "undefined" && campos.fkCargo !== null) updates.push(`fkCargo = ${campos.fkCargo}`);
  if (updates.length === 0) return Promise.resolve();

  var instrucao = `
    UPDATE funcionario
    SET ${updates.join(", ")}
    WHERE id = ${idFuncionario};  
  `;
  return database.executar(instrucao);
}

function deletarFuncionario(idFuncionario) {
  var instrucao = `DELETE FROM funcionario WHERE id = ${idFuncionario};`;
  return database.executar(instrucao);
}

module.exports = {
  listarCargos,
  listarEmpresas,
  cadastrarFuncionario,
  buscarPorCpf,
  buscarPorEmail,
  listarPorEmpresa,
  obterFuncionario,
  atualizarFuncionario,
  deletarFuncionario
};
