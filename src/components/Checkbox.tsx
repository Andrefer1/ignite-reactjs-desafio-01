import { InputHTMLAttributes } from "react"

import { Input } from "./Input"

import styles from './Checkbox.module.css'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>

export default function Checkbox(props: CheckboxProps) {
    return (
        <div className={styles.checkbox}>
            <Input
                {...props}
                type="checkbox"

            />
            <label htmlFor={props.id} />
        </div>
    )
}