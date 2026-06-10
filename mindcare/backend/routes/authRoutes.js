// =====================================================
// MindCare - Rotas de Autenticação
// =====================================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/login - Fazer login
router.post('/login', authController.login);

// POST /api/auth/logout - Fazer logout
router.post('/logout', authController.logout);

// GET /api/auth/me - Obter usuário logado
router.get('/me', authController.getMe);

module.exports = router;
