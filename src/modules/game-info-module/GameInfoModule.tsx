import GameInfo from '@/components/game-info/GameInfo'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { FC } from 'react'

interface IGameInfoModule {
	id: string
}

const GameInfoModule: FC<IGameInfoModule> = ({ id }) => {
	const item = useTypedSelector(state => state.gameSearch.resultsById[id])

	return <GameInfo {...{ ...item }} />
}

export default GameInfoModule
