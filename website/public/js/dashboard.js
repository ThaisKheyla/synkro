const API_URL = "/dashboard/dados";

let rawDashboardData = [];

async function buscarDadosDashboard() {
    console.log("Iniciando busca de dados do dashboard na API...");
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        rawDashboardData = await response.json();
        console.log(`Dados do dashboard carregados com sucesso. Total de registros: ${rawDashboardData.length}`);
        
        const kpiTotalAlertas = document.getElementById('kpiTotalAlertas');
        if (kpiTotalAlertas) {
            kpiTotalAlertas.innerText = rawDashboardData.length; 
        }
        
    } catch (error) {
        console.error("Falha ao buscar dados do dashboard:", error);

        const kpiTotalAlertas = document.getElementById('kpiTotalAlertas');
        if (kpiTotalAlertas) {
            kpiTotalAlertas.innerText = "Erro de Carga";
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    buscarDadosDashboard();
});
