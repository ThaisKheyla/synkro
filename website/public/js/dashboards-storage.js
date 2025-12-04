/* ===== GERENCIADOR DE DASHBOARDS E GRÁFICOS ===== */

// Array de cores para os gráficos
const colors = {
    primary: '#38bdf8',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    blue: '#2563eb',
    purple: '#a855f7',
    pink: '#ec4899',
    indigo: '#6366f1',
};

// Função para alternar entre dashboards
function mostrarDashboard(nomeDashboard) {
    // Esconder todos os dashboards
    const dashboards = document.querySelectorAll('.dashboard-content');
    dashboards.forEach(d => d.classList.remove('ativo'));

    // Esconder todos os botões de tab
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('ativo'));

    // Mostrar dashboard selecionado
    const dashboard = document.getElementById(`dashboard-${nomeDashboard}`);
    if (dashboard) {
        dashboard.classList.add('ativo');
    }

    // Ativar botão de tab selecionado
    event.target.classList.add('ativo');

    // Reinicializar gráficos
    setTimeout(() => {
        inicializarGraficos(nomeDashboard);
    }, 100);
}

// ===== INICIALIZADORES DE GRÁFICOS =====

function inicializarGraficos(dashboard) {
    switch (dashboard) {
        case 'storage':
            inicializarGraficosStorage();
            break;
        case 'iops':
            inicializarGraficosIops();
            break;
        case 'latencia':
            inicializarGraficosLatencia();
            break;
        case 'throughput':
            inicializarGraficosThroughput();
            break;
        case 'health':
            inicializarGraficosHealth();
            break;
        case 'alertas':
            // Alertas não têm gráficos complexos
            break;
    }
}

// ===== DASHBOARD 1: STORAGE =====

function inicializarGraficosStorage() {
    // Donut de Uso
    const ctxDonut = document.getElementById('storageDonut');
    if (ctxDonut && !window.storageDonutChart) {
        window.storageDonutChart = new Chart(ctxDonut, {
            type: 'doughnut',
            data: {
                labels: ['Usado', 'Livre'],
                datasets: [{
                    data: [72, 28],
                    backgroundColor: [colors.primary, 'rgba(255,255,255,0.1)'],
                    borderColor: ['#1e293b', '#1e293b'],
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#cbd5e1', font: { size: 13, weight: '600' } } },
                },
            },
        });
    }

    // Bar: Total vs Utilizado vs Livre
    const ctxBar = document.getElementById('storageBar');
    if (ctxBar && !window.storageBarChart) {
        window.storageBarChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Total', 'Utilizado', 'Livre'],
                datasets: [{
                    label: 'GB',
                    data: [1000, 720, 280],
                    backgroundColor: [colors.blue, colors.primary, colors.success],
                    borderRadius: 6,
                    borderSkipped: false,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#cbd5e1', font: { size: 13, weight: '600' } } },
                },
                scales: {
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255,255,255,0.05)' },
                    },
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255,255,255,0.05)' },
                    },
                },
            },
        });
    }

    // Line: Tendência
    const ctxTrend = document.getElementById('storageTrend');
    if (ctxTrend && !window.storageTrendChart) {
        window.storageTrendChart = new Chart(ctxTrend, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                datasets: [{
                    label: 'Uso do Disco (%)',
                    data: [55, 58, 62, 65, 69, 71, 72],
                    borderColor: colors.primary,
                    backgroundColor: `rgba(56, 189, 248, 0.1)`,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: colors.primary,
                    pointBorderColor: '#1e293b',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#cbd5e1', font: { size: 13, weight: '600' } } },
                },
                scales: {
                    y: {
                        ticks: { color: '#94a3b8', callback: val => val + '%' },
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        max: 100,
                    },
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255,255,255,0.05)' },
                    },
                },
            },
        });
    }

    // Bar: Top 10 Volumes
    const ctxTop10 = document.getElementById('storageTop10');
    if (ctxTop10 && !window.storageTop10Chart) {
        window.storageTop10Chart = new Chart(ctxTop10, {
            type: 'bar',
            data: {
                labels: ['VOL-001', 'VOL-002', 'VOL-003', 'VOL-004', 'VOL-005', 'VOL-006', 'VOL-007', 'VOL-008', 'VOL-009', 'VOL-010'],
                datasets: [{
                    label: 'Uso (%)',
                    data: [92, 88, 82, 75, 68, 62, 55, 48, 42, 38],
                    backgroundColor: [
                        colors.danger, colors.danger, colors.warning, colors.warning, colors.warning,
                        colors.primary, colors.primary, colors.success, colors.success, colors.success,
                    ],
                    borderRadius: 6,
                    borderSkipped: false,
                }],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#cbd5e1', font: { size: 13, weight: '600' } } },
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8', callback: val => val + '%' },
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        max: 100,
                    },
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255,255,255,0.05)' },
                    },
                },
            },
        });
    }
}

