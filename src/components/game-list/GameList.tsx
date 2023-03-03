import { IGameListItem } from '@/types/rawgList.interface'
import { FC } from 'react'
import GameListItem from './GameListItem'

const GameList: FC<{ list: IGameListItem[] }> = ({ list }) => {
	return (
		<section className='flex flex-col gap-5 px-10'>
			{list.map(gameItem => (
				<GameListItem {...{ ...gameItem }} key={gameItem.id} />
			))}
		</section>
	)
}

export default GameList
