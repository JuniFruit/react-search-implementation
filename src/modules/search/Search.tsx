import SearchInput from '@/components/search-input/SearchInput'
import ResultList from '@/components/search-results/list/ResultList'
import SearchResultsWrapper from '@/components/search-results/SearchResults'
import { ISearch } from './Search.interface'
import styles from './Search.module.scss'
import { useSearch } from './useSearch'

function Search<T>(props: ISearch<T>) {
	const { handlers } = useSearch(props)

	return (
		<div className={styles.container}>
			<SearchInput
				onChange={handlers.handleChange}
				onClick={handlers.handleInputClick}
				onSubmit={handlers.handleGoTo}
			/>

			<SearchResultsWrapper>
				<ResultList />
			</SearchResultsWrapper>
		</div>
	)
}

export default Search
