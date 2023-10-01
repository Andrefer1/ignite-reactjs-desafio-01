import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { PlusCircle } from "@phosphor-icons/react"

import { Input } from "./Input"
import { Button } from "./Button"
import { Todo } from "./TodoList"

import styles from './Header.module.css'
import ToDoLogo from '../assets/todo-logo.svg'

interface HeaderProps {
    setTasks: Dispatch<SetStateAction<Todo[]>>
}

export default function Header(props: HeaderProps) {
    const [task, setTask] = useState<string>('')

    const hasTask: boolean = task !== ''

    function handleNewTask(event: FormEvent): void {
        event.preventDefault();
        const newTask = createNewTask(task);
        saveTaskInLocalStorage(newTask);
    }

    function createNewTask(task: string): Todo {
        return {
            id: new Date().getTime(),
            content: task,
            isDeleted: false,
            isFinished: false
        };
    }

    function saveTaskInLocalStorage(newTask: Todo): void {
        const tasks: Todo[] = loadTasksFromLocalStorage();

        tasks.push(newTask);

        const tasksToString: string = JSON.stringify(tasks);

        localStorage.setItem(
            `@reactjs-desafio-01:tasks-${import.meta.env.VITE_VERSION_APP}`,
            tasksToString
        );

        props.setTasks(tasks)
    }

    function loadTasksFromLocalStorage(): Todo[] {
        const tasks: string | null = localStorage.getItem(
            `@reactjs-desafio-01:tasks-${import.meta.env.VITE_VERSION_APP}`
        );

        return tasks ? JSON.parse(tasks) : [];
    }

    return (
        <header className={styles.header}>
            <img src={ToDoLogo} alt="Logo do ToDo" />

            <form className={styles.form} onSubmit={handleNewTask}>
                <Input
                    type="text"
                    placeholder='Adicione uma nova tarefa'
                    onChange={(event => {
                        setTask(event.target.value)
                    })}
                />

                <Button className={styles.button} type='submit' disabled={!hasTask} >
                    Criar <PlusCircle size={22} />
                </Button>
            </form>
        </header>
    )
}
