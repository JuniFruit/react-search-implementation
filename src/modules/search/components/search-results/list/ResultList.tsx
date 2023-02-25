import { FC } from 'react'
import ResultItem from './ResultItem'
import styles from './List.module.scss'
import { IResultItem, ISearchResults } from '../Results.interface'

const ResultList: FC<ISearchResults> = ({ searchResults }) => {
	return (
		<ul className={styles.list}>
			{searchResults.map(result => (
				<ResultItem
					value={result.value}
					thumbnail={result.thumbnail}
					description={result.description}
					id={result.id}
					key={result.id}
				/>
			))}
		</ul>
	)
}

export default ResultList
