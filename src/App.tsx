import { useEffect, useState } from 'react';
import { Heading } from './components/Heading';
import { TaskContainer } from './components/TaskContainer';
import { Input }  from './components/Input'

import './global.css';
import styles from './App.module.css'

export interface Task {
  id: number,
  description: string,
  checked: boolean
}


const TaskList = [
  {
    id: 1,
    description: 'Primeira tarefa',
    checked: true
  },
  {
    id: 2,
    description: 'Estudar',
    checked: false
  },
]

export function App() {
  const [tasks, setTasks] = useState<Task[]>(TaskList)
  const [completedTasks, set] = useState(0)
  
  function handleCreateNewTask(taskDescription: string) {
    const newTask: Task = {
      id: tasks.length === 0 ? 1 : tasks.length + 1,
      description: taskDescription,
      checked: false
    }
    
    setTasks([
      ...tasks,
      newTask
    ])
  }
  
  function handleChangeTaskCheckbox(id: number) {
    const newTaskList = tasks.map(task => task.id === id ? {
      ...task,
      checked: !task.checked
    } : task)
    
    tasks.map(task => {
      if(task.id === id) {
        task.checked === false 
        ? set(completedTasks + 1) 
        : set(completedTasks - 1)
      }
    })
    setTasks(newTaskList)
  }
  
  function handleDeleteTask(id: number) {
    const newTaskList = tasks.filter(task => task.id !== id)
    setTasks(newTaskList)
  }
  
  useEffect(() => {
      tasks.filter(task => {
          if(task.checked === true) {
              set(completedTasks + 1)
          }
      }) 
  }, [tasks])

  return (
    <div>
      <Heading />
      <div className={styles.container}>
        
          <Input 
            handleCreateNewTask={handleCreateNewTask} />

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