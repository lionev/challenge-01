import {useState} from 'react'
import { PlusCircle } from '@phosphor-icons/react'

import styles from './Input.module.css'

interface InputProps {
    handleCreateNewTask: (taskDescription: string) => void
}

export function Input(props: InputProps) {
    const [description, setDescription] = useState('')
    
    function handleCreateNewTask() {
        if(description === '') {
            return
        } else {
            props.handleCreateNewTask(description)
            setDescription('')
        }
    }
    
    return (
        <section className={styles.createTaskForm}>
            <input 
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Adicione uma nova tarefa" />
            
            <button
                type="button"
                onClick={handleCreateNewTask}>
                Criar
                <PlusCircle size={24} />
            </button>
        </section>
    )
}