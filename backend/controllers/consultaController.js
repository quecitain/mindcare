// =====================================================
// MindCare - Controller de Consultas
// =====================================================

let consultas = [
    {
        id: 1,
        paciente_id: 1,
        psicologo_id: 1,
        data: '2026-06-03',
        hora: '09:00',
        tipo: 'individual',
        status: 'agendada',
        observacoes: ''
    }
];

exports.getAll = (req, res) => {
    res.json({ success: true, data: consultas });
};

exports.getById = (req, res) => {
    const consulta = consultas.find(c => c.id === parseInt(req.params.id));
    if (!consulta) {
        return res.status(404).json({ error: 'Consulta não encontrada' });
    }
    res.json({ success: true, data: consulta });
};

exports.create = (req, res) => {
    const novaConsulta = {
        id: Date.now(),
        ...req.body,
        status: 'agendada'
    };
    consultas.push(novaConsulta);
    res.status(201).json({ success: true, data: novaConsulta });
};

exports.update = (req, res) => {
    const index = consultas.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Consulta não encontrada' });
    }
    consultas[index] = { ...consultas[index], ...req.body };
    res.json({ success: true, data: consultas[index] });
};

exports.delete = (req, res) => {
    const index = consultas.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Consulta não encontrada' });
    }
    consultas.splice(index, 1);
    res.json({ success: true, message: 'Consulta removida' });
};
