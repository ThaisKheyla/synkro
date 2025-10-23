var funcionarioModel = require("../models/funcionariosModel");

function listarCargos(req, res) {
  funcionarioModel.listarCargos()
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => {
      console.error("Erro ao listar cargos:", erro);
      res.status(500).json(erro);
    });
}

function listarEmpresas(req, res) {
  funcionarioModel.listarEmpresas()
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => {
      console.error("Erro ao listar empresas:", erro);
      res.status(500).json(erro);
    });
}

function cadastrarFuncionario(req, res) {

  
    const fkEmpresa = req.usuario.fkEmpresa;
  try {
    const { nome, email, cpf, dtnascimento, senha, fkCargo } = req.body;
    if (!req.usuario || !req.usuario.fkEmpresa) {
      return res.status(401).json({ mensagem: "Usuário não autenticado ou empresa não encontrada." });
    }

    if (!nome || !email || !cpf || !dtnascimento || !senha || !fkCargo) {
      return res.status(400).json({ mensagem: "Campos obrigatórios ausentes." });
    }

    funcionarioModel.cadastrarFuncionario(nome, email, cpf, dtnascimento, senha, fkCargo, fkEmpresa);
    res.status(201).json({ mensagem: "Funcionário cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar funcionário:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar funcionário." });
  }
}

module.exports = {
  listarCargos,
  listarEmpresas,
  cadastrarFuncionario
};
