// =====================================================
// MindCare - Controller de Pacientes
// =====================================================

// Dados mock de pacientes
let pacientes = [
    {
        id: 1,
        nome: 'Maria Santos',
        email: 'maria.santos@email.com',
        telefone: '(11) 98765-4321',
        cpf: '123.456.789-00',
        status: 'ativo',
        tratamento: 'individual',
        created_at: '2026-01-15'
    },
    {
        id: 2,
        nome: 'João Oliveira',
        email: 'joao.oliveira@email.com',
        telefone: '(11) 91234-5678',
        cpf: '987.654.321-00',
        status: 'ativo',
        tratamento: 'avaliacao',
        created_at: '2026-02-20'
    }
];

// Lista todos os pacientes
exports.getAll = (req, res) => {
    res.json({
        success: true,
        data: pacientes,
        total: pacientes.length
    });
};

// Busca paciente por ID
exports.getById = (req, res) => {
    const { id } = req.params;
    const paciente = pacientes.find(p => p.id === parseInt(id));
    
    if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    
    res.json({ success: true, data: paciente });
};

// Cria novo paciente
exports.create = (req, res) => {
    const novoPaciente = {
        id: Date.now(),
        ...req.body,
        status: 'ativo',
        created_at: new Date().toISOString()
    };
    
    pacientes.push(novoPaciente);
    
    res.status(201).json({
        success: true,
        message: 'Paciente criado com sucesso',
        data: novoPaciente
    });
};

// Atualiza paciente
exports.update = (req, res) => {
    const { id } = req.params;
    const index = pacientes.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    
    pacientes[index] = { ...pacientes[index], ...req.body };
    
    res.json({
        success: true,
        message: 'Paciente atualizado com sucesso',
        data: pacientes[index]
    });
};

// Remove paciente
exports.delete = (req, res) => {
    const { id } = req.params;
    const index = pacientes.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    
    pacientes.splice(index, 1);
    
    res.json({
        success: true,
        message: 'Paciente removido com sucesso'
    });
};
