# ProFrontend - Sistema de Gerenciamento de Produtos

Frontend desenvolvido em React + Vite para se conectar ao backend Spring Boot da atividade em dupla.

## Requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend Spring Boot rodando na porta 8080

## Instalação

### 1. Instalar Node.js

Se você ainda não tem o Node.js instalado:

**Windows:**
- Baixe em: https://nodejs.org/
- Instale a versão LTS (recomendada)

**Linux (WSL/Ubuntu):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Instalar Dependências do Projeto

Abra o terminal na pasta `profrontend` e execute:

```bash
npm install
```

## Como Executar

### 1. Iniciar o Backend

Primeiro, certifique-se de que o backend Spring Boot está rodando:

```bash
cd ../ProBackend
./mvnw spring-boot:run
```

O backend deve estar rodando em: http://localhost:8080

### 2. Iniciar o Frontend

Em outro terminal, na pasta `profrontend`:

```bash
npm run dev
```

O frontend estará disponível em: http://localhost:5173

## Estrutura do Projeto

```
profrontend/
├── public/              # Arquivos públicos
├── src/
│   ├── components/      # Componentes React
│   │   ├── FormularioProduto.jsx
│   │   ├── FormularioProduto.css
│   │   ├── ListaProdutos.jsx
│   │   └── ListaProdutos.css
│   ├── services/        # Serviços de API
│   │   └── api.js
│   ├── App.jsx          # Componente principal
│   ├── App.css
│   ├── main.jsx         # Entrada da aplicação
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Funcionalidades

### Cadastro de Produtos
- Código (mínimo 3 caracteres, único)
- Nome (mínimo 3 caracteres)
- Modelo
- Cor
- Tamanho
- Quantidade (número inteiro)
- Preço (número decimal)

### Listagem de Produtos
- Visualização em cards
- Informações completas de cada produto
- Botão para deletar produtos
- Contador total de produtos
- Botão para atualizar lista

## Endpoints da API Utilizados

- `GET /produto` - Listar todos os produtos
- `POST /produto` - Cadastrar novo produto
- `PUT /produto/{id}` - Atualizar produto
- `DELETE /produto/{id}` - Deletar produto

## Tecnologias Utilizadas

- React 18
- Vite 6
- CSS3 (com variáveis CSS)
- Fetch API para requisições HTTP

## Validações Implementadas

### Frontend:
- Campos obrigatórios
- Tamanho mínimo de caracteres
- Tipos de dados corretos (número para quantidade e preço)

### Backend (conforme DTO):
- `@NotBlank` para campos de texto
- `@Size(min = 3)` para código e nome
- Validação de dados duplicados (código único)

## Tratamento de Erros

- Mensagens de erro amigáveis
- Validação de formulário
- Tratamento de erros de conexão
- Feedback visual para o usuário

## Problemas Comuns

### Backend não conecta
- Verifique se o backend está rodando na porta 8080
- Verifique se o MySQL está rodando
- Confira as configurações em `application.properties`

### Erro ao instalar dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
O backend já está configurado para aceitar requisições (SecurityConfig.java desabilita CSRF).

## Melhorias Futuras

- Implementar edição de produtos
- Adicionar paginação
- Implementar busca/filtros
- Adicionar validação de imagens
- Implementar autenticação de usuários

## Desenvolvido para

Atividade em dupla - Desenvolvimento de Frontend com Backend Spring Boot
Criação de site para um mercado conforme requisitos:
- Frontend com mínimo 5 páginas
- Backend com endpoints definidos
- Validação de entrada de dados
- Padronização de respostas (DTO)
- Verificação de exceções
