-- =====================================================
-- MindCare - Script de Criação do Banco de Dados
-- Sistema de Gestão Psicológica
-- =====================================================

-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS mindcare
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE mindcare;

-- =====================================================
-- Tabela: usuarios
-- Armazena os dados dos psicólogos/usuários do sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    crp VARCHAR(20),
    telefone VARCHAR(20),
    especialidades TEXT,
    foto_url VARCHAR(255),
    role ENUM('admin', 'psicologo') DEFAULT 'psicologo',
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabela: pacientes
-- Armazena os dados dos pacientes
-- =====================================================
CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(14),
    data_nascimento DATE,
    genero ENUM('masculino', 'feminino', 'outro', 'prefiro_nao_dizer'),
    endereco TEXT,
    tratamento ENUM('individual', 'casal', 'grupo', 'avaliacao') DEFAULT 'individual',
    valor_sessao DECIMAL(10, 2) DEFAULT 250.00,
    observacoes TEXT,
    status ENUM('ativo', 'inativo', 'alta') DEFAULT 'ativo',
    psicologo_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (psicologo_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- =====================================================
-- Tabela: consultas
-- Armazena os agendamentos de consultas
-- =====================================================
CREATE TABLE IF NOT EXISTS consultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    psicologo_id INT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    duracao INT DEFAULT 50,
    tipo ENUM('individual', 'casal', 'grupo', 'avaliacao', 'retorno') DEFAULT 'individual',
    status ENUM('agendada', 'confirmada', 'realizada', 'cancelada', 'falta') DEFAULT 'agendada',
    observacoes TEXT,
    anotacoes_sessao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (psicologo_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =====================================================
-- Tabela: financeiro
-- Controle de receitas e despesas
-- =====================================================
CREATE TABLE IF NOT EXISTS financeiro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('receita', 'despesa') NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50),
    data DATE NOT NULL,
    status ENUM('pago', 'pendente', 'atrasado', 'cancelado') DEFAULT 'pendente',
    forma_pagamento VARCHAR(50),
    paciente_id INT,
    consulta_id INT,
    psicologo_id INT,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE SET NULL,
    FOREIGN KEY (consulta_id) REFERENCES consultas(id) ON DELETE SET NULL,
    FOREIGN KEY (psicologo_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- =====================================================
-- Tabela: configuracoes
-- Configurações do sistema por usuário
-- =====================================================
CREATE TABLE IF NOT EXISTS configuracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    chave VARCHAR(50) NOT NULL,
    valor TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_config (usuario_id, chave)
);

-- =====================================================
-- Dados Iniciais
-- =====================================================

-- Usuário administrador padrão (senha: admin123)
INSERT INTO usuarios (nome, email, senha, crp, role) VALUES
('Dr. Carlos Silva', 'admin@mindcare.com', 'admin123', '06/123456', 'admin');

-- Alguns pacientes de exemplo
INSERT INTO pacientes (nome, email, telefone, cpf, tratamento, status, psicologo_id) VALUES
('Maria Santos', 'maria.santos@email.com', '(11) 98765-4321', '123.456.789-00', 'individual', 'ativo', 1),
('João Oliveira', 'joao.oliveira@email.com', '(11) 91234-5678', '987.654.321-00', 'avaliacao', 'ativo', 1),
('Ana Costa', 'ana.costa@email.com', '(11) 94567-8901', '456.789.123-00', 'individual', 'ativo', 1),
('Pedro Lima', 'pedro.lima@email.com', '(11) 97654-3210', '789.123.456-00', 'individual', 'ativo', 1),
('Carla Mendes', 'carla.mendes@email.com', '(11) 93456-7890', '321.654.987-00', 'casal', 'ativo', 1);

-- Algumas consultas de exemplo
INSERT INTO consultas (paciente_id, psicologo_id, data, hora, tipo, status) VALUES
(1, 1, CURDATE(), '09:00:00', 'individual', 'confirmada'),
(2, 1, CURDATE(), '10:00:00', 'avaliacao', 'agendada'),
(3, 1, CURDATE(), '11:00:00', 'individual', 'confirmada'),
(4, 1, CURDATE(), '14:00:00', 'individual', 'agendada'),
(5, 1, CURDATE(), '15:00:00', 'casal', 'confirmada');

-- Algumas transações financeiras de exemplo
INSERT INTO financeiro (tipo, descricao, valor, categoria, data, status, paciente_id, psicologo_id) VALUES
('receita', 'Consulta - Maria Santos', 250.00, 'consulta', CURDATE(), 'pago', 1, 1),
('receita', 'Avaliação - João Oliveira', 350.00, 'avaliacao', CURDATE(), 'pendente', 2, 1),
('despesa', 'Aluguel do Consultório', 1800.00, 'aluguel', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'pago', NULL, 1),
('receita', 'Consulta - Ana Costa', 250.00, 'consulta', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'pago', 3, 1),
('despesa', 'Material de Escritório', 85.00, 'material', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 'pago', NULL, 1);

-- =====================================================
-- Índices para melhor performance
-- =====================================================
CREATE INDEX idx_pacientes_status ON pacientes(status);
CREATE INDEX idx_pacientes_psicologo ON pacientes(psicologo_id);
CREATE INDEX idx_consultas_data ON consultas(data);
CREATE INDEX idx_consultas_paciente ON consultas(paciente_id);
CREATE INDEX idx_consultas_psicologo ON consultas(psicologo_id);
CREATE INDEX idx_financeiro_data ON financeiro(data);
CREATE INDEX idx_financeiro_tipo ON financeiro(tipo);
CREATE INDEX idx_financeiro_status ON financeiro(status);
