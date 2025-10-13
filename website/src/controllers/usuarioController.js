var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  console.log("🚀 Entrando em usuarioController.autenticar");

  const { emailServer: email, senhaServer: senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send("Preencha todos os campos!");
  }

  usuarioModel.autenticar(email, senha)
    .then(resultado => {
      console.log(`🔍 Resultados encontrados: ${resultado.length}`);

      if (resultado.length === 1) {
        const usuario = resultado[0];

        // 🔒 Validação de acesso
        if (usuario.perfilAtivo !== 1) {
          return res.status(403).send("Perfil inativo! Entre em contato com o administrador.");
        }

        if (usuario.statusEmpresa !== 3) {
          return res.status(403).send("A empresa ainda não foi aprovada pela Synkro.");
        }

        // 🔄 Retorno completo
        return res.json({
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cargo: usuario.cargo,
          empresa: usuario.empresa
        });

      } else if (resultado.length === 0) {
        res.status(403).send("Email e/ou senha inválido(s)");
      } else {
        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
      }
    })
    .catch(erro => {
      console.error("❌ Erro ao autenticar:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
  const { nomeServer: nome, emailServer: email, senhaServer: senha, idEmpresaVincularServer: fkEmpresa } = req.body;

  if (!nome || !email || !senha || !fkEmpresa) {
    return res.status(400).send("Preencha todos os campos!");
  }

  usuarioModel.cadastrar(nome, email, senha, fkEmpresa)
    .then(resultado => res.json(resultado))
    .catch(erro => {
      console.error("❌ Erro ao cadastrar:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  autenticar,
  cadastrar
};