import { forwardRef } from 'react'
import { IField } from './Field.interface'
import styles from './Field.module.scss'

const Field = forwardRef<HTMLInputElement, IField>(
	({ type = 'text', style, ...rest }, ref) => {
		return (
			<input ref={ref} className={styles.input} type={type} {...rest}></input>
		)
	}
)

export default Field
