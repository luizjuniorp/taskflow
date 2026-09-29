# 🚀 TaskFlow — Gerenciador de Tarefas Full Stack

O **TaskFlow** é uma aplicação web completa (Full Stack) desenvolvida para o gerenciamento de tarefas diárias. O projeto foi construído do zero como parte dos meus estudos de desenvolvimento de software, permitindo colocar em prática a integração entre uma interface web moderna e uma API RESTful conectada a um banco de dados relacional.

---

## 🛠️ Tecnologias Utilizadas

### **Front-end**
- **React.js** com **Vite** (Interface reativa e de alta performance)
- **Tailwind CSS v4** (Estilização moderna e responsiva)
- **JavaScript (ES6+)**

### **Back-end**
- **Node.js** com **Express** (Criação e gerenciamento das rotas da API RESTful)
- **PostgreSQL** (Banco de dados relacional para persistência de dados)
- **node-postgres (`pg`)** (Driver nativo para comunicação entre Node.js e Postgres)
- **CORS** & **dotenv** (Segurança na comunicação e gerenciamento de variáveis de ambiente)

---

## 📌 Funcionalidades (CRUD Completo)

- [x] **Criar tarefas:** Adiciona novas tarefas informando título e descrição opcional.
- [x] **Listar tarefas:** Exibe a lista completa de tarefas cadastradas diretamente do PostgreSQL.
- [x] **Atualizar status:** Alterna o estado das tarefas entre pendente e concluída.
- [x] **Excluir tarefas:** Remove registros do banco de dados com atualização dinâmica da interface.

---


Processo de Desenvolvimento & Uso de IA
Este projeto foi desenvolvido com foco no aprendizado prático de desenvolvimento web e arquitetura de software. Todo o processo de estruturação do banco de dados, criação da API, desenvolvimento dos componentes em React e explicações conceituais linha por linha foi realizado com o suporte do Gemini (Google AI), atuando como tutor interativo e parceiro de aprendizado.

Desenvolvido por Luiz Junior Pinheiro de Almeida

## 💻 Como Rodar o Projeto Localmente

### **Pré-requisitos**
- Node.js instalado na máquina.
- PostgreSQL e pgAdmin 4 instalados.

### **Passo a Passo**

1. **Configuração do Banco de Dados:**
   No PostgreSQL, crie o banco de dados `taskflow_db` e execute o script SQL abaixo para estruturar a tabela:

```sql
CREATE DATABASE taskflow_db;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
