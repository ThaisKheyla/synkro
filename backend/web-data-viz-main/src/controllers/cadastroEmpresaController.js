var cadastroEmpresaModel = require("../models/cadastroEmpresaModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeEmpresarial = req.body.nomeEmpresarialServer
    var nomeRepresentante = req.body.nomeRepresentanteServer
    var ispb = req.body.ispbServer
    var email = req.body.emailServer
    var statusOperacao = req.body.statusOperacaoServer

    // Faça as validações dos valores
    if (nomeEmpresarial == undefined) {
        res.status(400).send("Seu nomeEmpresarial está undefined!");
    } else if (nomeRepresentante == undefined) {
        res.status(400).send("Seu nomeRepresentante está undefined!");
    } else if (ispb == undefined) {
        res.status(400).send("Seu ispb está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if(statusOperacao == undefined) {
        res.status(400).send("Seu statusOperacao está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        cadastroEmpresaModel.cadastrar(nomeEmpresarial, nomeRepresentante, ispb, email, statusOperacao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}