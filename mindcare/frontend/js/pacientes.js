// =====================================================
// MindCare - Módulo de Gestão de Pacientes
// =====================================================

// Dados mock de pacientes
let pacientes = [
    {
        id: 1,
        nome: 'Maria Santos',
        email: 'maria.santos@email.com',
        telefone: '(11) 98765-4321',
        cpf: '123.456.789-00',
        dataNascimento: '1990-05-15',
        genero: 'feminino',
        tratamento: 'individual',
        valorSessao: 250.00,
        endereco: 'Rua das Flores, 123 - São Paulo, SP',
        observacoes: 'Paciente em tratamento de ansiedade.',
        status: 'ativo',
        sessoes: 12,
        ultimaSessao: '2026-06-02'
    },
    {
        id: 2,
        nome: 'João Oliveira',
        email: 'joao.oliveira@email.com',
        telefone: '(11) 91234-5678',
        cpf: '987.654.321-00',
        dataNascimento: '1985-08-22',
        genero: 'masculino',
        tratamento: 'avaliacao',
        valorSessao: 350.00,
        endereco: 'Av. Paulista, 1000 - São Paulo, SP',
        observacoes: 'Avaliação psicológica para empresa.',
        status: 'ativo',
        sessoes: 3,
        ultimaSessao: '2026-06-01'
    },
    {
        id: 3,
        nome: 'Ana Costa',
        email: 'ana.costa@email.com',
        telefone: '(11) 94567-8901',
        cpf: '456.789.123-00',
        dataNascimento: '1995-03-10',
        genero: 'feminino',
        tratamento: 'individual',
        valorSessao: 250.00,
        endereco: 'Rua Augusta, 500 - São Paulo, SP',
        observacoes: 'TCC para tratamento de fobia social.',
        status: 'ativo',
        sessoes: 8,
        ultimaSessao: '2026-05-30'
    },
    {
        id: 4,
        nome: 'Pedro Lima',
        email: 'pedro.lima@email.com',
        telefone: '(11) 97654-3210',
        cpf: '789.123.456-00',
        dataNascimento: '1988-11-25',
        genero: 'masculino',
        tratamento: 'individual',
        valorSessao: 250.00,
        endereco: 'Rua Oscar Freire, 200 - São Paulo, SP',
        observacoes: 'Novo paciente. Queixa principal: estresse no trabalho.',
        status: 'ativo',
        sessoes: 1,
        ultimaSessao: '2026-06-01'
    },
    {
        id: 5,
        nome: 'Carla Mendes',
        email: 'carla.mendes@email.com',
        telefone: '(11) 93456-7890',
        cpf: '321.654.987-00',
        dataNascimento: '1992-07-08',
        genero: 'feminino',
        tratamento: 'casal',
        valorSessao: 350.00,
        endereco: 'Al. Santos, 800 - São Paulo, SP',
        observacoes: 'Terapia de casal. Participante: Roberto Mendes.',
        status: 'ativo',
        sessoes: 6,
        ultimaSessao: '2026-05-28'
    }
];

// Elementos do DOM
const btnNovoPaciente = document.getElementById('btnNovoPaciente');
const modalPaciente = document.getElementById('modalPaciente');
const closeModal = document.getElementById('closeModal');
const cancelModal = document.getElementById('cancelModal');
const formPaciente = document.getElementById('formPaciente');
const pacientesTableBody = document.getElementById('pacientesTableBody');
const searchPaciente = document.getElementById('searchPaciente');
const filterStatus = document.getElementById('filterStatus');
const filterTratamento = document.getElementById('filterTratamento');

let editingId = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderPacientes();
    initModalHandlers();
    initFilters();
});

