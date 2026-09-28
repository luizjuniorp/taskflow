import { useState, useEffect } from 'react';

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
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        
        {/* Cabeçalho */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-500 tracking-wide">
            TaskFlow
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Gerenciador de Tarefas
          </p>
        </header>

        {/* Formulário de Criação */}
        <form 
          onSubmit={handleCreateTask} 
          className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 mb-8"
        >
          <h2 className="text-lg font-bold mb-4 text-slate-200">
            Nova Tarefa
          </h2>
          
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Título da tarefa (ex: Estudar)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              required
            />

            <textarea
              placeholder="Descrição opcional..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition h-20 resize-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer"
            >
              Adicionar Tarefa
            </button>
          </div>
        </form>

        {/* Lista de Tarefas */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-200">
            Minhas Tarefas ({tasks.length})
          </h2>

          {loading ? (
            <p className="text-slate-400 text-center py-6">Carregando tarefas...</p>
          ) : tasks.length === 0 ? (
            <p className="text-slate-500 text-center py-6 bg-slate-800/50 rounded-lg border border-dashed border-slate-700">
              Nenhuma tarefa cadastrada. Crie uma acima!
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border flex items-start justify-between gap-4 transition ${
                    task.completed
                      ? 'bg-slate-800/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800 border-slate-700 text-slate-100'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id, task.completed)}
                      className="mt-1 h-5 w-5 accent-blue-500 cursor-pointer"
                    />
                    <div>
                      <h3 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-slate-400 mt-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-400 hover:text-red-300 font-medium text-sm px-2 py-1 rounded hover:bg-red-500/10 transition cursor-pointer"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default App;