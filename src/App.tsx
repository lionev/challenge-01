import { useEffect, useState } from 'react';
import { Heading } from './components/Heading';
import { TaskContainer } from './components/TaskContainer';
import { Input } from './components/Input'

import './global.css';
import styles from './App.module.css'

export interface Task {
  id: number,
  description: string,
  checked: boolean
}

let idCounter = 1;
function getNextId() {
  return idCounter++;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  
  function handleCreateNewTask(taskDescription: string) {
    const newTask: Task = {
      id: getNextId(),
      description: taskDescription,
      checked: false
    }
    
    setTasks([
      ...tasks,
      newTask
    ]);
  }
  
  function handleChangeTaskCheckbox(id: number) {
    const newTaskList = tasks.map(task => task.id === id ? {
      ...task,
      checked: !task.checked
    } : task);
    
    const countCompletedTasks = newTaskList.filter(task => task.checked).length;
    setCompletedTasks(countCompletedTasks);

    setTasks(newTaskList);
  }
  
  function handleDeleteTask(id: number) {
    const newTaskList = tasks.filter(task => task.id !== id);
    setTasks(newTaskList);

    const countCompletedTasks = newTaskList.filter(task => task.checked).length;
    setCompletedTasks(countCompletedTasks);
  }

  useEffect(() => {
    const countCompletedTasks = tasks.filter(task => task.checked).length;
    setCompletedTasks(countCompletedTasks);
  }, [tasks]);

  return (
    <div>
      <Heading />
      <div className={styles.container}>
        <Input handleCreateNewTask={handleCreateNewTask} />
        <TaskContainer
          tasks={tasks}
          handleChangeTaskCheckbox={handleChangeTaskCheckbox}
          handleDeleteTask={handleDeleteTask}
          completedTasks={completedTasks}
        />
      </div>
    </div>
  )
}
