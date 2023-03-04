import { IGameListItem } from '@/types/rawgList.interface'
import Image from '@/ui/image/Image'
import { forwardRef } from 'react'
import styles from './GameList.module.scss'

const GameListItem = forwardRef<HTMLElement, IGameListItem>(
	({ rating, background_image, name }, ref) => {
		return (
			<article ref={ref} className={styles.container}>
				<div className={styles.img_container}>
					<Image src={background_image} alt='Game poster' />
				</div>
				<div className={styles.content_wrapper}>
					<div className={styles.head_content}>
						<h2>{name}</h2>
						<p>
							Rating:{' '}
							<span
								className={`${
									+rating > 4
										? 'text-complimentary-200'
										: +rating > 3.2
										? 'text-amber-500'
										: 'text-red-500'
								}`}
							>
								{' '}
								{rating ? rating : 'No Data'}
							</span>
						</p>
					</div>
					<div className={styles.body_content}>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
							odit dignissimos labore provident eum iure laboriosam! Tempora
							exercitationem totam iste debitis, numquam voluptatem, porro
							adipisci qui laudantium tenetur labore. Voluptatum.
						</p>
					</div>
				</div>
			</article>
		)
	}
)

export default GameListItem
