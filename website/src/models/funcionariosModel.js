var database = require("../database/config");

function listarCargos() {
  var instrucao = "SELECT idCargo, nome FROM cargo ORDER BY nome;";
  return database.executar(instrucao);
}

function listarEmpresas() {
  var instrucao = "SELECT id, nomeEmpresarial FROM empresa WHERE statusAcesso = 3;";
  return database.executar(instrucao);
}

function cadastrarFuncionario(nome, email, cpf, dtnascimento, senha, fkCargo, fkEmpresa) {
  var instrucao = `
    INSERT INTO funcionario (nome, email, cpf, dtnascimento, senha, fkPerfilAtivo, fkCargo, fkEmpresa)
    VALUES ('${nome}', '${email}', '${cpf}', '${dtnascimento}', SHA2('${senha}',256), 1, ${fkCargo}, ${fkEmpresa});
  `;
  return database.executar(instrucao);
}

module.exports = {
  listarCargos,
  listarEmpresas,
  cadastrarFuncionario
};
