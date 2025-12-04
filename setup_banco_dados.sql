-- =====================================================
-- SCRIPT DE CONFIGURAÇÃO DO BANCO DE DADOS
-- Sistema: Mercado Online
-- =====================================================

-- 1. CRIAR O BANCO DE DADOS
DROP DATABASE IF EXISTS pro1;
CREATE DATABASE pro1 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pro1;

-- 2. CRIAR TABELA DE USUÁRIOS
CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('ADMIN', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. CRIAR TABELA DE ENDEREÇOS
CREATE TABLE endereco (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    usuario_id BIGINT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. CRIAR TABELA DE PRODUTOS
CREATE TABLE produto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    modelo VARCHAR(50),
    cor VARCHAR(30),
    tamanho VARCHAR(20),
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. CRIAR TABELA DE CARRINHO
CREATE TABLE carrinho (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_cpf VARCHAR(14) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_cpf) REFERENCES usuario(cpf) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. CRIAR TABELA DE ITENS DO CARRINHO
CREATE TABLE item_carrinho (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    carrinho_id BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (carrinho_id) REFERENCES carrinho(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produto(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. CRIAR TABELA DE VENDAS
CREATE TABLE vendas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_cpf VARCHAR(14) NOT NULL,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'CONCLUIDA',
    FOREIGN KEY (usuario_cpf) REFERENCES usuario(cpf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INSERIR DADOS INICIAIS
-- =====================================================

-- 8. INSERIR USUÁRIO ADMINISTRADOR
-- Senha: admin123 (você deve alterá-la após o primeiro login)
INSERT INTO usuario (nome, cpf, email, senha, tipo) VALUES
('Administrador', '000.000.000-00', 'admin@mercado.com', 'admin123', 'ADMIN');

-- 9. INSERIR USUÁRIO CLIENTE DE TESTE
-- Senha: cliente123
INSERT INTO usuario (nome, cpf, email, senha, tipo) VALUES
('Cliente Teste', '111.111.111-11', 'cliente@teste.com', 'cliente123', 'CLIENTE');

-- 10. INSERIR PRODUTOS DE EXEMPLO
INSERT INTO produto (nome, modelo, cor, tamanho, preco, quantidade) VALUES
('Camiseta Básica', 'CB-2024', 'Preta', 'M', 49.90, 100),
('Calça Jeans', 'CJ-Slim', 'Azul', '42', 129.90, 50),
('Tênis Esportivo', 'TE-Run', 'Branco', '40', 249.90, 30),
('Jaqueta Corta-Vento', 'JC-Sport', 'Vermelho', 'G', 199.90, 25),
('Bermuda Tactel', 'BT-Fit', 'Verde', 'P', 79.90, 60);

-- =====================================================
-- CRIAR ÍNDICES PARA MELHOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_usuario_cpf ON usuario(cpf);
CREATE INDEX idx_usuario_email ON usuario(email);
CREATE INDEX idx_produto_nome ON produto(nome);
CREATE INDEX idx_carrinho_usuario ON carrinho(usuario_cpf);
CREATE INDEX idx_vendas_usuario ON vendas(usuario_cpf);

-- =====================================================
-- VERIFICAÇÃO FINAL
-- =====================================================

-- Mostrar informações do banco
SELECT
    'Banco de dados criado com sucesso!' as Status,
    DATABASE() as 'Banco Atual',
    (SELECT COUNT(*) FROM usuario) as 'Total Usuários',
    (SELECT COUNT(*) FROM produto) as 'Total Produtos';

-- Mostrar usuários criados
SELECT
    id, nome, cpf, email, tipo, created_at
FROM usuario;

-- Mostrar produtos criados
SELECT
    id, nome, modelo, cor, tamanho, preco, quantidade
FROM produto;

-- =====================================================
-- INSTRUÇÕES DE USO:
-- =====================================================
-- 1. Abra o MySQL Workbench
-- 2. Conecte-se ao servidor MySQL (localhost)
-- 3. Cole este script inteiro
-- 4. Execute o script completo (Ctrl+Shift+Enter)
-- 5. O banco 'pro1' será criado com todas as tabelas
-- 6. Use as seguintes credenciais para login:
--
--    ADMIN:
--    Email: admin@mercado.com
--    Senha: admin123
--
--    CLIENTE:
--    Email: cliente@teste.com
--    Senha: cliente123
-- =====================================================
