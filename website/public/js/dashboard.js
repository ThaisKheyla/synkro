const API_URL = "/s3Route/dados/dashboard_data.json";

let dashboardData = {};

async function buscarDadosDashboard() {
    console.log("Iniciando busca de dados do dashboard na API...", API_URL);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        dashboardData = await response.json();
        // tornar disponível globalmente (dashboardGerente.html usa window.dashboardData)
        window.dashboardData = dashboardData;
        console.log("Dados carregados com sucesso!", dashboardData);
        window.dispatchEvent(new CustomEvent('dashboardDataLoaded', { detail: dashboardData }));
    } catch (error) {
        console.error("Falha ao buscar dados:", error);
        dashboardData = { semana: {}, mes: {}, semestre: {}, ano: {} };
        window.dashboardData = dashboardData;
        window.dispatchEvent(new CustomEvent('dashboardDataLoaded', { detail: dashboardData }));
    }
}

document.addEventListener('DOMContentLoaded', () => buscarDadosDashboard());
