// =====================================================
// MindCare - Módulo de Agenda
// =====================================================

// Dados mock de consultas
let consultas = [
    {
        id: 1,
        paciente_id: 1,
        paciente_nome: 'Maria Santos',
        data: '2026-06-03',
        hora: '09:00',
        tipo: 'individual',
        duracao: 50,
        status: 'confirmed',
        observacoes: 'Sessão 12 - Continuação do tratamento de ansiedade'
    },
    {
        id: 2,
        paciente_id: 2,
        paciente_nome: 'João Oliveira',
        data: '2026-06-03',
        hora: '10:00',
        tipo: 'avaliacao',
        duracao: 50,
        status: 'pending',
        observacoes: 'Avaliação psicológica'
    },
    {
        id: 3,
        paciente_id: 3,
        paciente_nome: 'Ana Costa',
        data: '2026-06-03',
        hora: '11:00',
        tipo: 'individual',
        duracao: 50,
        status: 'confirmed',
        observacoes: 'TCC - Exposição gradual'
    }
];

// Elementos do DOM
const btnNovaConsulta = document.getElementById('btnNovaConsulta');
const modalConsulta = document.getElementById('modalConsulta');
const closeModalConsulta = document.getElementById('closeModalConsulta');
const cancelModalConsulta = document.getElementById('cancelModalConsulta');
const formConsulta = document.getElementById('formConsulta');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initCalendarNavigation();
    initModalConsultaHandlers();
    initAppointmentBlocks();
});

// Navegação do calendário
function initCalendarNavigation() {
    const prevWeek = document.getElementById('prevWeek');
    const nextWeek = document.getElementById('nextWeek');
    const btnHoje = document.getElementById('btnHoje');
    
    if (prevWeek) {
        prevWeek.addEventListener('click', () => {
            showToast('Semana anterior carregada', 'info');
        });
    }
    
    if (nextWeek) {
        nextWeek.addEventListener('click', () => {
            showToast('Próxima semana carregada', 'info');
        });
    }
    
    if (btnHoje) {
        btnHoje.addEventListener('click', () => {
            showToast('Voltando para hoje', 'info');
        });
    }
}

// Handlers do modal de consulta
function initModalConsultaHandlers() {
    if (btnNovaConsulta) {
        btnNovaConsulta.addEventListener('click', () => {
            formConsulta.reset();
            // Define data padrão como hoje
            document.getElementById('dataConsulta').value = new Date().toISOString().split('T')[0];
            openModalConsulta();
        });
    }
    
    if (closeModalConsulta) {
        closeModalConsulta.addEventListener('click', closeModalConsultaHandler);
    }
    
    if (cancelModalConsulta) {
        cancelModalConsulta.addEventListener('click', closeModalConsultaHandler);
    }
    
    if (modalConsulta) {
        modalConsulta.addEventListener('click', (e) => {
            if (e.target === modalConsulta) {
                closeModalConsultaHandler();
            }
        });
    }
    
    if (formConsulta) {
        formConsulta.addEventListener('submit', handleConsultaSubmit);
    }
}

function openModalConsulta() {
    modalConsulta.classList.add('active');
}

function closeModalConsultaHandler() {
    modalConsulta.classList.remove('active');
}

function handleConsultaSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(formConsulta);
    const consultaData = {
        id: Date.now(),
        paciente_id: parseInt(formData.get('paciente_id')),
        data: formData.get('data'),
        hora: formData.get('hora'),
        tipo: formData.get('tipo'),
        duracao: parseInt(formData.get('duracao')),
        status: 'pending',
        observacoes: formData.get('observacoes') || ''
    };
    
    consultas.push(consultaData);
    showToast('Consulta agendada com sucesso!', 'success');
    closeModalConsultaHandler();
}

// Clique nos blocos de consulta
function initAppointmentBlocks() {
    document.querySelectorAll('.appointment-block').forEach(block => {
        block.addEventListener('click', function() {
            const patient = this.querySelector('.appointment-patient').textContent;
            const time = this.querySelector('.appointment-time').textContent;
            const status = this.dataset.status;
            
            showToast(`Consulta: ${patient} às ${time} (${status})`, 'info');
        });
    });
}
