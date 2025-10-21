var mainframesModel = require("../models/mainframesModel");

function listarSetores(req, res) {
  mainframesModel.listarSetores()
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => {
      console.error("Erro ao listar setores:", erro);
      res.status(500).json(erro);
    });
}

function listarSistemas(req, res) {
  mainframesModel.listarSistemas()
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => {
      console.error("Erro ao listar sistemas:", erro);
      res.status(500).json(erro);
    });
}

function listarComponentes(req, res) {
  mainframesModel.listarComponentes()
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => {
      console.error("Erro ao listar componentes:", erro);
      res.status(500).json(erro);
    });
}

 function cadastrarMainframe(req, res) {
  try {
    const { fabricante, modelo, mac, setor, sistema, metricas } = req.body;
    const fkEmpresa = req.usuario.fkEmpresa; 

    const idSetor =  mainframesModel.obterOuCriarSetor(setor);
    const idSistema =  mainframesModel.obterOuCriarSistema(sistema);

    const idMainframe =  mainframesModel.inserirMainframe(
      fabricante,
      modelo,
      mac,
      fkEmpresa,
      idSetor,
      idSistema
    );

    for (const m of metricas) {
      const idMetrica =  mainframesModel.inserirMetrica(m.min, m.max, m.descricao);
       mainframesModel.vincularComponenteMainframe(m.fkComponente, idMainframe);
       mainframesModel.atualizarComponenteMetrica(m.fkComponente, idMetrica);
    }

    res.status(201).json({ msg: "Mainframe e métricas cadastrados com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar mainframe:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar mainframe." });
  }
}

function listarMainframes(req, res) {
  mainframesModel.listarMainframes()
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => {
      console.error("Erro ao listar mainframes:", erro);
      res.status(500).json(erro);
    });
}

module.exports = {
  listarSetores,
  listarSistemas,
  listarComponentes,
  cadastrarMainframe,
  listarMainframes
};
