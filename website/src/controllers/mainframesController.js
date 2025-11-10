var mainframesModel = require("../models/mainframesModel");

function listarSetores(req, res) {
  const { idEmpresa } = req.params;
  mainframesModel.listarSetores(idEmpresa)
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

function listarTipos(req, res) {
  mainframesModel.listarTipos()
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => {
      console.error("Erro ao listar tipos:", erro);
      res.status(500).json(erro);
    });
}

async function cadastrarSetor(req, res) {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: "Nome do setor é obrigatório." });

    await mainframesModel.cadastrarSetor(nome);
    res.status(201).json({ mensagem: "Setor cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar setor:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar setor." });
  }
}

async function cadastrarSistema(req, res) {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: "Nome do sistema é obrigatório." });

    await mainframesModel.cadastrarSistema(nome);
    res.status(201).json({ mensagem: "Sistema operacional cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar sistema:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar sistema operacional." });
  }
}

async function cadastrarComponente(req, res) {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: "Nome do componente é obrigatório." });

    await mainframesModel.cadastrarComponente(nome);
    res.status(201).json({ mensagem: "Componente cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar componente:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar componente." });
  }
}

async function cadastrarTipo(req, res) {
  try {
    const { descricao } = req.body;
    if (!descricao) return res.status(400).json({ erro: "Descrição do tipo é obrigatória." });

    await mainframesModel.cadastrarTipo(descricao);
    res.status(201).json({ mensagem: "Tipo de métrica cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar tipo:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar tipo de métrica." });
  }
}

async function cadastrarMainframe(req, res) {
  try {
    const { fabricante, modelo, mac, setor, sistema, metricas } = req.body;
    const fkEmpresa = req.body.fkEmpresa || req.usuario?.fkEmpresa; // fallback seguro

    if (!fabricante || !modelo || !mac || !setor || !sistema || !fkEmpresa) {
      return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
    }

    const idSetor = await mainframesModel.obterOuCriarSetor(setor, fkEmpresa);
    const idSistema = await mainframesModel.obterOuCriarSistema(sistema);

    const idMainframe = await mainframesModel.inserirMainframe(
      fabricante,
      modelo,
      mac,
      idSetor,
      idSistema
    );

    for (const m of metricas) {
      const idMetrica = await mainframesModel.inserirMetrica(
        m.descricao,
        m.min,
        m.max,
        m.fkComponente,
        m.fkTipo,
        mac
      );
    }

    res.status(201).json({ mensagem: "✅ Mainframe e métricas cadastrados com sucesso!" });
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

async function listarPorEmpresa(req, res) {
  try {
    const { idEmpresa } = req.params;
    const resultado = await mainframesModel.listarPorEmpresa(idEmpresa);
    res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao listar mainframes por empresa:", erro);
    res.status(500).json({ erro: "Erro ao listar mainframes por empresa." });
  }
}

module.exports = {
  listarSetores,
  listarSistemas,
  listarComponentes,
  listarTipos,
  cadastrarSetor,
  cadastrarSistema,
  cadastrarComponente,
  cadastrarTipo,
  cadastrarMainframe,
  listarMainframes,
  listarPorEmpresa
};
