-- Script para criar usuário ADMIN
-- Execute este script no MySQL Workbench após iniciar o backend pela primeira vez

-- 1. Inserir endereço para o admin
INSERT INTO endereco (cep, rua, numero, bairro, cidade, estado, complemento)
VALUES ('00000-000', 'Rua Admin', '1', 'Centro', 'Cidade', 'UF', 'Sala Admin');

-- 2. Inserir usuário admin
-- Email: admin@mercado.com
-- Senha: admin123
INSERT INTO usuario (nome, email, cpf, senha, telefone, tipo, endereco_id)
VALUES (
  'Administrador do Sistema',
  'admin@mercado.com',
  '00000000000',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCa',
  '(00) 00000-0000',
  'ADMIN',
  LAST_INSERT_ID()
);

-- Verificar se foi criado com sucesso
SELECT u.id, u.nome, u.email, u.tipo, e.rua, e.cidade
FROM usuario u
INNER JOIN endereco e ON u.endereco_id = e.id
WHERE u.email = 'admin@mercado.com';