// ===== DASHBOARD 2: IOPS =====

function inicializarGraficosIops() {
    // Line: IOPS Leitura + Escrita
    const ctxLine = document.getElementById('iopsLine');
    if (ctxLine && !window.iopsLineChart) {
        window.iopsLineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                datasets: [
                    {
                        label: 'IOPS Leitura',
                        data: [1200, 1400, 1800, 2100, 2300, 2100, 2100],
                        borderColor: colors.blue,
                        backgroundColor: `rgba(37, 99, 235, 0.1)`,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: colors.blue,
                        pointBorderColor: '#1e293b',
                    },
                    {
                        label: 'IOPS Escrita',
                        data: [800, 950, 1200, 1500, 1800, 1600, 1800],
                        borderColor: colors.primary,
                        backgroundColor: `rgba(56, 189, 248, 0.1)`,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: colors.primary,
                        pointBorderColor: '#1e293b',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#cbd5e1', font: { size: 13, weight: '600' } } },
                },
                scales: {
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255,255,255,0.05)' },
                    },
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255,255,255,0.05)' },
                    },
                },
            },
        });
    }

    // Bar: Pico Máximo
    const ctxPeak = document.getElementById('iopsPeak');
    if (ctxPeak && !window.iopsPeakChart) {
        window.iopsPeakChart = new Chart(ctxPeak, {
            type: 'bar',
            data: {
                labels: ['5 min atrás', '4 min atrás', '3 min atrás', '2 min atrás', '1 min atrás', 'Agora'],
                datasets: [{
                    label: 'Pico IOPS',
                    data: [4800, 4900, 5100, 5200, 5100, 5000],
                    backgroundColor: colors.danger,
                    borderRadius: 6,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#cbd5e1' } },
                },
                scales: {
                    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                },
            },
        });
    }

    // Bar: Top Volumes
    const ctxTop = document.getElementById('iopsTop');
    if (ctxTop && !window.iopsTopChart) {
        window.iopsTopChart = new Chart(ctxTop, {
            type: 'bar',
            data: {
                labels: ['VOL-001', 'VOL-002', 'VOL-003', 'VOL-004', 'VOL-005'],
                datasets: [{
                    label: 'IOPS Total',
                    data: [1200, 950, 850, 600, 300],
                    backgroundColor: [colors.danger, colors.warning, colors.primary, colors.blue, colors.success],
                    borderRadius: 6,
                }],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                },
            },
        });
    }
}

// ===== DASHBOARD 3: LATÊNCIA =====

