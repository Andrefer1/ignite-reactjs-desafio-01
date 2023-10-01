import { useEffect, useState } from "react"

import { List } from "./List"
import { Title } from "./Title"

import styles from './TodoList.module.css'

export interface Todo {
    id: number
    content: string
    isFinished: boolean
    isDeleted: boolean
}

const todosListMock: Todo[] = [
    {
        id: 1,
        content: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol',
        isFinished: false,
        isDeleted: false
    },
    {
        id: 2,
        content: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
        isFinished: false,
        isDeleted: false
    },
    {
        id: 3,
        content: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
        isFinished: false,
        isDeleted: false
    },
    {
        id: 4,
        content: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
        isFinished: true,
        isDeleted: false
    },
    {
        id: 5,
        content: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
        isFinished: true,
        isDeleted: false
    },
    {
        id: 6,
        content: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
        isFinished: false,
        isDeleted: true
    }
]

interface TodoListProps {
    tasks: Todo[]
}

export default function TodoList(props: TodoListProps) {
    const [tasks, setTasks] = useState<Todo[]>([])

    const totalDeletedTask: number = tasks.filter(task => task.isDeleted).length
    const totalTasks: number = tasks.length - totalDeletedTask
    const totalFinishedTasks: number = tasks.filter(task => task.isFinished && !task.isDeleted).length

    function getTasksFromLocalStorage(): Todo[] {
        const tasks: string | null = localStorage.getItem(
            `@reactjs-desafio-01:tasks-${import.meta.env.VITE_VERSION_APP}`
        );

        return tasks ? JSON.parse(tasks) : [];
    }

    useEffect(() => {
        const tasksFromLocalStorage: Todo[] = getTasksFromLocalStorage()

        setTasks(tasksFromLocalStorage)
    }, [props.tasks])

    return (
        <div className={styles.tasks}>
            <div className={styles.titles}>
                <Title title='Tarefas criadas' color='primary' totalTasks={totalTasks} />
                <Title title='Concluídas' color='secondary' totalTasks={totalTasks} totalFinishedTasks={totalFinishedTasks} />
            </div>

            <List tasks={tasks} setTasks={setTasks} />
        </div>
    )
}
