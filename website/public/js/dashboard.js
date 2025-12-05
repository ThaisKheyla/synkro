const API_URL = "/dashboard/dados";

let dashboardData = {};

async function buscarDadosDashboard() {
    console.log(" Iniciando busca de dados do dashboard na API...");
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        dashboardData = await response.json();
        console.log(" Dados carregados com sucesso!", dashboardData);
        
        // Dispara evento customizado indicando que os dados estão prontos
        window.dispatchEvent(new CustomEvent('dashboardDataLoaded', { detail: dashboardData }));
        
    } catch (error) {
        console.error(" Falha ao buscar dados:", error);
        //  usar dados vazio para evitar crash
        dashboardData = { semana: {}, mes: {}, semestre: {}, ano: {} };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    buscarDadosDashboard();
});
