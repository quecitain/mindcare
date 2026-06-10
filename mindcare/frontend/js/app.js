// =====================================================
// MindCare - Módulo Principal da Aplicação
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa componentes
    initSidebar();
    initLogout();
    initCurrentDate();
    initSearch();
    
    // Verifica autenticação
    const session = checkSession();
    if (!session) return;
    
    // Atualiza dados do usuário
    updateUserInfo(session);
});

// Verifica sessão do usuário
function checkSession() {
    const session = localStorage.getItem('mindcare_session');
    
    if (!session) {
        window.location.href = '../index.html';
        return null;
    }
    
    return JSON.parse(session);
}

// Atualiza informações do usuário na interface
function updateUserInfo(session) {
    const userName = document.querySelector('.user-name');
    const userAvatar = document.querySelector('.user-avatar');
    
    if (userName && session.nome) {
        userName.textContent = session.nome;
    }
    
    if (userAvatar && session.nome) {
        userAvatar.src = `[ui-avatars.com](https://ui-avatars.com/api/?name=${encodeURIComponent(session.nome)}&background=6366f1&color=fff)`;
    }
}

// Inicializa funcionalidade da sidebar
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Fecha sidebar ao clicar fora em mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
}

// Inicializa botão de logout
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('mindcare_session');
            showToast('Você foi desconectado.', 'success');
            
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 500);
        });
    }
}

// Inicializa exibição da data atual
function initCurrentDate() {
    const currentDateEl = document.getElementById('currentDate');
    
    if (currentDateEl) {
        const options = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        };
        const today = new Date().toLocaleDateString('pt-BR', options);
        currentDateEl.textContent = today.charAt(0).toUpperCase() + today.slice(1);
    }
}

// Inicializa busca global
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    showToast(`Buscando por: "${query}"...`, 'info');
                    // Aqui você implementaria a busca real
                }
            }
        });
    }
}

// Função utilitária para mostrar toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('i');
    
    // Remove classes anteriores
    toast.classList.remove('success', 'error', 'warning', 'info');
    toast.classList.add(type);
    
    // Atualiza ícone
    toastIcon.className = 'fas';
    switch(type) {
        case 'success':
            toastIcon.classList.add('fa-check-circle');
            break;
        case 'error':
            toastIcon.classList.add('fa-times-circle');
            break;
        case 'warning':
            toastIcon.classList.add('fa-exclamation-circle');
            break;
        case 'info':
            toastIcon.classList.add('fa-info-circle');
            break;
    }
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Função para formatar valores monetários
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Função para formatar datas
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Função para formatar CPF
function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para formatar telefone
function formatPhone(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// Exporta funções para uso global
window.showToast = showToast;
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
