import GameInfo from '@/components/game-info/GameInfo'
import { useGetGames } from '@/hooks/useGetGames'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IGameByIDRes } from '@/types/rawgList.interface'
import { FC, useEffect } from 'react'

interface IGameInfoModule {
	id: string
}

const GameInfoModule: FC<IGameInfoModule> = ({ id }) => {
	const item = useTypedSelector(state => state.gameSearch.resultsById[id])
	const { fetchById } = useGetGames()

	useEffect(() => {
		if (id) fetchById(+id)
	}, [id])

	return <GameInfo {...{ ...(item as IGameByIDRes) }} />
}

export default GameInfoModule
