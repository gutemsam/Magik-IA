# 💫 Magik IA

Este projeto é composto por duas partes:

* **Frontend**: Interface visual feita com React.
* **Backend**: Servidor com Node.js e Express, que gerencia usuários e autenticação.

---

## 📁 Estrutura de Pastas

```
magik-backup/
├── backend/
│   ├── controllers/         ← Funções de login, cadastro, etc.
│   ├── database/            ← Arquivo SQLite para salvar usuários
│   ├── routes/              ← Rotas da API (login, register, users)
│   ├── .env                 ← Variáveis de ambiente
│   ├── app.js               ← Arquivo principal do backend
│   └── package.json         ← Dependências e scripts do backend
│
└── frontend/
    ├── public/              ← Arquivos públicos do React
    ├── src/
    │   ├── components/      ← Componentes reutilizáveis (Login, Cadastro)
    │   ├── pages/           ← Páginas principais (Adm, User, Home)
    │   ├── App.js           ← Configuração de rotas
    │   ├── index.js         ← Ponto de entrada React
    │   └── login.css        ← Estilo do login
    └── package.json         ← Dependências e scripts do frontend
```

---

## 🚀 Como executar o projeto

### 🖥 Backend

1. Abra o terminal e vá até a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm run dev
```

> O backend será executado em `http://localhost:3001`.

---

### 💻 Frontend

1. Em outro terminal, vá até a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o React:

```bash
npm start
```

> O frontend será executado em `http://localhost:3000`.

---

## 🧠 Funcionalidades

* **Login de usuário**

  * Se for admin (e-mail específico), vai para `/adm`
  * Caso contrário, vai para `/user`
* **Cadastro de novo usuário**

  * Registra e armazena no banco SQLite
* **Banco de dados SQLite**

  * Armazena os dados em `./backend/database/database.db`
* **Validação de login**

  * Verifica se o usuário e a senha existem no banco de dados

---

## 🔐 Admin padrão

Você pode configurar o e-mail e senha do admin diretamente no `Login.js`:

```js
const emailAdmin = "thesam0606@gmail.com"; 
const senhaAdmin = "123";
```

---

## 🛠 Tecnologias usadas

* **Frontend**: React, React Router
* **Backend**: Node.js, Express
* **Banco de Dados**: SQLite
* **Ferramentas**: Nodemon, dotenv


