const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite que a API receba dados no formato JSON no corpo das requisições

// ==========================================
// ROTAS DA API (CRUD)
// ==========================================

// 1. BUSCAR TODAS AS TAREFAS (GET /tasks)
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
});

// 2. CRIAR UMA NOVA TAREFA (POST /tasks)
app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTasks = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(newTasks.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
});

// 3. ATUALIZAR STATUS DE CONCLUÍDO (PUT /tasks/:id)
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const updatedTask = await pool.query(
      'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    );

    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
  }
});

// 4. DELETAR UMA TAREFA (DELETE /tasks/:id)
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    res.json({ message: 'Tarefa deletada com sucesso!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao deletar tarefa.' });
  }
});

// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});