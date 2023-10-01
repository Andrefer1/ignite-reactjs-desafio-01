import { TaskCounter } from "./TaskCounter"

import styles from './Title.module.css'

interface TitleProps {
    title: string
    // counters: TaskCounter
    color: 'primary' | 'secondary'
    totalTasks: number
    totalFinishedTasks?: number
}

export function Title(props: TitleProps) {
    return (
        <div className={styles.title}>
            <div className={styles[props.color]}>{props.title}</div>

            <TaskCounter
                totalTasks={props.totalTasks}
                totalFinishedTasks={props.totalFinishedTasks}
            />
        </div>
    )
}
