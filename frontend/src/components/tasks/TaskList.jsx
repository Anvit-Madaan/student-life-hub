import { useEffect, useMemo, useState } from 'react';
import api from '../../api/api';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium' });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };
    loadTasks();
  }, []);

  const visibleTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter((task) => task.priority === filter);
  }, [filter, tasks]);

  const toggleCompleted = async (id) => {
    const currentTask = tasks.find((task) => task._id === id);
    if (!currentTask) return;
    try {
      const response = await api.put(`/tasks/${id}`, { completed: !currentTask.completed });
      setTasks((items) => items.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const addTask = async (event) => {
    event.preventDefault();
    if (!newTask.title.trim()) return;
    try {
      const response = await api.post('/tasks', {
        title: newTask.title.trim(),
        priority: newTask.priority,
        completed: false
      });
      setTasks((items) => [response.data, ...items]);
      setNewTask({ title: '', priority: 'medium' });
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <div className="task-board card">
      <div className="board-header">
        <h2>Task tracker</h2>
        <p>Manage your daily to-dos and keep your completion streak going.</p>
      </div>
      <form className="inline-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add new task"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className="button primary">Add</button>
      </form>
      <div className="filter-row">
        <span>Filter:</span>
        {['all', 'high', 'medium', 'low'].map((level) => (
          <button
            key={level}
            type="button"
            className={filter === level ? 'pill active' : 'pill'}
            onClick={() => setFilter(level)}
          >
            {level === 'all' ? 'All' : level}
          </button>
        ))}
      </div>
      <ul className="task-list">
        {visibleTasks.map((task) => (
          <li key={task._id} className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
            <button type="button" className="checkbox" onClick={() => toggleCompleted(task._id)}>
              {task.completed ? '✓' : ''}
            </button>
            <span>{task.title}</span>
            <strong>{task.priority}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
