// Variável para armazenar a instância do gráfico (agora no escopo global/window)
window.chartCpuRam = null;

// Lista de métricas para o gráfico de tendência e seus títulos/descrições
const metricasTendencia = [
    {
        id: 'geral',
        titulo: 'CPU e RAM',
        descricao: 'Acompanhe a variação da carga média de CPU e RAM para identificar picos e horários críticos.',
        datasets: ['cpu', 'ram']
    },
    {
        id: 'cpu',
        titulo: 'CPU',
        descricao: 'Foco na tendência de utilização do processamento central (CPU) nas últimas 24 horas.',
        datasets: ['cpu']
    },
    {
        id: 'ram',
        titulo: 'RAM',
        descricao: 'Foco na tendência de utilização da memória (RAM) nas últimas 24 horas. Verifique picos de consumo.',
        datasets: ['ram']
    }
];
let metricaAtualIndex = 0; // Começa em 'CPU e RAM'

// Dados completos dos datasets para fácil acesso
const datasetFull = {
    cpu: {
        label: 'Uso de CPU (%)',
        data: [45, 52, 68, 80, 76, 64],
        borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.15)', fill: true, tension: 0.3, borderWidth: 3, pointRadius: 4, pointBackgroundColor: '#38bdf8'
    },
    ram: {
        label: 'Uso de RAM (%)',
        data: [35, 40, 55, 65, 60, 50],
        borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.15)', fill: false, tension: 0.3, borderWidth: 3, pointRadius: 4, pointBackgroundColor: '#22c55e'
    }
};

// Função para ATUALIZAR o gráfico de Tendência
function atualizarGraficoTendencia() {
    if (!window.chartCpuRam) return; // Sai se o gráfico não foi inicializado

    const metrica = metricasTendencia[metricaAtualIndex];

    // 1. Atualiza Título e Descrição
    document.getElementById('metricaAtual').innerText = metrica.titulo;
    document.getElementById('descricaoGraficoTendencia').innerText = metrica.descricao;

    // 2. Atualiza Datasets
    window.chartCpuRam.data.datasets = metrica.datasets.map(id => datasetFull[id]);

    // Se for apenas CPU ou RAM, oculta a legenda, senão exibe
    window.chartCpuRam.options.plugins.legend.display = metrica.datasets.length > 1;

    window.chartCpuRam.update();
}

// Função de NAVEGAÇÃO
function navegarGraficoTendencia(direcao) {
    if (direcao === 'proximo') {
        metricaAtualIndex = (metricaAtualIndex + 1) % metricasTendencia.length;
    } else if (direcao === 'anterior') {
        metricaAtualIndex = (metricaAtualIndex - 1 + metricasTendencia.length) % metricasTendencia.length;
    }

    // Atualiza apenas o gráfico de tendência
    atualizarGraficoTendencia();
}


// --- FUNÇÃO DE INICIALIZAÇÃO DE GRÁFICOS ---
function initCharts() {
    // Gráfico 1 - Uso de CPU e RAM dos Mainframes (Linha)
    const canvasCpuRam = document.getElementById('graficoCpuRam');
    if (canvasCpuRam && canvasCpuRam.offsetParent !== null) {
        if (window.chartCpuRam) window.chartCpuRam.destroy(); // Destrói instância anterior

        const ctxCpuRam = canvasCpuRam.getContext('2d');
        window.chartCpuRam = new Chart(ctxCpuRam, {
            type: 'line',
            data: {
                labels: ['00h', '04h', '08h', '12h', '16h', '20h'],
                // Começa com o dataset de 'geral'
                datasets: metricasTendencia[metricaAtualIndex].datasets.map(id => datasetFull[id])
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true, // Começa como true para 'geral'
                        labels: { color: '#cbd5e1' }
                    }
                },
                scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#cbd5e1' } },
                    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#cbd5e1' } }
                }
            }
        });

        // Garante que o estado inicial do título e descrição esteja correto
        atualizarGraficoTendencia();
    }

    // Gráfico de Pizza (Status dos Mainframes)
    const canvasPie = document.getElementById('statusPieChart');
    if (canvasPie && canvasPie.offsetParent !== null) {
        if (window.chartStatusPie) window.chartStatusPie.destroy();
        const ctxPie = canvasPie.getContext('2d');
        window.chartStatusPie = new Chart(ctxPie, {
            type: 'doughnut',
            data: {
                labels: ['Emergência', 'Muito Urgente', 'Urgente', 'Normal'],
                datasets: [{
                    data: [2, 1, 1, 1],
                    backgroundColor: [
                        '#ef4444', // Emergência
                        '#ff6b00', // Muito Urgente
                        '#f59e0b', // Urgente
                        '#10b981'  // Normal
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                aspectRatio: 1,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                let value = context.raw || 0;
                                return `${label}: ${value}`;
                            }
                        }
                    }
                },
                cutout: '65%',
                layout: { padding: 0 },
            }
        });
    }
}

// --- FUNÇÃO DE FILTRO (Mantida da versão anterior) ---
function filtrarDashboard(filtro, botaoClicado) {
    // 1. Alternar a classe 'ativo' nos botões
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('ativo'));
    botaoClicado.classList.add('ativo');

    // 2. Ocultar/Exibir elementos do Dashboard (KPIs, Gráficos, Alertas)
    const elementosFiltrados = document.querySelectorAll('[data-filtro]');

    elementosFiltrados.forEach(elemento => {
        const filtrosSuportados = elemento.getAttribute('data-filtro').split(' ');

        if (filtrosSuportados.includes(filtro)) {
            elemento.style.display = elemento.classList.contains('painel-kpis') ? 'grid' :
                elemento.classList.contains('painel-graficos') ? 'grid' :
                    elemento.tagName === 'SECTION' ? 'flex' : 'flex'; // Exibe como grid/flex

            // Lógica específica para o gráfico de tendência no modo 'geral', 'cpu' ou 'ram'
            if (elemento.id === 'grafico-tendencia' && ['cpu', 'ram'].includes(filtro)) {
                // Ajusta a métrica do gráfico de tendência se o filtro principal for CPU ou RAM
                const novoIndex = metricasTendencia.findIndex(m => m.id === filtro);
                if (novoIndex !== -1) {
                    metricaAtualIndex = novoIndex;
                    atualizarGraficoTendencia();
                }
            } else if (elemento.id === 'grafico-tendencia' && filtro === 'geral') {
                // Volta para a métrica "CPU e RAM" na Visão Geral
                metricaAtualIndex = 0;
                atualizarGraficoTendencia();
            }

        } else {
            elemento.style.display = 'none'; // Oculta
        }
    });

    // Tratamento específico para a seção de gráficos, pois ela precisa de um layout grid/flex
    const painelGraficos = document.querySelector('.painel-graficos');
    painelGraficos.style.display = 'grid'; // A seção principal de gráficos sempre será grid

    // Re-renderizar gráficos após a manipulação do DOM para evitar bugs visuais
    setTimeout(() => {
        initCharts();
    }, 50);
}

// Chamada inicial para popular os gráficos
window.onload = function () {
    validarSessaoSynkro(); // Função do seu arquivo sessao.js
    initCharts();
    // Garante que o filtro "Visão Geral" esteja ativo ao carregar
    const botaoGeral = document.querySelector('.btn-filtro.ativo');
    if (botaoGeral) {
        filtrarDashboard('geral', botaoGeral);
    }
};