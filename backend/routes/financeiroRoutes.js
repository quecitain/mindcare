// =====================================================
// MindCare - Rotas Financeiras
// =====================================================

const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');

// GET /api/financeiro - Lista todas as transações
router.get('/', financeiroController.getAll);

// GET /api/financeiro/resumo - Resumo financeiro
router.get('/resumo', financeiroController.getResumo);

// POST /api/financeiro - Cria nova transação
router.post('/', financeiroController.create);

// PUT /api/financeiro/:id - Atualiza transação
router.put('/:id', financeiroController.update);

// DELETE /api/financeiro/:id - Remove transação
router.delete('/:id', financeiroController.delete);

module.exports = router;
