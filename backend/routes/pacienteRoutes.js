// =====================================================
// MindCare - Rotas de Pacientes
// =====================================================

const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// GET /api/pacientes - Lista todos os pacientes
router.get('/', pacienteController.getAll);

// GET /api/pacientes/:id - Busca um paciente por ID
router.get('/:id', pacienteController.getById);

// POST /api/pacientes - Cria um novo paciente
router.post('/', pacienteController.create);

// PUT /api/pacientes/:id - Atualiza um paciente
router.put('/:id', pacienteController.update);

// DELETE /api/pacientes/:id - Remove um paciente
router.delete('/:id', pacienteController.delete);

module.exports = router;
