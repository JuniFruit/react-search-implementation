import GameInfoModule from '@/modules/game-info-module/GameInfoModule'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const GamePage: NextPage = () => {
	const {
		query: { id }
	} = useRouter()

	return <GameInfoModule id={id as string} />
}

export default GamePage
