import { IGameListItem } from '@/types/rawgList.interface'
import Image from '@/ui/image/Image'
import { FC } from 'react'
import styles from './GameInfo.module.scss'

const GameInfo: FC<IGameListItem> = ({
	background_image,
	platforms = [],
	rating,
	name
}) => {
	return (
		<section className={styles.container}>
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
					<div className={styles.platforms_wrapper}>
						<h2>Platforms</h2>
						<div>
							{platforms.map(platform => (
								<div className={styles.platform} key={platform.platform.id}>
									<div>
										<p>{platform.platform.name}</p>
										<p>{platform.released_at}</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
						reprehenderit ratione earum, magni molestiae illo repellendus
						quaerat atque sed laborum? Voluptatem voluptatum blanditiis
						voluptatibus nostrum mollitia dolorum voluptate vero labore!
					</p>
				</div>
			</div>
		</section>
	)
}

export default GameInfo
