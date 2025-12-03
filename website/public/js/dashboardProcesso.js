
idmainframe = sessionStorage.getItem('MAINFRAME')
meugrafico = null
selecionadoindex = dadosfiltrados.length - 1 
definirindex = 12
pagina = 0
parte = 12 * pagina

function grafico() {
    if (meugrafico) {
 
        meugrafico.destroy();
        document.querySelectorAll('.botao-nav').forEach(btn => btn.classList.remove('ativo'));
        elemento = document.getElementById('btnCPU');
        elemento.classList.add('ativo')
        let valor = dadosfiltrados[selecionadoindex].uso_cpu_total_perc
        document.getElementById("graficoValor").textContent = valor + "%";
        document.getElementById("titulo-grafico").innerHTML = `
        <i class="ri-cpu-line"></i> CPU - Uso em Tempo Real (Gráfico Histórico)
        `;
        tipometrica = "uso_cpu_total_perc"  
    }




    const ctx = document.getElementById('myChart');
    data = {
        labels: [
            dadosfiltrados[dadosfiltrados.length - 13].timestamp,
            dadosfiltrados[dadosfiltrados.length - 12].timestamp,
            dadosfiltrados[dadosfiltrados.length - 11].timestamp,
            dadosfiltrados[dadosfiltrados.length - 10].timestamp,
            dadosfiltrados[dadosfiltrados.length - 9].timestamp,
            dadosfiltrados[dadosfiltrados.length - 8].timestamp,
            dadosfiltrados[dadosfiltrados.length - 7].timestamp,
            dadosfiltrados[dadosfiltrados.length - 6].timestamp,
            dadosfiltrados[dadosfiltrados.length - 5].timestamp,
            dadosfiltrados[dadosfiltrados.length - 4].timestamp,
            dadosfiltrados[dadosfiltrados.length - 3].timestamp,
            dadosfiltrados[dadosfiltrados.length - 2].timestamp,
            dadosfiltrados[dadosfiltrados.length - 1].timestamp
        ],
        datasets: [{
            label: 'cputotal',
            data:
                dadosmovel("uso_cpu_total_perc", 13)

            //dadosfiltrados[dadosfiltrados.length - 13].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 12].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 11].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 10].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 9].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 8].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 7].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 6].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 5].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 4].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 3].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 2].uso_cpu_total_perc,
            //dadosfiltrados[dadosfiltrados.length - 1].uso_cpu_total_perc
            ,
            // pointBackgroundColor: ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue","blue","blue","blue","red" ],
            //pointRadius: [4, 4, 4, 4,4,4, 4, 4, 4,4,4, 4,8],
            pointBackgroundColor: setarCor(),
            pointRadius: setarTamanho(),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome1,
            data: dadosmovel("cpu_perc1", 13),
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: false
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome2,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 12].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 11].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 10].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 9].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 8].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 7].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 6].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 5].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 4].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 3].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 2].cpu_perc2,
                dadosfiltrados[dadosfiltrados.length - 1].cpu_perc2
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: false

        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome3,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 12].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 11].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 10].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 9].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 8].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 7].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 6].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 5].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 4].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 3].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 2].cpu_perc3,
                dadosfiltrados[dadosfiltrados.length - 1].cpu_perc3
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome4,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 12].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 11].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 10].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 9].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 8].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 7].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 6].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 5].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 4].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 3].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 2].cpu_perc4,
                dadosfiltrados[dadosfiltrados.length - 1].cpu_perc4
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome5,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 12].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 11].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 10].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 9].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 8].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 7].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 6].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 5].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 4].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 3].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 2].cpu_perc5,
                dadosfiltrados[dadosfiltrados.length - 1].cpu_perc5
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome6,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 12].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 11].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 10].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 9].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 8].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 7].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 6].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 5].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 4].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 3].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 2].cpu_perc6,
                dadosfiltrados[dadosfiltrados.length - 1].cpu_perc6
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome7,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 12].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 11].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 10].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 9].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 8].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 7].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 6].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 5].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 4].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 3].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 2].cpu_perc7,
                dadosfiltrados[dadosfiltrados.length - 1].cpu_perc7
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome8,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 12].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 11].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 10].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 9].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 8].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 7].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 6].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 5].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 4].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 3].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 2].cpu_perc8,
                dadosfiltrados[dadosfiltrados.length - 1].cpu_perc8
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome9,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 12].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 11].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 10].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 9].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 8].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 7].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 6].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 5].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 4].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 3].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 2].cpu_perc9,
                dadosfiltrados[dadosfiltrados.length - 1].cpu_perc9
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true,

        },

        ]


    }
    meugrafico = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            onClick: (event, elements) => {
                if (elements.length > 0) {

                    // Pega o índice do ponto clicado
                    const index = elements[0].index;
                    console.log(index)
                    definirMark(index)

                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                },
                tooltip: {
                    enabled: true
                },

            },
            scales: {
                x: {
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    ticks: {
                        color: 'white'
                    },
                    beginAtZero: true
                }
            }
        }
    });
    //serve para ajeitar o fluxo e colocar ele no timestamp correto
    esquerdaFluxo() 
    direitaFluxo()
}

