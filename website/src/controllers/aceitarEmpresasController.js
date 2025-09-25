var aceitarEmpresaModel = require("../models/aceitarEmpresasModel");

function buscar_cards(req, res) {
    console.log("indo para o AceitarEmpresasController - buscar_cards");

    var filtro = req.body.filtroServer;

        aceitarEmpresaModel.buscar_cards(filtro)
            .then(
                function (resultadoBuscarCards) {
                    console.log(`\nResultados encontrados: ${resultadoBuscarCards.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoBuscarCards)}`); // transforma JSON em String

                    if (resultadoBuscarCards.length >= 1) {
                        console.log(resultadoBuscarCards);

         // mudado para retornar todos os valores do select e não só o primeiro como antes
         res.json(resultadoBuscarCards);


                    } else if (resultadoBuscarCards.length == 0) {
                        res.status(403).send("filtro inválido(s)");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao buscar os cards! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function editar(req, res) {
    var novoStatus = req.body.novoStatus;
    var idEmpresa = req.body.idEmpresa;

    aceitarEmpresaModel.editar(novoStatus, idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}


module.exports = {
    buscar_cards,
    editar
}