var database = require("../database/config")

function cadastrar(nomeEmpresarial, nomeRepresentante, ispb, email, statusOperacao) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeEmpresarial, nomeRepresentante, ispb, email, statusOperacao);

    var instrucaoSqlSelect = `
        SELECT id FROM status_operacao WHERE descricao = '${statusOperacao}';
    `;

    console.log("Executando a instrução SQL de SELECT: \n" + instrucaoSqlSelect);

    return database.executar(instrucaoSqlSelect)
        .then(resultadoSelect => {
            if (resultadoSelect.length === 0) {
                throw new Error(`Descrição de status '${statusOperacao}' não encontrada.`);
            }

            const idStatusOperacao = resultadoSelect[0].id;

            var instrucaoSqlInsert = `
                INSERT INTO empresa (nomeEmpresarial, ispb, email, nomeRepresentante, StatusOperacao) VALUES 
                ('${nomeEmpresarial}', '${ispb}', '${email}', '${nomeRepresentante}', ${idStatusOperacao});
            `;

            console.log("Executando a instrução SQL de INSERT: \n" + instrucaoSqlInsert);
            
            return database.executar(instrucaoSqlInsert);
        });
}

module.exports = {
    cadastrar
};