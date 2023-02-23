import Search from '@/modules/search/Search'
import { RawgService } from '@/services/rawg.service'
import { IGameListResponse } from '@/types/rawgList.interface'
import { FC } from 'react'
import styles from './GameSearch.module.scss'
import { transformResponse } from './utils/transformResponse'

const GameSearch: FC = () => {
	return (
		<section className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Search for games</h1>
				<Search<IGameListResponse>
					transformResponse={transformResponse}
					onGoTo={(link: string) => console.log(link)}
					onSearch={RawgService.getGameList}
				/>
			</div>
		</section>
	)
}

export default GameSearch
