var database = require("../database/config")

function cadastrar(nomeEmpresarial, nomeRepresentante, ispb, email, statusOperacao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeEmpresarial, nomeRepresentante, ispb, email, statusOperacao);

    var instrucaoSql = `
        INSERT INTO empresa (nomeEmpresarial, ispb, email, nomeRepresentante, statusOperacao) VALUES ('${nomeEmpresarial}', '${ispb}', '${email}', '${nomeRepresentante}', '${statusOperacao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};