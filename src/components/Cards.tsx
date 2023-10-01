import { Dispatch, SetStateAction } from "react"
import { Trash } from "@phosphor-icons/react"

import { Todo } from "./TodoList"
import Checkbox from "./Checkbox"

import styles from './Cards.module.css'
import { Button } from "./Button"

interface CardsProps {
    tasks: Todo[]
    setTasks: Dispatch<SetStateAction<Todo[]>>
}

export function Cards(props: CardsProps) {
    const tasks: Todo[] = loadTasksFromLocalStorage()

    function handleDeleteTask(taskId: number): void {
        const newTasks: Todo[] = deleteTask(taskId);

        saveTasksInLocalStorage(newTasks);
    }

    function deleteTask(taskId: number): Todo[] {
        const newTasksFiltered: Todo[] = tasks.filter(
            (task: Todo) => task.id !== taskId
        )

        return newTasksFiltered
    }

    function loadTasksFromLocalStorage(): Todo[] {
        const tasks: string | null = localStorage.getItem(
            `@reactjs-desafio-01:tasks-${import.meta.env.VITE_VERSION_APP}`
        );

        return tasks ? JSON.parse(tasks) : [];
    }

    function saveTasksInLocalStorage(newTasks: Todo[]): void {
        props.setTasks(newTasks)
        const tasksToString: string = JSON.stringify(newTasks);

        localStorage.setItem(
            `@reactjs-desafio-01:tasks-${import.meta.env.VITE_VERSION_APP}`,
            tasksToString
        );
    }

    function handleUpdateTaskCheck(taskId: number): void {
        const newTasks: Todo[] | undefined = UpdateTaskCheck(taskId)

        if (!newTasks) {
            return
        }

        saveTasksInLocalStorage(newTasks)
    }

    function UpdateTaskCheck(taskId: number): Todo[] | undefined {
        const newTasks: Todo[] = [...tasks]

        const taskIndex: number = tasks.findIndex(
            (task: Todo) => task.id === taskId
        )

        if (taskIndex === -1) {
            return
        }

        newTasks[taskIndex] = {
            ...newTasks[taskIndex],
            isFinished: !newTasks[taskIndex].isFinished
        }

        return newTasks
    }

    return (
        <div className={styles.cards}>
            {props.tasks.map(task => (
                <div key={task.id} className={`${styles.card} ${task.isFinished ? styles.isFinished : ''}`}>
                    <div>
                        <Checkbox
                            id={`card-todo-${task.id}`}
                            name="todo"
                            defaultChecked={task.isFinished}
                            onChange={() => {
                                handleUpdateTaskCheck(task.id)
                            }}
                        />
                        <div>{task.content}</div>
                    </div>

                    <Button onClick={() => handleDeleteTask(task.id)}>
                        <Trash size={14} />
                    </Button>
                </div>
            ))}
        </div>
    )
}
