import { IGameByIDRes } from '@/types/rawgList.interface'
import Image from '@/ui/image/Image'
import { FC } from 'react'
import styles from './GameInfo.module.scss'

const GameInfo: FC<IGameByIDRes> = ({
	background_image,
	platforms = [],
	rating,
	name,
	description_raw,
	website
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
					<p>
						{website ? (
							<a target={'_blank'} href={website}>
								Website
							</a>
						) : null}
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
									</div>
								</div>
							))}
						</div>
					</div>
					<h2>About</h2>
					<p>{description_raw}</p>
				</div>
			</div>
		</section>
	)
}

export default GameInfo
