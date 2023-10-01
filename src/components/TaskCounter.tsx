import styles from './TaskCounter.module.css'

interface TaskCounterProps {
    totalTasks: number
    totalFinishedTasks?: number
}

export function TaskCounter(props: TaskCounterProps) {
    return (
        <span className={styles.taskCounter}>
            {
                props.totalFinishedTasks !== undefined &&
                props.totalFinishedTasks >= 0 &&
                `${props.totalFinishedTasks} de `
            }{props.totalTasks}
        </span>
    )
}
