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
    const { nome, localizacao } = req.body;
    if (!nome || !localizacao) return res.status(400).json({ erro: "Nome do setor é obrigatório." });

    await mainframesModel.cadastrarSetor(nome, localizacao, fkEmpresa);
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

async function visaoGeralPorEmpresa(req, res) {
  try {
    const { idEmpresa } = req.params;
    const resultado = await mainframesModel.visaoGeralPorEmpresa(idEmpresa);
    res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao listar mainframes por empresa:", erro);
    res.status(500).json({ erro: "Erro ao listar mainframes por empresa." });
  }
}

function contarAlertasPorMainframe(req, res) {
    const idMainframe = req.params.idMainframe;

    if (idMainframe == undefined) {
        res.status(400).send("O ID da empresa está indefinido!");
        return;
    }

    // Chama a função SQL
    mainframesModel.contarAlertasPorMainframe(idMainframe)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum alerta encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar alertas por mainframe: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarStatusComponentes(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está indefinida!");
        return;
    }

    mainframesModel.buscarStatusComponentes(fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum status de componente encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o status dos componentes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function carregarSelectMainframe(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está indefinida!");
        return;
    }

    mainframesModel.carregarSelectMainframe(fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum mainframe encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o mainframe: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// ======================================================
// NOVAS FUNÇÕES PARA A DASHBOARD DE ALERTAS
// ======================================================

function buscarRankingAlertas(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    // ... [Validação de fkEmpresa, como nas suas outras funções] ...

    mainframesModel.buscarRankingAlertas(fkEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                // Retorna 204 (No Content) se não houver dados, o que é bom para o front-end
                res.status(204).send("Nenhum mainframe encontrado no ranking."); 
            }
        }).catch(function (erro) {
            console.log("Houve um erro ao buscar o ranking de alertas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarStatusGeralEKPIs(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    // ... [Validação de fkEmpresa] ...

    mainframesModel.buscarStatusGeralEKPIs(fkEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                // O Model retorna um array de 1 posição, enviamos o objeto diretamente.
                res.status(200).json(resultado[0]); 
            } else {
                // Retorna 0 para os KPIs se a consulta não retornar nada (por segurança)
                res.status(200).json({ totalMainframes: 0, mainframesComAlerta: 0 }); 
            }
        }).catch(function (erro) {
            console.log("Houve um erro ao buscar o status geral/KPIs: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
function buscarAlertasPorMainframe(req, res) {
    const idMainframe = req.params.idMainframe;

    if (idMainframe == undefined) {
        res.status(400).send("O ID do mainframe está indefinido!");
        return;
    }

    mainframesModel.buscarAlertasPorMainframe(idMainframe)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum alerta encontrado para este mainframe.");
            }
        }).catch(function (erro) {
            console.log("Houve um erro ao buscar alertas por mainframe: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
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
  visaoGeralPorEmpresa,
  buscarStatusComponentes,
  carregarSelectMainframe,
  listarPorEmpresa,
  contarAlertasPorMainframe,
  buscarRankingAlertas, 
  buscarStatusGeralEKPIs,
  buscarAlertasPorMainframe
};
