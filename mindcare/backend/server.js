// =====================================================
// MindCare - Servidor Principal
// Desenvolvido para projeto acadêmico
// =====================================================

const express = require('express');
const cors = require('cors');
const path = require('path');

// Importação das rotas
const authRoutes = require('./routes/authRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');

// Configuração do app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api/financeiro', financeiroRoutes);

// Rota principal - retorna o frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Rota de teste da API
app.get('/api', (req, res) => {
    res.json({
        message: 'MindCare API está funcionando!',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            pacientes: '/api/pacientes',
            consultas: '/api/consultas',
            financeiro: '/api/financeiro'
        }
    });
});

// Middleware de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════╗
    ║         MindCare API Server           ║
    ╠═══════════════════════════════════════╣
    ║  Servidor rodando na porta: ${PORT}       ║
    ║  URL: http://localhost:${PORT}            ║
    ╚═══════════════════════════════════════╝
    `);
});

module.exports = app;