function grafico2() {
    if (meugrafico) {
        meugrafico.destroy();
        document.querySelectorAll('.botao-nav').forEach(btn => btn.classList.remove('ativo'));
        elemento = document.getElementById('btnRAM');
        elemento.classList.add('ativo')
        let valor = dadosfiltrados[selecionadoindex].uso_ram_total_perc
        document.getElementById("graficoValor").textContent = valor + "%";
        document.getElementById("titulo-grafico").innerHTML = `
        <i class="ri-cpu-line"></i> RAM - Uso em Tempo Real (Gráfico Histórico)
        `;
        tipometrica = "uso_ram_total_perc"
    }

    const ctx = document.getElementById('myChart');
    data = {
        labels: [
            dadosfiltrados[dadosfiltrados.length - 13].timestamp,
            dadosfiltrados[dadosfiltrados.length - 12].timestamp,
            dadosfiltrados[dadosfiltrados.length - 11].timestamp,
            dadosfiltrados[dadosfiltrados.length - 10].timestamp,
            dadosfiltrados[dadosfiltrados.length - 9].timestamp,
            dadosfiltrados[dadosfiltrados.length - 8].timestamp,
            dadosfiltrados[dadosfiltrados.length - 7].timestamp,
            dadosfiltrados[dadosfiltrados.length - 6].timestamp,
            dadosfiltrados[dadosfiltrados.length - 5].timestamp,
            dadosfiltrados[dadosfiltrados.length - 4].timestamp,
            dadosfiltrados[dadosfiltrados.length - 3].timestamp,
            dadosfiltrados[dadosfiltrados.length - 2].timestamp,
            dadosfiltrados[dadosfiltrados.length - 1].timestamp
        ],
        datasets: [{
            label: 'ramtotal',
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 12].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 11].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 10].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 9].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 8].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 7].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 6].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 5].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 4].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 3].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 2].uso_ram_total_perc,
                dadosfiltrados[dadosfiltrados.length - 1].uso_ram_total_perc
            ],
            pointBackgroundColor: setarCor(),
            pointRadius: setarTamanho(),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1

        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome1,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 12].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 11].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 10].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 9].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 8].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 7].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 6].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 5].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 4].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 3].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 2].mem_perc1,
                dadosfiltrados[dadosfiltrados.length - 1].mem_perc1
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: false
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome2,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 12].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 11].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 10].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 9].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 8].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 7].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 6].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 5].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 4].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 3].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 2].mem_perc2,
                dadosfiltrados[dadosfiltrados.length - 1].mem_perc2
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: false

        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome3,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 12].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 11].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 10].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 9].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 8].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 7].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 6].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 5].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 4].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 3].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 2].mem_perc3,
                dadosfiltrados[dadosfiltrados.length - 1].mem_perc3
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome4,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 12].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 11].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 10].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 9].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 8].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 7].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 6].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 5].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 4].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 3].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 2].mem_perc4,
                dadosfiltrados[dadosfiltrados.length - 1].mem_perc4
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome5,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 12].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 11].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 10].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 9].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 8].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 7].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 6].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 5].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 4].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 3].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 2].mem_perc5,
                dadosfiltrados[dadosfiltrados.length - 1].mem_perc5
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome6,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 12].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 11].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 10].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 9].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 8].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 7].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 6].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 5].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 4].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 3].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 2].mem_perc6,
                dadosfiltrados[dadosfiltrados.length - 1].mem_perc6
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome7,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 12].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 11].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 10].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 9].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 8].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 7].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 6].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 5].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 4].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 3].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 2].mem_perc7,
                dadosfiltrados[dadosfiltrados.length - 1].mem_perc7
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome8,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 12].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 11].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 10].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 9].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 8].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 7].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 6].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 5].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 4].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 3].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 2].mem_perc8,
                dadosfiltrados[dadosfiltrados.length - 1].mem_perc8
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        {
            label: dadosfiltrados[dadosfiltrados.length - 1].nome9,
            data: [
                dadosfiltrados[dadosfiltrados.length - 13].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 12].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 11].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 10].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 9].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 8].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 7].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 6].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 5].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 4].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 3].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 2].mem_perc9,
                dadosfiltrados[dadosfiltrados.length - 1].mem_perc9
            ],
            fill: false,
            borderColor: 'rgb(4, 192, 255)',
            tension: 0.1,
            hidden: true
        },
        ]

    }
    meugrafico = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            onClick: (event, elements) => {
                if (elements.length > 0) {

                    // Pega o índice do ponto clicado
                    const index = elements[0].index;
                    definirMark(index)

                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                },
                tooltip: {
                    enabled: true
                },

            },
            scales: {
                x: {
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    ticks: {
                        color: 'white'
                    },
                    beginAtZero: true
                }
            }
        }
    });
    //serve para ajeitar o fluxo e colocar ele no timestamp correto
    esquerdaFluxo()
    direitaFluxo()
}

