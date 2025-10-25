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

async function cadastrarFuncionario(req, res) {
  try {
    let { nome, email, cpf, dtnascimento, senha, fkCargo, fkEmpresa } = req.body;

    if (!nome || !email || !cpf || !dtnascimento || !senha || !fkCargo) {
      return res.status(400).json({ mensagem: "Campos obrigatórios ausentes." });
    }

    const existeCpf = await funcionarioModel.buscarPorCpf(cpf);
    if (existeCpf.length > 0) {
      return res.status(409).json({ mensagem: "CPF já cadastrado." });
    }

    const existeEmail = await funcionarioModel.buscarPorEmail(email);
    if (existeEmail.length > 0) {
      return res.status(409).json({ mensagem: "Email já cadastrado." });
    }

    await funcionarioModel.cadastrarFuncionario(nome, email, cpf, dtnascimento, senha, fkCargo, fkEmpresa);
    res.status(201).json({ mensagem: "Funcionário cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar funcionário:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar funcionário." });
  }
}

async function listarPorEmpresa(req, res) {
  try {
    const { idEmpresa } = req.params;
    const resultado = await funcionarioModel.listarPorEmpresa(idEmpresa);
    res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao listar por empresa:", erro);
    res.status(500).json({ mensagem: "Erro ao listar funcionários." });
  }
}

async function obterFuncionario(req, res) {
  try {
    const { idFuncionario } = req.params;
    const resultado = await funcionarioModel.obterFuncionario(idFuncionario);
    if (!resultado || resultado.length === 0) return res.status(404).json({ mensagem: "Funcionário não encontrado." });
    res.status(200).json(resultado[0]);
  } catch (erro) {
    console.error("Erro ao obter funcionário:", erro);
    res.status(500).json({ mensagem: "Erro ao obter funcionário." });
  }
}

async function atualizarFuncionario(req, res) {
  try {
    const { idFuncionario } = req.params;
    const { nome, email, cpf, dtnascimento, fkCargo, statusAcesso } = req.body;

    if (!nome && !email && !cpf && !dtnascimento && !fkCargo && typeof statusAcesso === "undefined") {
      return res.status(400).json({ mensagem: "Nenhum campo para atualizar." });
    }

    if (cpf) {
      const existeCpf = await funcionarioModel.buscarPorCpf(cpf);
      if (existeCpf.length > 0 && existeCpf[0].id != idFuncionario) {
        return res.status(409).json({ mensagem: "CPF já cadastrado." });
      }
    }

    if (email) {
      const existeEmail = await funcionarioModel.buscarPorEmail(email);
      if (existeEmail.length > 0 && existeEmail[0].id != idFuncionario) {
        return res.status(409).json({ mensagem: "Email já cadastrado." });
      }
    }

    await funcionarioModel.atualizarFuncionario(idFuncionario, { nome, email, cpf, dtnascimento, fkCargo, statusAcesso });
    res.status(200).json({ mensagem: "Funcionário atualizado com sucesso." });
  } catch (erro) {
    console.error("Erro ao atualizar funcionário:", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar funcionário." });
  }
}

async function deletarFuncionario(req, res) {
  try {
    const { idFuncionario } = req.params;
    await funcionarioModel.deletarFuncionario(idFuncionario);
    res.status(200).json({ mensagem: "Funcionário removido com sucesso." });
  } catch (erro) {
    console.error("Erro ao deletar funcionário:", erro);
    res.status(500).json({ mensagem: "Erro ao deletar funcionário." });
  }
}

module.exports = {
  listarCargos,
  listarEmpresas,
  cadastrarFuncionario,
  listarPorEmpresa,
  obterFuncionario,
  atualizarFuncionario,
  deletarFuncionario
};
