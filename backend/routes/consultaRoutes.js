// =====================================================
// MindCare - Rotas de Consultas
// =====================================================

const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

// GET /api/consultas - Lista todas as consultas
router.get('/', consultaController.getAll);

// GET /api/consultas/:id - Busca uma consulta por ID
router.get('/:id', consultaController.getById);

// POST /api/consultas - Cria uma nova consulta
router.post('/', consultaController.create);

// PUT /api/consultas/:id - Atualiza uma consulta
router.put('/:id', consultaController.update);

// DELETE /api/consultas/:id - Remove uma consulta
router.delete('/:id', consultaController.delete);

module.exports = router;