function listaprocesso() {
    //método aciona quando for a priemira vez que carrega o script é executado
    let valor = dadosfiltrados[dadosfiltrados.length - 1].uso_cpu_total_perc

    document.getElementById("graficoValor").textContent = valor + "%";
    const obj1 = dadosfiltrados[dadosfiltrados.length - 1];

    processosjson = [
        { nome: obj1.nome1, cpu: parseFloat(obj1.cpu_perc1), mem: parseFloat(obj1.mem_perc1) },
        { nome: obj1.nome2, cpu: parseFloat(obj1.cpu_perc2), mem: parseFloat(obj1.mem_perc2) },
        { nome: obj1.nome3, cpu: parseFloat(obj1.cpu_perc3), mem: parseFloat(obj1.mem_perc3) },
        { nome: obj1.nome4, cpu: parseFloat(obj1.cpu_perc4), mem: parseFloat(obj1.mem_perc4) },
        { nome: obj1.nome5, cpu: parseFloat(obj1.cpu_perc5), mem: parseFloat(obj1.mem_perc5) },
        { nome: obj1.nome6, cpu: parseFloat(obj1.cpu_perc6), mem: parseFloat(obj1.mem_perc6) },
        { nome: obj1.nome7, cpu: parseFloat(obj1.cpu_perc7), mem: parseFloat(obj1.mem_perc7) },
        { nome: obj1.nome8, cpu: parseFloat(obj1.cpu_perc8), mem: parseFloat(obj1.mem_perc8) },
        { nome: obj1.nome9, cpu: parseFloat(obj1.cpu_perc9), mem: parseFloat(obj1.mem_perc9) },
    ];
    processosjson.sort((a, b) => b.cpu - a.cpu);
    processo.innerHTML = ``
    processo.innerHTML = `
            <div class="processobox" id="cabecalho">
                <h3 class="titulo">Nome do Processo</h3>
                <h3>CPU</h3>
                <h3>RAM</h3> 
                </div>
                `

    for (let x = 0; x < 10; x++) {

        processo.innerHTML += `
              <div class="processobox">
                <h3 class="titulo">${processosjson[x].nome}</h3>
                <h3>${processosjson[x].cpu}%</h3>
                <h3>${processosjson[x].mem}%</h3> 
                </div>
                
              `;
    }


}
//atualiza o valor azul que representa o total de cpu
function atribuirvalor(realIndex, atributo) { 
    let valor = dadosfiltrados[dadosfiltrados.length + realIndex][atributo]

    document.getElementById("graficoValor").textContent = valor + "%";
}

