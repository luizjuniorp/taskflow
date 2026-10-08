# Lista de Tarefas — Gerenciador de Tarefas Full Stack

Lista de Tarefas é uma aplicação web para gerenciamento de tarefas. A interface em React se comunica com uma API REST em Node.js/Express, que persiste os dados no PostgreSQL.

## Tecnologias

- **Front-end:** React, Vite e Tailwind CSS
- **Back-end:** Node.js, Express e `pg`
- **Banco de dados:** PostgreSQL

## Funcionalidades

- Criar tarefas com título e descrição opcional
- Listar tarefas salvas no banco de dados
- Marcar tarefas como concluídas ou pendentes
- Excluir tarefas

## Como rodar localmente

### Pré-requisitos

- Node.js compatível com o Vite (versão 20.19+ ou 22.12+)
- npm (instalado junto com o Node.js)
- PostgreSQL instalado e em execução

### 1. Criar o banco e a tabela

No pgAdmin, abra a ferramenta **Query Tool** conectado ao servidor PostgreSQL e crie o banco:

```sql
CREATE DATABASE taskflow_db;
```

Depois, conecte-se ao banco `taskflow_db`, abra uma nova **Query Tool** para esse banco e crie a tabela:

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> O comando `CREATE DATABASE` deve ser executado separadamente, antes de criar a tabela, e a tabela deve ser criada com `taskflow_db` selecionado.

### 2. Configurar as variáveis do servidor

Na pasta `server`, crie um arquivo chamado `.env` com os dados da sua instalação do PostgreSQL:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=taskflow_db
DB_PASSWORD=sua_senha_do_postgres
DB_PORT=5432
PORT=5000
```

Substitua `DB_USER` e `DB_PASSWORD` pelos dados do seu PostgreSQL. Se o PostgreSQL estiver usando outra porta, ajuste `DB_PORT`.

### 3. Instalar as dependências

Abra um terminal na pasta `server` e instale as dependências da API:

```bash
cd server
npm install
```

Em outro terminal, na pasta `client`, instale as dependências da interface:

```bash
cd client
npm install
```

### 4. Iniciar a aplicação

Com o PostgreSQL em execução, inicie a API em um terminal:

```bash
cd server
npm run dev
```

O servidor ficará disponível em `http://localhost:5000`.

Em outro terminal, inicie a interface:

```bash
cd client
npm run dev
```

Abra no navegador o endereço informado pelo Vite no terminal (normalmente `http://localhost:5173`). Mantenha os dois terminais abertos enquanto estiver usando a aplicação.

## Rotas da API

| Método | Rota | Ação |
| --- | --- | --- |
| `GET` | `/tasks` | Lista as tarefas |
| `POST` | `/tasks` | Cria uma tarefa |
| `PUT` | `/tasks/:id` | Atualiza o status de conclusão |
| `DELETE` | `/tasks/:id` | Exclui uma tarefa |

## Solução de problemas

- **Erro de conexão com o PostgreSQL:** confira se o serviço está em execução e se `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` e `DB_NAME` no arquivo `server/.env` estão corretos.
- **Erro informando que a tabela `tasks` não existe:** confirme que a tabela foi criada dentro do banco `taskflow_db`.
- **A interface não carrega as tarefas:** confirme que a API está rodando na porta `5000` e que o PostgreSQL está acessível.

Desenvolvido por Luiz Junior Pinheiro de Almeida.
