import { IGameListItem } from '@/types/rawgList.interface'
import { Spinner } from '@/ui/loading/Spinner'
import { forwardRef } from 'react'
import GameListItem from './GameListItem'

interface IGameList {
	list: IGameListItem[]
	isLoading: boolean
	isError: boolean
	errMsg?: string
}

const GameList = forwardRef<HTMLElement, IGameList>(
	({ list, isLoading, isError, errMsg }, ref) => {
		return (
			<section className='flex flex-col gap-5 px-10'>
				{list.map((gameItem, ind) => {
					if (ind + 1 === list.length)
						return (
							<GameListItem ref={ref} {...{ ...gameItem }} key={gameItem.id} />
						)
					return <GameListItem {...{ ...gameItem }} key={gameItem.id} />
				})}
				{isLoading ? <Spinner /> : null}
				{isError ? (
					<h2 className='my-5 text-center text-base font-bold text-white'>
						{errMsg}
					</h2>
				) : null}
			</section>
		)
	}
)

export default GameList
