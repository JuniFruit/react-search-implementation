import GameList from '@/components/game-list/GameList'
import { useInfiniteScroll } from '@/hooks/pagination/useInfiniteScroll'
import { useGetGames } from '@/hooks/useGetGames'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IGameSliceState } from '../search/store/gameSearchSlice'

const Games: FC = () => {
	const router = useRouter()
	const query = router.query.q
	const stored = useTypedSelector(
		state => (state.gameSearch as any)[query as string]
	)
	const {
		status: { isError, isLoading, errMsg },
		fetchGames
	} = useGetGames()

	const handleGetNext = (currPage: number) => {
		fetchGames(query as string, 10, currPage + 1)
	}

	const { lastElRef } = useInfiniteScroll({
		onRequestNext: handleGetNext,
		isLoading,
		fireOnMount: true
	})

	return (
		<GameList
			ref={lastElRef}
			list={stored || []}
			isLoading={isLoading}
			isError={isError}
			errMsg={errMsg}
		/>
	)
}

export default Games
