import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/tasks';

  // 1. BUSCAR TAREFAS DA API (GET)
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. CRIAR NOVA TAREFA (POST)
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const newTask = await response.json();
        // Atualiza a lista no estado local adicionando a nova tarefa no final
        setTasks([...tasks, newTask]);
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  // 3. ALTERAR STATUS DA TAREFA (PUT)
  const handleToggleComplete = async (id, currentCompleted) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !currentCompleted }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        // Atualiza a tarefa alterada dentro do array mantendo a ordem
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  // 4. DELETAR TAREFA (DELETE)
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove a tarefa deletada do array de estado local
        setTasks(tasks.filter(task => task.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  return (
    <main className="app-shell">
      <div className="taskflow">
        <header className="app-header">
          <span className="eyebrow">Seu espaço, seu ritmo</span>
          <h1>Lista de Tarefas</h1>
          <p>Um passo de cada vez. Organize o que importa.</p>
        </header>

        <form onSubmit={handleCreateTask} className="task-form">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Comece por aqui</span>
              <h2>Nova tarefa</h2>
            </div>
            <span className="leaf-mark" aria-hidden="true">✳</span>
          </div>

          <div className="form-fields">
            <input
              type="text"
              aria-label="Título da tarefa"
              placeholder="O que você precisa fazer?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              aria-label="Descrição opcional"
              placeholder="Adicione uma observação (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" className="add-button">
              <span aria-hidden="true">+</span> Adicionar tarefa
            </button>
          </div>
        </form>

        <section className="task-section">
          <div className="list-heading">
            <div>
              <span className="section-kicker">No seu tempo</span>
              <h2>Suas tarefas</h2>
            </div>
            <span className="task-count" aria-label={`${tasks.length} tarefas`}>
              {String(tasks.length).padStart(2, '0')}
            </span>
          </div>

          {loading ? (
            <p className="loading-message">Carregando suas tarefas...</p>
          ) : tasks.length === 0 ? (
            <p className="empty-state">
              <span className="empty-icon" aria-hidden="true">✳</span>
              Ainda não há tarefas por aqui.
              <span>Adicione uma nova tarefa para começar.</span>
            </p>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${
                    task.completed
                      ? 'is-completed'
                      : ''
                  }`}
                >
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id, task.completed)}
                      aria-label={`Marcar "${task.title}" como ${task.completed ? 'pendente' : 'concluída'}`}
                    />
                    <div className="task-copy">
                      <h3 className={task.completed ? 'task-title is-completed' : 'task-title'}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="task-description">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="delete-button"
                    aria-label={`Excluir "${task.title}"`}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <footer className="app-footer">Feito com calma, uma tarefa de cada vez.</footer>
    </main>
  );
}

export default App;