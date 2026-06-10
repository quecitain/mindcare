// =====================================================
// MindCare - Módulo de Autenticação
// =====================================================

// Usuários mock para demonstração
const mockUsers = [
    {
        id: 1,
        email: 'admin@mindcare.com',
        password: 'admin123',
        nome: 'Dr. Carlos Silva',
        crp: '06/123456',
        role: 'admin'
    },
    {
        id: 2,
        email: 'psicologo@mindcare.com',
        password: '123456',
        nome: 'Dra. Ana Paula',
        crp: '06/654321',
        role: 'psicologo'
    }
];

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.querySelector('.toggle-password');

// Toggle para mostrar/esconder senha
if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

// Handler do formulário de login
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validação básica
        if (!email || !password) {
            showToast('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        // Busca usuário
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Salva sessão no localStorage
            const session = {
                userId: user.id,
                email: user.email,
                nome: user.nome,
                crp: user.crp,
                role: user.role,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('mindcare_session', JSON.stringify(session));
            
            showToast('Login realizado com sucesso!', 'success');
            
            // Redireciona para o dashboard após um breve delay
            setTimeout(() => {
                window.location.href = 'pages/dashboard.html';
            }, 1000);
        } else {
            showToast('E-mail ou senha inválidos.', 'error');
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
}

// Função para verificar se usuário está logado
function checkAuth() {
    const session = localStorage.getItem('mindcare_session');
    
    if (!session) {
        // Se não está na página de login, redireciona
        if (!window.location.pathname.includes('index.html') && 
            !window.location.pathname.endsWith('/')) {
            window.location.href = '../index.html';
        }
        return null;
    }
    
    return JSON.parse(session);
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('mindcare_session');
    showToast('Você foi desconectado.', 'success');
    
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 500);
}

// Função para mostrar toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('i');
    
    // Remove classes anteriores
    toast.classList.remove('success', 'error', 'warning');
    
    // Adiciona classe do tipo
    toast.classList.add(type);
    
    // Atualiza ícone
    toastIcon.className = 'fas';
    if (type === 'success') {
        toastIcon.classList.add('fa-check-circle');
    } else if (type === 'error') {
        toastIcon.classList.add('fa-times-circle');
    } else if (type === 'warning') {
        toastIcon.classList.add('fa-exclamation-circle');
    }
    
    // Atualiza mensagem
    toastMessage.textContent = message;
    
    // Mostra toast
    toast.classList.add('show');
    
    // Esconde após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Verifica autenticação ao carregar páginas internas
document.addEventListener('DOMContentLoaded', function() {
    // Se não é a página de login, verifica auth
    if (!window.location.pathname.includes('index.html') && 
        !window.location.pathname.endsWith('/frontend/')) {
        const session = checkAuth();
        
        if (session) {
            // Atualiza informações do usuário na sidebar
            const userName = document.querySelector('.user-name');
            if (userName) {
                userName.textContent = session.nome;
            }
        }
    }
});
