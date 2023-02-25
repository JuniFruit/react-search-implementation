import SearchInput from '@/modules/search/components/search-input/SearchInput'
import ResultList from '@/modules/search/components/search-results/list/ResultList'
import SearchResultsWrapper from '@/modules/search/components/search-results/SearchResults'
import { ISearch } from './Search.interface'
import styles from './Search.module.scss'
import { useSearch } from './useSearch'

function Search<T>(props: ISearch<T>) {
	const { handlers, results, isShow, ref } = useSearch(props)

	return (
		<div className={styles.container} ref={ref}>
			<SearchInput
				onChange={handlers.handleChange}
				onClick={handlers.handleInputClick}
				onSubmit={handlers.handleGoTo}
				isResultsShowing={!!results.length && isShow}
			/>
			{results.length && isShow ? (
				<SearchResultsWrapper>
					<ResultList searchResults={results} />
				</SearchResultsWrapper>
			) : null}
		</div>
	)
}

export default Search