//função recebe o valor atual da bola vermelha
function definirMark(index) {
    const label = data.labels[index];
    const value = data.datasets[0].data[index];
    const realIndex = index - 13;
    const atributo = tipometrica
    atribuirvalor(realIndex, atributo)
    document.getElementById("horario").innerHTML=dadosfiltrados[dadosfiltrados.length + realIndex].timestamp
    if (tipometrica == "uso_cpu_total_perc") {
        ordernar = "cpu"
    } else {
        ordernar = "mem"
    }
    
    
    const obj = dadosfiltrados[dadosfiltrados.length + realIndex];
    
    processosjson = [
        { nome: obj.nome1, cpu: parseFloat(obj.cpu_perc1), mem: parseFloat(obj.mem_perc1) },
        { nome: obj.nome2, cpu: parseFloat(obj.cpu_perc2), mem: parseFloat(obj.mem_perc2) },
        { nome: obj.nome3, cpu: parseFloat(obj.cpu_perc3), mem: parseFloat(obj.mem_perc3) },
        { nome: obj.nome4, cpu: parseFloat(obj.cpu_perc4), mem: parseFloat(obj.mem_perc4) },
        { nome: obj.nome5, cpu: parseFloat(obj.cpu_perc5), mem: parseFloat(obj.mem_perc5) },
        { nome: obj.nome6, cpu: parseFloat(obj.cpu_perc6), mem: parseFloat(obj.mem_perc6) },
        { nome: obj.nome7, cpu: parseFloat(obj.cpu_perc7), mem: parseFloat(obj.mem_perc7) },
        { nome: obj.nome8, cpu: parseFloat(obj.cpu_perc8), mem: parseFloat(obj.mem_perc8) },
        { nome: obj.nome9, cpu: parseFloat(obj.cpu_perc9), mem: parseFloat(obj.mem_perc9) },
    ];
    processosjson.sort((a, b) => b[ordernar] - a[ordernar]);
    processo.innerHTML = ``
    processo.innerHTML = `
            <div class="processobox" id="cabecalho">
                <h3 class="titulo">Nome do Processo</h3>
                <h3>CPU</h3>
                <h3>RAM</h3> 
                </div>
                
                `

    for (let x = 0; x < 9; x++) {

        processo.innerHTML += `
              <div class="processobox">
                <h3 class="titulo">${processosjson[x].nome}</h3>
                <h3>${processosjson[x].cpu}%</h3>
                <h3>${processosjson[x].mem}%</h3> 
                </div>
                
                `;
    } 
    
}

//formata as label do gráfico
function formatarHorario() {
    dadosfiltrados = dadosfiltrados.map(item => {
        const horaCompleta = item.timestamp.split(" ")[1];
        const [h, m] = horaCompleta.split(":");

        return {
            ...item,
            timestamp: `${h}:${m}`
        };
    });

}
//função para não reescrever. coluna= coluna do csv. quantidade significa quantos registros você quer ver
function dadosmovel(coluna, quantidade) {
    const array = [];
    for (i = quantidade; i >= 1; i--) {
        array.push(dadosfiltrados[dadosfiltrados.length - (i + parte)][coluna]);
    }

    return array;
}
function esquerdaMark() {
    //select é o index selecionado  
    if (selecionadoindex > 0) {
        selecionadoindex--;
        definirindex--;

        // muda o ponto do gráfico
        atualizarPonto();

        definirMark(definirindex);
    }

}

function direitaMark() {
    //select é o index selecionado  
    if (selecionadoindex < dadosfiltrados.length - 1) {
        selecionadoindex++;
        definirindex++;

        // atualiza o gráfico 
        atualizarPonto();
        definirMark(definirindex);

    }

}
function setarTamanho() {
    let tamanho = [];

    // Percorre cada índice do array 
    for (let i = 0; i < dadosfiltrados.length; i++) {
        // Se o índice atual for igual ao índice selecionado, o ponto é destacado
        if (i === selecionadoindex) {
            tamanho.push(10);
        }
        else {
            tamanho.push(4);
        }
    }
    //slice coleta o index dos valores de um array especifico
    tamanho = tamanho.slice(-13)
    return tamanho;
}

function setarCor() {
    let cores = [];

    // Percorre cada índice do array 
    for (let i = 0; i < dadosfiltrados.length; i++) {
        // Se o índice atual for igual ao índice selecionado, o ponto é destacado
        if (i === selecionadoindex) {
            cores.push("red");
        }
        else {
            cores.push("blue");
        }
    }
    //slice coleta o index dos valores de um array especifico
    cores = cores.slice(-13)
    return cores;
}
function atualizarPonto() {
    //pega o array do setarCor e atribui a uma das propriedades do chart 
    meugrafico.data.datasets[0].pointBackgroundColor = setarCor();
    meugrafico.data.datasets[0].pointRadius = setarTamanho();

    // Pede para o Chart.js redesenhar tudo com atualizações
    meugrafico.update();
}




