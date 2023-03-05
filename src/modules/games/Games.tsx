import GameListItem from '@/components/game-list/GameListItem'
import { useInfiniteScroll } from '@/hooks/pagination/useInfiniteScroll'
import { useGetGames } from '@/hooks/useGetGames'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Button } from '@/ui/button/Button'
import { Spinner } from '@/ui/loading/Spinner'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { IGameSliceState } from '../search/store/gameSearchSlice'
import styles from './Games.module.scss'

const Games: FC = () => {
	const router = useRouter()
	const query = router.query.q as keyof IGameSliceState
	const stored = useTypedSelector(
		state => state.gameSearch.queries[query] || {}
	)
	const storedIds = stored.ids || []
	const {
		status: { isError, isLoading, errMsg },
		fetchGames
	} = useGetGames()

	const handleGetNext = (currPage: number) => {
		fetchGames(query as string, 10, currPage + 1)
	}

	useEffect(() => {
		if (!storedIds.length || !query) fetchGames(query as string, 10, 1)
	}, [query])

	useEffect(() => {
		if (storedIds.length) {
			const scrollPosition = sessionStorage.getItem('scrollPosition')
			if (scrollPosition) {
				window.scrollTo(0, parseInt(scrollPosition, 10))
				sessionStorage.removeItem('scrollPosition')
			}
		}
	}, [stored])

	const { lastElRef } = useInfiniteScroll({
		onRequestNext: handleGetNext,
		isLoading,
		startPage: stored.next || 1
	})

	return (
		<section className={styles.wrapper}>
			{storedIds.map((id, ind) => {
				if (ind + 1 === storedIds.length)
					return <GameListItem ref={lastElRef} id={id} key={id} />
				return <GameListItem id={id} key={id} />
			})}
			{isLoading ? <Spinner /> : null}
			{isError ? <h2>{errMsg}</h2> : null}
			{storedIds.length ? (
				<Button onClick={() => window.scrollTo(0, 0)}>Back to top</Button>
			) : null}
		</section>
	)
}

export default Games
