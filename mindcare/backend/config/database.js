// =====================================================
// MindCare - Configuração do Banco de Dados
// =====================================================

const mysql = require('mysql2/promise');

// Configurações de conexão com o MySQL
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mindcare',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Cria pool de conexões
const pool = mysql.createPool(dbConfig);

// Função para testar conexão
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexão com MySQL estabelecida com sucesso!');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar com MySQL:', error.message);
        return false;
    }
}

// Função para executar queries
async function query(sql, params) {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Erro na query:', error.message);
        throw error;
    }
}

module.exports = {
    pool,
    query,
    testConnection
};