function inicializarGraficosLatencia() {
    // Line: Latência ao longo do tempo
    const ctxLine = document.getElementById('latenciaLine');
    if (ctxLine && !window.latenciaLineChart) {
        window.latenciaLineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                datasets: [{
                    label: 'Latência (ms)',
                    data: [4.2, 4.8, 5.6, 7.2, 8.1, 7.5, 6.2],
                    borderColor: colors.primary,
                    backgroundColor: `rgba(56, 189, 248, 0.1)`,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: colors.primary,
                    pointBorderColor: '#1e293b',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } },
                scales: {
                    y: { ticks: { color: '#94a3b8', callback: val => val + ' ms' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                },
            },
        });
    }

    // Bar: Latência Comparativa
    const ctxComp = document.getElementById('latenciaComparativa');
    if (ctxComp && !window.latenciaCompChart) {
        window.latenciaCompChart = new Chart(ctxComp, {
            type: 'bar',
            data: {
                labels: ['Latência Média', 'Latência Máxima'],
                datasets: [{
                    label: 'ms',
                    data: [6.2, 18.5],
                    backgroundColor: [colors.primary, colors.warning],
                    borderRadius: 6,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } },
                scales: {
                    y: { ticks: { color: '#94a3b8', callback: val => val + ' ms' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                },
            },
        });
    }
}

// ===== DASHBOARD 4: THROUGHPUT =====

function inicializarGraficosThroughput() {
    // Line: Throughput Total
    const ctxLine = document.getElementById('throughputLine');
    if (ctxLine && !window.throughputLineChart) {
        window.throughputLineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                datasets: [{
                    label: 'MB/s',
                    data: [400, 450, 550, 650, 750, 700, 770],
                    borderColor: colors.primary,
                    backgroundColor: `rgba(56, 189, 248, 0.1)`,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: colors.primary,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } },
                scales: {
                    y: { ticks: { color: '#94a3b8', callback: val => val + ' MB/s' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                },
            },
        });
    }

    // Bar: Leitura vs Escrita
    const ctxComp = document.getElementById('throughputComparacao');
    if (ctxComp && !window.throughputCompChart) {
        window.throughputCompChart = new Chart(ctxComp, {
            type: 'bar',
            data: {
                labels: ['Leitura', 'Escrita'],
                datasets: [{
                    label: 'MB/s',
                    data: [450, 320],
                    backgroundColor: [colors.blue, colors.primary],
                    borderRadius: 6,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } },
                scales: {
                    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                },
            },
        });
    }

    // Bar: Top Consumidores
    const ctxTop = document.getElementById('throughputTop');
    if (ctxTop && !window.throughputTopChart) {
        window.throughputTopChart = new Chart(ctxTop, {
            type: 'bar',
            data: {
                labels: ['APP-001', 'APP-002', 'APP-003', 'APP-004', 'APP-005'],
                datasets: [{
                    label: 'MB/s',
                    data: [250, 180, 150, 120, 70],
                    backgroundColor: [colors.danger, colors.warning, colors.primary, colors.blue, colors.success],
                    borderRadius: 6,
                }],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                },
            },
        });
    }
}

// ===== DASHBOARD 5: HEALTH =====

