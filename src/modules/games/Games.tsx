import GameList from '@/components/game-list/GameList'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { RawgService } from '@/services/rawg.service'
import { IGameListItem } from '@/types/rawgList.interface'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { transformResponse } from '../search/utils/transformResponse'

const Games: FC = () => {
	const [results, setResults] = useState<IGameListItem[]>([])
	const router = useRouter()
	const query = router.query.q
	const stored = useTypedSelector(state => state.gameSearch)

	useEffect(() => {
		if ((stored as any)[query as string])
			return setResults((stored as any)[query as string])

		const handleFetch = () => {
			RawgService.getGameList(query as string, 10)
				.then(res => setResults(res.data.results))
				.catch(e => console.error(e))
		}
		handleFetch()
	}, [])

	return <GameList list={results || []} />
}

export default Games
