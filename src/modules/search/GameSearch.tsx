import SearchInput from '@/components/search-input/SearchInput'
import ResultList from '@/components/search-results/list/ResultList'
import SearchResultsWrapper from '@/components/search-results/SearchResults'
import { useSearch } from '@/hooks/search/useSearch'
import { useActions } from '@/hooks/useActions'
import { useClickOutside } from '@/hooks/useClickOutside'
import { IGameListItem } from '@/types/rawgList.interface'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { RawgService } from '../../services/rawg.service'
import styles from './GameSearch.module.scss'
import { transformResponse } from './utils/transformResponse'

const GameSearch: FC = () => {
	const { storeResults } = useActions()
	const router = useRouter()
	const handleGoTo = useCallback(async (query = '') => {
		router.push(`/search_results?q=${query}`)
	}, [])

	const handleOnSearch = useCallback(async (searchTerm = '') => {
		const res = await RawgService.getGameList(searchTerm)
		storeResults({ results: res.data.results, query: searchTerm, next: 1 })
		return res.data.results
	}, [])

	const { isShow, ref, setIsShow } = useClickOutside(false)
	const { handlers, results, searchTerm, inputRef, resultsRef, suggestions } =
		useSearch<IGameListItem>({
			onSearch: handleOnSearch,
			onGoTo: handleGoTo
		})

	return (
		<section className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Search for games</h1>
				<div
					className={styles.search_container}
					ref={ref}
					onClick={() => setIsShow(true)}
					onKeyDown={() => (!isShow ? setIsShow(true) : null)}
				>
					<SearchInput
						onChange={handlers.handleChange}
						onClick={handlers.handleInputClick}
						onSubmit={handlers.handleGoTo}
						ref={inputRef}
						searchString={searchTerm}
						isResultsShowing={!!results.length && isShow}
					/>
					{results.length && isShow ? (
						<SearchResultsWrapper>
							<ResultList
								searchResults={transformResponse(results)}
								onItemClick={handlers.handleGoTo}
								suggestions={suggestions}
								onItemDelete={handlers.handleDeleteCached}
								ref={resultsRef}
							/>
						</SearchResultsWrapper>
					) : null}
				</div>
			</div>
		</section>
	)
}

export default GameSearch
