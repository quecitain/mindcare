// =====================================================
// MindCare - Módulo de Relatórios
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    initRelatorios();
});

function initRelatorios() {
    const periodoSelect = document.getElementById('periodoRelatorio');
    
    if (periodoSelect) {
        periodoSelect.addEventListener('change', function() {
            const periodo = this.value;
            showToast(`Carregando dados do período: ${getPeriodoLabel(periodo)}`, 'info');
            // Aqui você atualizaria os dados do relatório
        });
    }
}

function getPeriodoLabel(periodo) {
    const labels = {
        'mes': 'Este Mês',
        'trimestre': 'Último Trimestre',
        'semestre': 'Último Semestre',
        'ano': 'Este Ano'
    };
    return labels[periodo] || periodo;
}
