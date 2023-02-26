import Link from 'next/link'
import { FC } from 'react'
import styles from './Logo.module.scss'

export const Logo: FC = () => {
	return (
		<Link
			href={'/'}
			className={styles.logo}
			title={'Go to Main Page'}
			aria-label={'Go to Main Page'}
		>
			<span>Game</span>
			<span>Searcher</span>
		</Link>
	)
}