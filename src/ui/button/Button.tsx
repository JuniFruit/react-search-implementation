import { FC, PropsWithChildren } from 'react'
import { IButton } from './Button.interface'
import styles from './Button.module.scss'

export const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<button
			{...rest}
			className={`${styles.main} ${className ? className : ''}`}
			tabIndex={0}
		>
			{children}
		</button>
	)
}
