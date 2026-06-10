// =====================================================
// MindCare - Controller Financeiro
// =====================================================

let transacoes = [
    {
        id: 1,
        tipo: 'receita',
        descricao: 'Consulta - Maria Santos',
        valor: 250.00,
        categoria: 'consulta',
        data: '2026-06-03',
        status: 'pago'
    },
    {
        id: 2,
        tipo: 'despesa',
        descricao: 'Aluguel do Consultório',
        valor: 1800.00,
        categoria: 'aluguel',
        data: '2026-06-02',
        status: 'pago'
    }
];

exports.getAll = (req, res) => {
    res.json({ success: true, data: transacoes });
};

exports.getResumo = (req, res) => {
    const receitas = transacoes
        .filter(t => t.tipo === 'receita')
        .reduce((sum, t) => sum + t.valor, 0);
    
    const despesas = transacoes
        .filter(t => t.tipo === 'despesa')
        .reduce((sum, t) => sum + t.valor, 0);
    
    res.json({
        success: true,
        data: {
            receitas,
            despesas,
            saldo: receitas - despesas
        }
    });
};

exports.create = (req, res) => {
    const novaTransacao = {
        id: Date.now(),
        ...req.body,
        data: req.body.data || new Date().toISOString().split('T')[0]
    };
    transacoes.push(novaTransacao);
    res.status(201).json({ success: true, data: novaTransacao });
};

exports.update = (req, res) => {
    const index = transacoes.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Transação não encontrada' });
    }
    transacoes[index] = { ...transacoes[index], ...req.body };
    res.json({ success: true, data: transacoes[index] });
};

exports.delete = (req, res) => {
    const index = transacoes.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Transação não encontrada' });
    }
    transacoes.splice(index, 1);
    res.json({ success: true, message: 'Transação removida' });
};
