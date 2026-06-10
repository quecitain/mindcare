// =====================================================
// MindCare - Controller de Autenticação
// =====================================================

// Usuários mock (em produção, viria do banco de dados)
const users = [
    {
        id: 1,
        email: 'admin@mindcare.com',
        password: 'admin123',
        nome: 'Dr. Carlos Silva',
        crp: '06/123456',
        role: 'admin'
    }
];

// Login
exports.login = (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Valida campos
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email e senha são obrigatórios' 
            });
        }
        
        // Busca usuário
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return res.status(401).json({ 
                error: 'Credenciais inválidas' 
            });
        }
        
        // Retorna dados do usuário (sem a senha)
        const { password: _, ...userData } = user;
        
        res.json({
            message: 'Login realizado com sucesso',
            user: userData,
            token: 'mock-jwt-token-' + Date.now()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout
exports.logout = (req, res) => {
    res.json({ message: 'Logout realizado com sucesso' });
};

// Get current user
exports.getMe = (req, res) => {
    // Em produção, pegaria do token JWT
    res.json({
        id: 1,
        email: 'admin@mindcare.com',
        nome: 'Dr. Carlos Silva',
        crp: '06/123456',
        role: 'admin'
    });
};
