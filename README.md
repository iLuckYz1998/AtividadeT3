# 🛒 Mercado Online - Sistema de E-commerce

Sistema completo de comércio eletrônico desenvolvido com **React** + **Spring Boot**, oferecendo uma experiência moderna e intuitiva para compras online.

![](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot)
![](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Credenciais de Teste](#credenciais-de-teste)
- [Capturas de Tela](#capturas-de-tela)
- [Autores](#autores)

---

## 🎯 Sobre o Projeto

O **Mercado Online** é uma aplicação full-stack de e-commerce que simula uma loja virtual completa. O sistema permite que clientes naveguem por produtos, adicionem itens ao carrinho e finalizem compras, enquanto administradores gerenciam o catálogo de produtos.

### 🌟 Destaques

- ✅ Interface moderna com tema dark elegante
- ✅ Sistema de autenticação com diferentes perfis (Admin/Cliente)
- ✅ Carrinho de compras dinâmico
- ✅ Gestão completa de produtos para administradores
- ✅ Design responsivo para mobile e desktop
- ✅ Validação de dados no frontend e backend

---

## ⚙️ Funcionalidades

### 👤 Para Clientes

- **Navegação de Produtos**
  - Visualização de catálogo com cards visuais atraentes
  - Informações detalhadas: preço, estoque, modelo, cor e tamanho
  - Indicação visual de produtos esgotados

- **Carrinho de Compras**
  - Adicionar produtos ao carrinho com um clique
  - Visualizar resumo do pedido em tempo real
  - Remover itens indesejados
  - Finalizar compra com confirmação

- **Sistema de Conta**
  - Cadastro de novos usuários com validação
  - Login seguro
  - Gerenciamento de dados pessoais

### 👨‍💼 Para Administradores

- **Gerenciamento de Produtos**
  - Cadastrar novos produtos
  - Editar informações existentes
  - Excluir produtos do catálogo
  - Controle de estoque

- **Painel Administrativo**
  - Acesso exclusivo via autenticação
  - Interface intuitiva para CRUD completo
  - Listagem organizada de todos os produtos

### 🔒 Segurança

- Rotas protegidas por autenticação
- Separação de permissões (Admin vs Cliente)
- Validação de dados em todas as requisições
- Proteção contra acessos não autorizados

---

## 🚀 Tecnologias Utilizadas

### Frontend

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **React** | 18.3.1 | Biblioteca para interfaces |
| **React Router** | 7.1.1 | Roteamento SPA |
| **Vite** | 6.4.1 | Build tool moderno |
| **CSS3** | - | Estilização customizada |

### Backend

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Spring Boot** | 3.x | Framework Java |
| **Spring Data JPA** | 3.x | ORM para banco de dados |
| **MySQL** | 8.0+ | Banco de dados relacional |
| **Maven** | 4.0.0 | Gerenciador de dependências |

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Java JDK](https://www.oracle.com/java/technologies/downloads/) - versão 17 ou superior
- [Node.js](https://nodejs.org/) - versão 18 ou superior
- [MySQL](https://dev.mysql.com/downloads/mysql/) - versão 8.0 ou superior
- [XAMPP](https://www.apachefriends.org/) (opcional) - Para gerenciar MySQL facilmente
- [Maven](https://maven.apache.org/download.cgi) - versão 3.8 ou superior
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (opcional) - Interface gráfica para MySQL

---

## 🔧 Instalação e Execução

### 1️⃣ Configurar o Banco de Dados

1. Inicie o **XAMPP** e ative o módulo **MySQL**

2. Abra o **MySQL Workbench** e conecte-se ao `localhost`

3. Execute o script SQL completo:

```bash
# O arquivo está na raiz do projeto
setup_banco_dados.sql
```

Este script irá:
- Criar o banco de dados `pro1`
- Criar todas as tabelas necessárias
- Inserir usuários de teste (ADMIN e CLIENTE)
- Inserir produtos de exemplo

### 2️⃣ Configurar e Executar o Backend

```bash
# Navegue até a pasta do backend
cd Projetomercado/ProBackend

# Instale as dependências
mvn clean install

# Execute o servidor Spring Boot
mvn spring-boot:run
```

O backend estará rodando em: `http://localhost:8080`

### 3️⃣ Configurar e Executar o Frontend

```bash
# Navegue até a pasta do frontend
cd Projetomercado/profrontend

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em: `http://localhost:5173` (ou 5174 se a porta 5173 estiver ocupada)

### 4️⃣ Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:5173
```

---

## 📁 Estrutura do Projeto

```
AtividadeT3-main/
│
├── Projetomercado/
│   ├── ProBackend/                    # Backend Spring Boot
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/example/exemplo/
│   │   │   │   │   ├── config/       # Configurações (CORS, Security)
│   │   │   │   │   ├── controller/   # Endpoints REST
│   │   │   │   │   ├── dto/          # Data Transfer Objects
│   │   │   │   │   ├── exception/    # Tratamento de erros
│   │   │   │   │   ├── model/        # Entidades JPA
│   │   │   │   │   ├── repository/   # Interfaces JPA
│   │   │   │   │   └── service/      # Lógica de negócio
│   │   │   │   └── resources/
│   │   │   │       └── application.properties
│   │   │   └── test/                 # Testes unitários
│   │   └── pom.xml                   # Dependências Maven
│   │
│   └── profrontend/                   # Frontend React
│       ├── public/                    # Arquivos estáticos
│       ├── src/
│       │   ├── assets/               # Imagens e ícones
│       │   ├── components/           # Componentes reutilizáveis
│       │   │   ├── Header/
│       │   │   └── Footer/
│       │   ├── pages/                # Páginas da aplicação
│       │   │   ├── Home/
│       │   │   ├── Login/
│       │   │   ├── Cadastro/
│       │   │   ├── Carrinho/
│       │   │   ├── Contato/
│       │   │   └── GerenciarProdutos/
│       │   ├── services/             # Chamadas à API
│       │   ├── App.jsx               # Componente principal
│       │   └── main.jsx              # Ponto de entrada
│       ├── package.json              # Dependências NPM
│       └── vite.config.js            # Configuração Vite
│
├── setup_banco_dados.sql             # Script de criação do banco
└── README.md                         # Este arquivo
```

---

## 🔑 Credenciais de Teste

Após executar o script SQL, você pode usar as seguintes credenciais:

### 👨‍💼 Conta Administrador
```
Email: admin@mercado.com
Senha: admin123
```

### 👤 Conta Cliente
```
Email: cliente@teste.com
Senha: cliente123
```

---

## 📸 Capturas de Tela

### 🏠 Página Inicial
Visualização da vitrine de produtos com cards modernos e informações detalhadas.

### 🛒 Carrinho de Compras
Interface intuitiva mostrando os produtos adicionados, subtotal e opção de finalizar compra.

### 👨‍💼 Painel Administrativo
Área exclusiva para gerenciamento completo do catálogo de produtos.

---

## 🎨 Características de Design

- **Tema Dark Moderno**: Interface elegante com gradientes e glassmorphism
- **Animações Suaves**: Transições e hover effects para melhor UX
- **Cards Visuais**: Produtos apresentados em cards atraentes com badges
- **Feedback Visual**: Mensagens de sucesso/erro com animações
- **Responsivo**: Layout adaptável para diferentes tamanhos de tela

---

## 🔄 Fluxo de Funcionamento

1. **Usuário acessa o site** → Visualiza produtos na Home
2. **Faz login** → Sistema autentica e armazena sessão
3. **Adiciona produtos ao carrinho** → Itens salvos no backend
4. **Finaliza compra** → Venda registrada no banco de dados
5. **Admin gerencia produtos** → CRUD completo via painel administrativo

---

## 📝 Configurações Importantes

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pro1
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```

### Frontend (vite.config.js)
```javascript
server: {
  proxy: {
    '/api': 'http://localhost:8080'
  }
}
```

---

## 🐛 Resolução de Problemas

### Erro de Conexão com Banco de Dados
- Verifique se o MySQL está rodando no XAMPP
- Confirme que o banco `pro1` foi criado
- Verifique as credenciais no `application.properties`

### Erro de CORS
- Confirme que o `CorsConfig.java` está permitindo `http://localhost:5173`
- Reinicie o backend após mudanças

### Frontend não encontra o Backend
- Verifique se o backend está rodando na porta 8080
- Confirme que a `API_BASE_URL` em `api.js` está correta

---

## 🚀 Próximas Melhorias

- [ ] Upload de imagens reais para produtos
- [ ] Filtros e busca de produtos
- [ ] Histórico de compras do cliente
- [ ] Dashboard com estatísticas para admin
- [ ] Sistema de categorias
- [ ] Avaliações de produtos
- [ ] Checkout com múltiplos endereços

---

## 👥 Autores

Desenvolvido como atividade acadêmica.

---

## 📄 Licença

Este projeto é de uso acadêmico e educacional.

---

## 🙏 Agradecimentos

- React Team pela excelente biblioteca
- Spring Boot pela robustez do framework
- Comunidade open-source pelas ferramentas incríveis

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela! ⭐**

Feito com ❤️ e ☕

</div>