function inicializarGraficosHealth() {
    // Donut: Health Score
    const ctxDonut = document.getElementById('healthDonut');
    if (ctxDonut && !window.healthDonutChart) {
        window.healthDonutChart = new Chart(ctxDonut, {
            type: 'doughnut',
            data: {
                labels: ['OK', 'WARNING', 'CRITICAL'],
                datasets: [{
                    data: [80, 10, 10],
                    backgroundColor: [colors.success, colors.warning, colors.danger],
                    borderColor: ['#1e293b', '#1e293b', '#1e293b'],
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } },
            },
        });
    }

    // Bar: Erros por Hora
    const ctxErros = document.getElementById('healthErros');
    if (ctxErros && !window.healthErrosChart) {
        window.healthErrosChart = new Chart(ctxErros, {
            type: 'bar',
            data: {
                labels: ['00h', '04h', '08h', '12h', '16h', '20h', '24h'],
                datasets: [{
                    label: 'Erros',
                    data: [2, 1, 3, 2, 5, 3, 1],
                    backgroundColor: colors.danger,
                    borderRadius: 6,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#cbd5e1' } } },
                scales: {
                    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                },
            },
        });
    }
}

// ===== FUNÇÃO PARA FILTRAR ALERTAS =====

function filtrarAlertas(tipo) {
    // Atualizar botões
    const filtros = document.querySelectorAll('.filtro-btn');
    filtros.forEach(f => f.classList.remove('ativo'));
    event.target.classList.add('ativo');

    // Filtrar cards
    const cards = document.querySelectorAll('.alerta-card');
    cards.forEach(card => {
        if (tipo === 'todos') {
            card.style.display = 'flex';
        } else {
            card.style.display = card.classList.contains(tipo) ? 'flex' : 'none';
        }
    });
}

// Inicializar gráficos de Storage ao carregar a página
window.addEventListener('load', () => {
    inicializarOverviewCharts();
    inicializarMiniGraficos();
    inicializarGraficosStorage();
});

// ===== MINI GRÁFICOS (VISÃO GERAL) =====

function inicializarMiniGraficos() {
    // Mini Storage Donut
    const ctxMiniStorage = document.getElementById('miniStorageChart');
    if (ctxMiniStorage && !window.miniStorageChart) {
        window.miniStorageChart = new Chart(ctxMiniStorage, {
            type: 'doughnut',
            data: {
                labels: ['Usado', 'Livre'],
                datasets: [{
                    data: [72, 28],
                    backgroundColor: ['#38bdf8', 'rgba(255,255,255,0.1)'],
                    borderColor: ['#1e293b', '#1e293b'],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
            },
        });
    }

    // Mini IOPS Line
    const ctxMiniIops = document.getElementById('miniIopsChart');
    if (ctxMiniIops && !window.miniIopsChart) {
        window.miniIopsChart = new Chart(ctxMiniIops, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', ''],
                datasets: [{
                    data: [1200, 1400, 1800, 2100, 2300, 2100, 2100],
                    borderColor: colors.blue,
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 0,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { display: false },
                    x: { display: false },
                },
            },
        });
    }

    // Mini Latência Line
    const ctxMiniLatencia = document.getElementById('miniLatenciaChart');
    if (ctxMiniLatencia && !window.miniLatenciaChart) {
        window.miniLatenciaChart = new Chart(ctxMiniLatencia, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', ''],
                datasets: [{
                    data: [4.2, 4.8, 5.6, 7.2, 8.1, 7.5, 6.2],
                    borderColor: colors.primary,
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 0,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { display: false },
                    x: { display: false },
                },
            },
        });
    }

    // Mini Throughput Line
    const ctxMiniThroughput = document.getElementById('miniThroughputChart');
    if (ctxMiniThroughput && !window.miniThroughputChart) {
        window.miniThroughputChart = new Chart(ctxMiniThroughput, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', ''],
                datasets: [{
                    data: [400, 450, 550, 650, 750, 700, 770],
                    borderColor: colors.warning,
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 0,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { display: false },
                    x: { display: false },
                },
            },
        });
    }

    // Mini Health Donut
    const ctxMiniHealth = document.getElementById('miniHealthChart');
    if (ctxMiniHealth && !window.miniHealthChart) {
        window.miniHealthChart = new Chart(ctxMiniHealth, {
            type: 'doughnut',
            data: {
                labels: ['OK', 'Warning', 'Critical'],
                datasets: [{
                    data: [80, 10, 10],
                    backgroundColor: [colors.success, colors.warning, colors.danger],
                    borderColor: ['#1e293b', '#1e293b', '#1e293b'],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
            },
        });
    }
}

// Inicializar charts da seção Overview (maiores que os mini-gráficos)
function inicializarOverviewCharts() {
    // Overview Pie 1
    const ctxOp1 = document.getElementById('overviewPie1');
    if (ctxOp1 && !window.overviewPie1) {
        window.overviewPie1 = new Chart(ctxOp1, {
            type: 'doughnut',
            data: {
                labels: ['SSD', 'HDD', 'NVMe'],
                datasets: [{ data: [45, 35, 20], backgroundColor: [colors.primary, colors.blue, colors.pink], borderColor: '#0f172a', borderWidth: 2 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#cbd5e1' } } } }
        });
    }

    // Overview Pie 2
    const ctxOp2 = document.getElementById('overviewPie2');
    if (ctxOp2 && !window.overviewPie2) {
        window.overviewPie2 = new Chart(ctxOp2, {
            type: 'doughnut',
            data: { labels: ['US', 'EU', 'BR', 'APAC'], datasets: [{ data: [40, 30, 20, 10], backgroundColor: [colors.purple, colors.indigo, colors.primary, colors.success], borderColor: '#0f172a', borderWidth: 2 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#cbd5e1' } } } }
        });
    }

    // Overview Line
    const ctxOl = document.getElementById('overviewLine');
    if (ctxOl && !window.overviewLine) {
        window.overviewLine = new Chart(ctxOl, {
            type: 'line',
            data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], datasets: [{ label: 'Uso (%)', data: [60,62,65,68,70,71,72], borderColor: colors.primary, backgroundColor: 'rgba(56,189,248,0.08)', fill: true, tension: 0.35 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#cbd5e1' } } }, scales: { x: { ticks: { color: '#94a3b8' } }, y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } } } }
        });
    }
}
