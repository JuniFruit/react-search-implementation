import Image from '@/ui/image/Image'
import ThumbnailTiny from '@/ui/image/thumb/ThumbnailTiny'
import { FC } from 'react'
import { IoSearchCircleOutline } from 'react-icons/io5'
import { IResultItem } from '../Results.interface'
import styles from './List.module.scss'

const ResultItem: FC<IResultItem> = ({
	value,
	description = 'test desc',
	thumbnail
}) => {
	return (
		<li className={styles.item}>
			<ThumbnailTiny>
				{thumbnail ? <Image src={thumbnail} /> : <IoSearchCircleOutline />}
			</ThumbnailTiny>
			<div className={styles.text_wrapper}>
				<h3>{value}</h3>
				{description ? <p>{description}</p> : null}
			</div>
			<div className={styles.button_container}>
				{/* <button>delete</button> */}
			</div>
		</li>
	)
}

export default ResultItem
