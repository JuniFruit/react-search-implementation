import SearchInput from '@/components/search-input/SearchInput'
import ResultList from '@/components/search-results/list/ResultList'
import SearchResultsWrapper from '@/components/search-results/SearchResults'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useSearch } from '@/hooks/search/useSearch'
import { IGameListItem } from '@/types/rawgList.interface'
import { FC, useCallback } from 'react'
import styles from './GameSearch.module.scss'
import { RawgService } from './services/rawg.service'
import { transformResponse } from './utils/transformResponse'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/router'

const GameSearch: FC = () => {
	const { storeResults } = useActions()
	const router = useRouter()

	const handleGoTo = useCallback((query = '') => {
		router.push('/search_results')
	}, [])
	const handleOnSearch = useCallback(async (searchTerm?: string) => {
		const res = await RawgService.getGameList(searchTerm)
		storeResults({ results: res.data.results })
		return res.data.results
	}, [])

	const { isShow, ref, setIsShow } = useClickOutside(false)
	const { handlers, results, searchTerm, inputRef, suggestions } =
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
							/>
						</SearchResultsWrapper>
					) : null}
				</div>
			</div>
		</section>
	)
}

export default GameSearch
