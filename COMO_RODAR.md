# 🚀 Como Rodar o Projeto

## Pré-requisitos

- **Java**: JDK 17+
- **MySQL**: Servidor rodando
- **Node.js**: v14+
- **npm**: v6+

---

## 1️⃣ Configurar Banco de Dados MySQL

```sql
CREATE DATABASE pro1;
USE pro1;
```

> **Nota**: O Spring Boot criará as tabelas automaticamente com `spring.jpa.hibernate.ddl-auto=update`

---

## 2️⃣ Rodar Backend (Spring Boot)

### Opção A: Terminal PowerShell

```powershell
cd c:\Users\aluno.den\Downloads\AtividadeT3-main\Projetomercado\ProBackend
.\mvnw.cmd spring-boot:run
```

### Opção B: Via jar compilado

```powershell
cd c:\Users\aluno.den\Downloads\AtividadeT3-main\Projetomercado\ProBackend
java -jar target\exemplo-0.0.1-SNAPSHOT.jar
```

**Backend estará disponível em**: `http://localhost:8080`

---

## 3️⃣ Rodar Frontend (React + Vite)

```powershell
cd c:\Users\aluno.den\Downloads\AtividadeT3-main\Projetomercado\profrontend
npm install  # Primeira vez
npm run dev
```

**Frontend estará disponível em**: `http://localhost:5173`

---

## 📋 Funcionalidades Disponíveis

### 🏠 Home
- Listagem de produtos em destaque
- Visualização de preço e disponibilidade

### 📝 Cadastro
- Cadastro de novo usuário
- Campos obrigatórios: Nome, Email, CPF, Telefone, Senha, Endereço completo
- Validações de tamanho de campo

### 📦 Produtos
- Listar produtos cadastrados
- Criar novo produto (código, nome, modelo, cor, tamanho, quantidade, preço)
- Editar produtos existentes
- Deletar produtos

### 🛒 Carrinho
- Buscar carrinho por CPF
- Visualizar itens no carrinho
- Remover itens
- Calcular total

### 💰 Vendas (API)
- Registrar venda (POST /vendas)
- Listar todas as vendas (GET /vendas)
- Buscar venda por ID (GET /vendas/{id})
- Deletar venda (DELETE /vendas/{id})

---

## 🔧 Troubleshooting

### Erro: "O servidor respondeu com um status de 400"
- Verifique se todos os campos obrigatórios estão preenchidos
- Certifique-se que o CPF tem exatamente 11 dígitos
- Verifique se a senha tem pelo menos 6 caracteres

### Erro: "Conexão recusada em localhost:8080"
- Verifique se o backend está rodando
- Verifique se MySQL está funcionando
- Verifique a connection string em `application.properties`

### Erro: "CORS"
- CORS já está configurado no backend
- Verifique se o frontend está na porta 5173 corretamente

---

## 📁 Estrutura do Projeto

```
Projetomercado/
├── ProBackend/          # Backend Spring Boot
│   ├── src/main/java/   # Código-fonte
│   ├── pom.xml          # Dependências Maven
│   └── mvnw/mvnw.cmd    # Maven Wrapper
└── profrontend/         # Frontend React
    ├── src/             # Código-fonte React
    ├── package.json     # Dependências npm
    └── vite.config.js   # Configuração Vite
```

---

## 📚 Endpoints da API

### Usuários
- `POST /usuario` - Criar usuário
- `GET /usuario` - Listar usuários
- `PUT /usuario/{id}` - Atualizar usuário
- `DELETE /usuario/{id}` - Deletar usuário

### Produtos
- `POST /produtos` - Criar produto
- `GET /produtos` - Listar produtos
- `PUT /produtos/{id}` - Atualizar produto
- `DELETE /produtos/{id}` - Deletar produto

### Carrinho
- `GET /carrinho/{cpf}` - Buscar carrinho
- `POST /carrinho/{cpf}/adicionar` - Adicionar item
- `DELETE /carrinho/{cpf}/remover/{produtoId}` - Remover item

### Vendas
- `POST /vendas` - Registrar venda
- `GET /vendas` - Listar vendas
- `GET /vendas/{id}` - Buscar venda por ID
- `DELETE /vendas/{id}` - Deletar venda

---

## ✅ Verificação Final

1. Abra `http://localhost:5173` no navegador
2. Navegue até "Cadastro"
3. Preencha o formulário completo
4. Clique em "Cadastrar"
5. Verifique se recebe a mensagem de sucesso
6. Acesse "Produtos" para testar CRUD
7. Acesse "Carrinho" para testar carrinho

---

Desenvolvido por: GitHub Copilot
Data: 03/12/2025