//botão para verificar o ultimo alerta
function carregarUltimoAlerta() {

    for (let i = dadosfiltrados.length - 1; i >= 0; i--) {
        const element = dadosfiltrados[i];

        if (element.uso_cpu_total_perc >= 80) {

            break;
        }
    }
}
let fatia
//mover o fluxo para a esquerda
function esquerdaFluxo() {
    if (tipometrica=="uso_cpu_total_perc") {
        tipometricaprocesso = "cpu_perc";
    }else{
        tipometricaprocesso = "mem_perc";
    }

    pagina++;
    fluxotabela = 12 //x linhas 
    

    //pega 13 ultimos registros para colocar no dataset
    //inicio e o fim
    iniciofatia = dadosfiltrados.length - (fluxotabela * pagina + 13)
    fimfatia = iniciofatia + 13
    fatia = dadosfiltrados.slice(iniciofatia, fimfatia);
    
    if (iniciofatia <= 0) {
        
        return
    }

    //atualiza o dataset do chart.js
    meugrafico.data.labels = fatia.map(x => x.timestamp);
    fatia2 = []
    
    for (let x = 0; x < fatia.length; x++) {
        fatia2.push(fatia[x][tipometrica]);
    }
    meugrafico.data.datasets[0].data = fatia2
    //meugrafico.data.datasets[1].data = fatia.map(x => x.cpu_perc1);
    meugrafico.data.datasets[1].data = fatia.map(x => x[`${tipometricaprocesso}1`]);
    meugrafico.data.datasets[2].data = fatia.map(x => x[`${tipometricaprocesso}2`]);
    meugrafico.data.datasets[3].data = fatia.map(x => x[`${tipometricaprocesso}3`]);
    meugrafico.data.datasets[4].data = fatia.map(x => x[`${tipometricaprocesso}4`]);
    meugrafico.data.datasets[5].data = fatia.map(x => x[`${tipometricaprocesso}5`]);
    meugrafico.data.datasets[6].data = fatia.map(x => x[`${tipometricaprocesso}6`]);
    meugrafico.data.datasets[7].data = fatia.map(x => x[`${tipometricaprocesso}7`]);
    meugrafico.data.datasets[8].data = fatia.map(x => x[`${tipometricaprocesso}8`]);
    meugrafico.data.datasets[9].data = fatia.map(x => x[`${tipometricaprocesso}9`]);

    //atualiza estilos 
    meugrafico.data.datasets[0].pointRadius = setarTamanho();
    meugrafico.data.datasets[0].pointBackgroundColor = setarCor();


    // atualiza grafico
    meugrafico.update();
    
    definirindex -= 12;
    definirMark(definirindex);
    
}

function direitaFluxo() {
    
    if (tipometrica=="uso_cpu_total_perc") {
        tipometricaprocesso = "cpu_perc";
    }else{
        tipometricaprocesso = "mem_perc";
    }

    if (pagina <= 0) {
        return
    }
    pagina--;
    fluxotabela = 12

    //pega 13 ultimos registros para colocar no dataset
    //inicio e o fim
    iniciofatia = dadosfiltrados.length - (fluxotabela * pagina + 13)
    fimfatia = iniciofatia + 13
    fatia = dadosfiltrados.slice(iniciofatia, fimfatia);


    meugrafico.data.labels = fatia.map(x => x.timestamp);
    meugrafico.data.datasets[0].data = fatia.map(x => x[tipometrica]);
    meugrafico.data.datasets[1].data = fatia.map(x => x[`${tipometricaprocesso}1`]);
    meugrafico.data.datasets[2].data = fatia.map(x => x[`${tipometricaprocesso}2`]);
    meugrafico.data.datasets[3].data = fatia.map(x => x[`${tipometricaprocesso}3`]);
    meugrafico.data.datasets[4].data = fatia.map(x => x[`${tipometricaprocesso}4`]);
    meugrafico.data.datasets[5].data = fatia.map(x => x[`${tipometricaprocesso}5`]);
    meugrafico.data.datasets[6].data = fatia.map(x => x[`${tipometricaprocesso}6`]);
    meugrafico.data.datasets[7].data = fatia.map(x => x[`${tipometricaprocesso}7`]);
    meugrafico.data.datasets[8].data = fatia.map(x => x[`${tipometricaprocesso}8`]);
    meugrafico.data.datasets[9].data = fatia.map(x => x[`${tipometricaprocesso}9`]);

    meugrafico.data.datasets[0].pointRadius = setarTamanho();
    meugrafico.data.datasets[0].pointBackgroundColor = setarCor();



    meugrafico.update();
    definirindex += 12;
    definirMark(definirindex);


} 