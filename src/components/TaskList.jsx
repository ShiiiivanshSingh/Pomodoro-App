import React, { useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">Today's Tasks</h3>
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-2">
            <input type="checkbox" checked={task.completed} />
            <span className={task.completed ? 'line-through' : ''}>
              {task.title}
            </span>
          </div>
        ))}
        <button className="text-sm text-blue-500">+ Add Task</button>
      </div>
    </div>
  );
};

export default TaskList; 