var database = require("../database/config");

function autenticar(email, senha) {
  console.log(`
  📡 Entrando em usuarioModel.autenticar()
  E-mail: ${email}
  >> Se ocorrer "ECONNREFUSED", verifique o MySQL e o .env
  `);

  const instrucaoSql = `
    SELECT 
      f.id,
      f.nome,
      f.email,
      f.fkCargo AS cargo,
      e.nomeEmpresarial AS empresa,
      f.fkPerfilAtivo AS perfilAtivo,
      e.statusAcesso AS statusEmpresa
    FROM funcionario AS f
      JOIN empresa AS e ON f.fkEmpresa = e.id
    WHERE f.email = '${email}'
      AND f.senha = SHA2('${senha}', 256)
    LIMIT 1;
  `;

  console.log("🧾 Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, fkEmpresa) {
  console.log(`
  📡 Entrando em usuarioModel.cadastrar()
  Nome: ${nome}
  E-mail: ${email}
  fkEmpresa: ${fkEmpresa}
  `);

  const instrucaoSql = `
    INSERT INTO funcionario 
      (nome, email, cpf, dtnascimento, senha, fkPerfilAtivo, fkCargo, fkEmpresa)
    VALUES 
      ('${nome}', '${email}', '000.000.000-00', CURDATE(), 
      SHA2('${senha}', 256), 1, 2, ${fkEmpresa});
  `;

  console.log("🧾 Executando SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  autenticar,
  cadastrar
};