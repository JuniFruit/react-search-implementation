import { Button } from '@/ui/button/Button'
import Image from '@/ui/image/Image'
import ThumbnailTiny from '@/ui/image/thumb/ThumbnailTiny'
import { FC, MouseEventHandler, useCallback } from 'react'
import { IoSearchCircleOutline } from 'react-icons/io5'
import { IResultItemComponent } from '../Results.interface'
import styles from './List.module.scss'

const ResultItem: FC<IResultItemComponent> = ({
	value,
	description = '',
	thumbnail,
	id,
	onDeleteCached,
	isFromCache = false,
	...rest
}) => {
	const handleDeleteCached: MouseEventHandler<HTMLButtonElement> = useCallback(
		e => {
			e.stopPropagation()
			!!onDeleteCached && onDeleteCached(value)
		},
		[]
	)

	return (
		<li className={styles.item} {...{ ...rest }} tabIndex={0}>
			<ThumbnailTiny>
				{thumbnail ? <Image src={thumbnail} /> : <IoSearchCircleOutline />}
			</ThumbnailTiny>
			<div className={styles.text_wrapper}>
				<h3>{value}</h3>
				{description ? <p>{description}</p> : null}
			</div>
			<div className={styles.button_container}>
				{isFromCache ? (
					<Button className={styles.clear_button} onClick={handleDeleteCached}>
						clear
					</Button>
				) : null}
			</div>
		</li>
	)
}

export default ResultItem
