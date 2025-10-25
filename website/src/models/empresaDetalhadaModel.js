const db = require("../../config/db");

async function buscarTodasEmpresas() {
    const [rows] = await db.execute(`
        SELECT e.id, e.nomeEmpresarial, e.email, e.nomeRepresentante, e.ispb,
               sa.descricao AS statusAcesso, so.descricao AS statusOperacao
        FROM empresa e
        JOIN status_acesso sa ON e.statusAcesso = sa.id
        JOIN status_operacao so ON e.statusOperacao = so.id
    `);
    return rows;
}

async function buscarMainframesPorEmpresa(idEmpresa) {
    const [rows] = await db.execute(`
        SELECT fabricante, modelo, macAdress
        FROM mainframe
        WHERE fkEmpresa = ?
    `, [idEmpresa]);
    return rows;
}

module.exports = { buscarTodasEmpresas, buscarMainframesPorEmpresa };
