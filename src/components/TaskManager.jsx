import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskItem } from './TaskItem';

const TaskManager = () => {
  const [showNewTask, setShowNewTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setShowNewTask(false);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-manager">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskManager; 