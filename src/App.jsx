import { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { DEFAULT_TASKS, STORAGE_KEY } from './constants';

const stringArrayToObjects = (strings) =>
  strings.map((text) => ({
    id: crypto.randomUUID(),
    text,
  }));

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return stringArrayToObjects(parsed);
        }
      }
    } catch (e) {}
    return stringArrayToObjects(DEFAULT_TASKS);
  });

  useEffect(() => {
    const texts = tasks.map((t) => t.text);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(texts));
  }, [tasks]);

  const handleAdd = (text) => {
    const newTask = { id: crypto.randomUUID(), text };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleDuplicate = (id) => {
    setTasks((prev) => {
      const taskToCopy = prev.find((task) => task.id === id);
      if (!taskToCopy) return prev;

      const copy = { id: crypto.randomUUID(), text: taskToCopy.text };
      return [copy, ...prev];
    });
  };

  const handleUpdate = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: trimmed } : task
      )
    );
  };

  return (
    <div className="body">
      <main className="main">
        <section className="to-do">
          <h1 className="to-do__title">Список дел</h1>
          <AddTaskForm onAdd={handleAdd} />
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onUpdate={handleUpdate}
          />
        </section>
      </main>
      <footer className="footer">© Yandex.Praktikum 2025</footer>
    </div>
  );
}

export default App;
