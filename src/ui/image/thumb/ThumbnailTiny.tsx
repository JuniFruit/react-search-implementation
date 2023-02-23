import { FC, PropsWithChildren } from 'react'
import styles from './Thumb.module.scss'

const ThumbnailTiny: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.thumb_container}>{children}</div>
}

export default ThumbnailTiny
