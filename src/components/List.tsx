import { Dispatch, SetStateAction } from "react"
import { ClipboardText, } from "@phosphor-icons/react"

import { Cards } from "./Cards"
import { Todo } from "./TodoList"

import styles from './List.module.css'

interface ListProps {
    tasks: Todo[]
    setTasks: Dispatch<SetStateAction<Todo[]>>
}

export function List(props: ListProps) {
    return (
        <div className={styles.list}>

            {props.tasks.length ? (
                <Cards tasks={props.tasks} setTasks={props.setTasks} />
            ) : (
                <div className={styles.listIsEmpty}>
                    <ClipboardText size={56} color={'var(--gray-400)'} weight="light" />

                    <span>Você ainda não tem tarefas cadastradas</span>
                    <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
            )}
        </div>
    )
}
