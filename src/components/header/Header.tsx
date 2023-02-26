import { Logo } from '@/ui/logo/Logo'
import { FC, PropsWithChildren } from 'react'
import styles from './Header.module.scss'

const Header: FC<PropsWithChildren> = ({ children }) => {
	return (
		<header className={styles.container}>
			<Logo />
			<div>{children}</div>
			<div></div>
		</header>
	)
}

export default Header
