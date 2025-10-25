const model = require("../models/empresaDetalhadaModel");

async function listarTodasEmpresas(req, res) {
    try {
        const empresas = await model.buscarTodasEmpresas();
        // Para cada empresa, buscar mainframes
        const empresasComMainframes = await Promise.all(
            empresas.map(async (e) => {
                const mainframes = await model.buscarMainframesPorEmpresa(e.id);
                return { ...e, mainframes };
            })
        );
        res.status(200).json(empresasComMainframes);
    } catch (err) {
        console.error("Erro ao buscar todas as empresas:", err);
        res.status(500).json({ erro: "Erro interno ao buscar todas as empresas" });
    }
}

async function buscarDetalhes(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: "ID inválido" });

    try {
        const empresas = await model.buscarTodasEmpresas();
        const empresa = empresas.find(e => e.id === id);
        if (!empresa) return res.status(404).json({ erro: "Empresa não encontrada" });

        const mainframes = await model.buscarMainframesPorEmpresa(id);
        res.status(200).json({ empresa, mainframes });
    } catch (err) {
        console.error("Erro ao buscar detalhes:", err);
        res.status(500).json({ erro: "Erro interno ao buscar detalhes da empresa" });
    }
}

module.exports = { listarTodasEmpresas, buscarDetalhes };
