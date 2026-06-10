// =====================================================
// MindCare - Módulo Financeiro
// =====================================================

// Elementos do DOM
const btnNovaReceita = document.getElementById('btnNovaReceita');
const btnNovaDespesa = document.getElementById('btnNovaDespesa');
const modalFinanceiro = document.getElementById('modalFinanceiro');
const closeModalFinanceiro = document.getElementById('closeModalFinanceiro');
const cancelModalFinanceiro = document.getElementById('cancelModalFinanceiro');
const formFinanceiro = document.getElementById('formFinanceiro');
const modalTitle = document.getElementById('modalFinanceiroTitle');
const tipoTransacao = document.getElementById('tipoTransacao');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initFinanceiroHandlers();
});

function initFinanceiroHandlers() {
    if (btnNovaReceita) {
        btnNovaReceita.addEventListener('click', () => {
            tipoTransacao.value = 'receita';
            modalTitle.textContent = 'Nova Receita';
            formFinanceiro.reset();
            document.getElementById('dataTransacao').value = new Date().toISOString().split('T')[0];
            updateCategorias('receita');
            openModalFinanceiro();
        });
    }
    
    if (btnNovaDespesa) {
        btnNovaDespesa.addEventListener('click', () => {
            tipoTransacao.value = 'despesa';
            modalTitle.textContent = 'Nova Despesa';
            formFinanceiro.reset();
            document.getElementById('dataTransacao').value = new Date().toISOString().split('T')[0];
            updateCategorias('despesa');
            openModalFinanceiro();
        });
    }
    
    if (closeModalFinanceiro) {
        closeModalFinanceiro.addEventListener('click', closeModalFinanceiroHandler);
    }
    
    if (cancelModalFinanceiro) {
        cancelModalFinanceiro.addEventListener('click', closeModalFinanceiroHandler);
    }
    
    if (modalFinanceiro) {
        modalFinanceiro.addEventListener('click', (e) => {
            if (e.target === modalFinanceiro) {
                closeModalFinanceiroHandler();
            }
        });
    }
    
    if (formFinanceiro) {
        formFinanceiro.addEventListener('submit', handleFinanceiroSubmit);
    }
    
    // Botões de ação na tabela
    document.querySelectorAll('.btn-confirm').forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('Pagamento confirmado!', 'success');
            // Atualiza o status na interface
            const row = this.closest('tr');
            const statusBadge = row.querySelector('.status-badge');
            statusBadge.textContent = 'Pago';
            statusBadge.className = 'status-badge pago';
        });
    });
}

function openModalFinanceiro() {
    modalFinanceiro.classList.add('active');
}

function closeModalFinanceiroHandler() {
    modalFinanceiro.classList.remove('active');
}

function updateCategorias(tipo) {
    const categoriaSelect = document.getElementById('categoriaTransacao');
    
    if (tipo === 'receita') {
        categoriaSelect.innerHTML = `
            <option value="consulta">Consulta</option>
            <option value="avaliacao">Avaliação</option>
            <option value="laudo">Laudo</option>
            <option value="palestra">Palestra/Workshop</option>
            <option value="outros">Outros</option>
        `;
    } else {
        categoriaSelect.innerHTML = `
            <option value="aluguel">Aluguel</option>
            <option value="material">Material de Escritório</option>
            <option value="software">Software/Assinaturas</option>
            <option value="marketing">Marketing</option>
            <option value="impostos">Impostos</option>
            <option value="outros">Outros</option>
        `;
    }
}

function handleFinanceiroSubmit(e) {
    e.preventDefault();
    
    const tipo = tipoTransacao.value;
    showToast(`${tipo === 'receita' ? 'Receita' : 'Despesa'} registrada com sucesso!`, 'success');
    closeModalFinanceiroHandler();
}