// Renderiza tabela de pacientes
function renderPacientes(data = pacientes) {
    if (!pacientesTableBody) return;
    
    pacientesTableBody.innerHTML = data.map(p => `
        <tr data-id="${p.id}">
            <td>
                <div class="patient-cell">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(p.nome)}&background=6366f1&color=fff" alt="${p.nome}">
                    <div> <strong>${p.nome}</strong>
                        <small>${p.cpf}</small>
                    </div>
                </div>
            </td>
            <td>
                <div>${p.email}</div>
                <small>${p.telefone}</small>
            </td>
            <td>
                <span class="category-badge ${p.tratamento}">${formatTratamento(p.tratamento)}</span>
            </td>
            <td>${p.sessoes}</td>
            <td>
                <span class="status-badge ${p.status}">${formatStatus(p.status)}</span>
            </td>
            <td>${formatDate(p.ultimaSessao)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon-small btn-view" title="Visualizar" onclick="viewPaciente(${p.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon-small btn-edit" title="Editar" onclick="editPaciente(${p.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon-small btn-delete" title="Excluir" onclick="deletePaciente(${p.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Formata tipo de tratamento
function formatTratamento(tipo) {
    const tipos = {
        'individual': 'Terapia Individual',
        'casal': 'Terapia de Casal',
        'grupo': 'Terapia em Grupo',
        'avaliacao': 'Avaliação'
    };
    return tipos[tipo] || tipo;
}

// Formata status
function formatStatus(status) {
    const statuses = {
        'ativo': 'Ativo',
        'inativo': 'Inativo',
        'alta': 'Alta'
    };
    return statuses[status] || status;
}

// Formata data
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Inicializa handlers do modal
function initModalHandlers() {
    // Abrir modal para novo paciente
    if (btnNovoPaciente) {
        btnNovoPaciente.addEventListener('click', () => {
            editingId = null;
            formPaciente.reset();
            document.getElementById('modalTitle').textContent = 'Novo Paciente';
            openModal();
        });
    }
    
    // Fechar modal
    if (closeModal) {
        closeModal.addEventListener('click', closeModalHandler);
    }
    
    if (cancelModal) {
        cancelModal.addEventListener('click', closeModalHandler);
    }
    
    // Fechar ao clicar fora
    if (modalPaciente) {
        modalPaciente.addEventListener('click', (e) => {
            if (e.target === modalPaciente) {
                closeModalHandler();
            }
        });
    }
    
    // Submit do formulário
    if (formPaciente) {
        formPaciente.addEventListener('submit', handleSubmit);
    }
}

// Abre o modal
function openModal() {
    modalPaciente.classList.add('active');
}

// Fecha o modal
function closeModalHandler() {
    modalPaciente.classList.remove('active');
    editingId = null;
}

// Handler do submit
function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(formPaciente);
    const pacienteData = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        cpf: formData.get('cpf') || '',
        dataNascimento: formData.get('dataNascimento') || '',
        genero: formData.get('genero') || '',
        tratamento: formData.get('tratamento') || 'individual',
        valorSessao: parseFloat(formData.get('valorSessao')) || 250.00,
        endereco: formData.get('endereco') || '',
        observacoes: formData.get('observacoes') || '',
        status: 'ativo',
        sessoes: 0,
        ultimaSessao: null
    };
    
    if (editingId) {
        // Edita paciente existente
        const index = pacientes.findIndex(p => p.id === editingId);
        if (index !== -1) {
            pacientes[index] = { ...pacientes[index], ...pacienteData };
            showToast('Paciente atualizado com sucesso!', 'success');
        }
    } else {
        // Adiciona novo paciente
        pacienteData.id = Date.now();
        pacientes.push(pacienteData);
        showToast('Paciente cadastrado com sucesso!', 'success');
    }
    
    renderPacientes();
    closeModalHandler();
}

// Visualiza paciente
window.viewPaciente = function(id) {
    const paciente = pacientes.find(p => p.id === id);
    if (!paciente) return;
    
    const modalVisualizar = document.getElementById('modalVisualizarPaciente');
    const patientProfile = document.getElementById('patientProfile');
    
    if (modalVisualizar && patientProfile) {
        patientProfile.innerHTML = `
            <div class="patient-profile-header">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(paciente.nome)}&background=6366f1&color=fff&size=100" alt="${paciente.nome}">
                <div>
                    <h3>${paciente.nome}</h3>
                    <p>CPF: ${paciente.cpf || 'Não informado'}</p>
                    <span class="status-badge ${paciente.status}">${formatStatus(paciente.status)}</span>
                </div>
            </div>
            <div class="patient-profile-details">
                <div class="detail-group">
                    <label>E-mail</label>
                    <p>${paciente.email}</p>
                </div>
                <div class="detail-group">
                    <label>Telefone</label>
                    <p>${paciente.telefone}</p>
                </div>
                <div class="detail-group">
                    <label>Data de Nascimento</label>
                    <p>${paciente.dataNascimento ? formatDate(paciente.dataNascimento) : 'Não informado'}</p>
                </div>
                <div class="detail-group">
                    <label>Gênero</label>
                    <p>${paciente.genero || 'Não informado'}</p>
                </div>
                <div class="detail-group">
                    <label>Tipo de Tratamento</label>
                    <p>${formatTratamento(paciente.tratamento)}</p>
                </div>
                <div class="detail-group">
                    <label>Valor da Sessão</label>
                    <p>R$ ${paciente.valorSessao.toFixed(2)}</p>
                </div>
                <div class="detail-group">
                    <label>Sessões Realizadas</label>
                    <p>${paciente.sessoes}</p>
                </div>
                <div class="detail-group">
                    <label>Última Sessão</label>
                    <p>${paciente.ultimaSessao ? formatDate(paciente.ultimaSessao) : 'Nenhuma'}</p>
                </div>
                <div class="detail-group full-width">
                    <label>Endereço</label>
                    <p>${paciente.endereco || 'Não informado'}</p>
                </div>
                <div class="detail-group full-width">
                    <label>Observações</label>
                    <p>${paciente.observacoes || 'Nenhuma observação'}</p>
                </div>
            </div>
        `;
        
        modalVisualizar.classList.add('active');
        
        // Handler para fechar
        document.getElementById('closeModalVisualizar').onclick = () => {
            modalVisualizar.classList.remove('active');
        };
    }
};

// Edita paciente
window.editPaciente = function(id) {
    const paciente = pacientes.find(p => p.id === id);
    if (!paciente) return;
    
    editingId = id;
    document.getElementById('modalTitle').textContent = 'Editar Paciente';
    
    // Preenche formulário
    document.getElementById('nome').value = paciente.nome;
    document.getElementById('emailPaciente').value = paciente.email;
    document.getElementById('telefone').value = paciente.telefone;
    document.getElementById('cpf').value = paciente.cpf || '';
    document.getElementById('dataNascimento').value = paciente.dataNascimento || '';
    document.getElementById('genero').value = paciente.genero || '';
    document.getElementById('tratamento').value = paciente.tratamento || 'individual';
    document.getElementById('valorSessao').value = paciente.valorSessao || 250;
    document.getElementById('endereco').value = paciente.endereco || '';
    document.getElementById('observacoes').value = paciente.observacoes || '';
    
    openModal();
};

// Exclui paciente
window.deletePaciente = function(id) {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
        pacientes = pacientes.filter(p => p.id !== id);
        renderPacientes();
        showToast('Paciente excluído com sucesso!', 'success');
    }
};

// Inicializa filtros
function initFilters() {
    if (searchPaciente) {
        searchPaciente.addEventListener('input', applyFilters);
    }
    
    if (filterStatus) {
        filterStatus.addEventListener('change', applyFilters);
    }
    
    if (filterTratamento) {
        filterTratamento.addEventListener('change', applyFilters);
    }
}

// Aplica filtros
function applyFilters() {
    let filtered = [...pacientes];
    
    // Filtro de busca
    const searchTerm = searchPaciente?.value.toLowerCase() || '';
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.nome.toLowerCase().includes(searchTerm) ||
            p.email.toLowerCase().includes(searchTerm) ||
            p.telefone.includes(searchTerm)
        );
    }
    
    // Filtro de status
    const status = filterStatus?.value || '';
    if (status) {
        filtered = filtered.filter(p => p.status === status);
    }
    
    // Filtro de tratamento
    const tratamento = filterTratamento?.value || '';
    if (tratamento) {
        filtered = filtered.filter(p => p.tratamento === tratamento);
    }
    
    renderPacientes(filtered);
}
