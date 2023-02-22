import { useToast } from '@/hooks/useToast'
import { IconBtn } from '@/ui/button/icon/IconBtn'
import { FC } from 'react'
import {
	IoAlertOutline,
	IoCheckmarkCircleOutline,
	IoClose,
	IoWarningOutline
} from 'react-icons/io5'
import styles from './Toast.module.scss'

const Toast: FC = () => {
	const { type, message } = useToast()

	return (
		<div className={`${styles.message_body} ${styles[type]}`}>
			<div className={styles.message_wrapper}>
				<div className={styles.icon}>
					{type === 'success' && <IoCheckmarkCircleOutline />}
					{type === 'warning' && <IoWarningOutline />}
					{type === 'error' && <IoAlertOutline />}
				</div>
				<div className={styles.message}>
					<p>{message}</p>
				</div>
				<IconBtn
					onClick={e => {
						e.preventDefault()
					}}
					aria-label={'close'}
				>
					<IoClose />
				</IconBtn>
			</div>
		</div>
	)
}

export default Toast
