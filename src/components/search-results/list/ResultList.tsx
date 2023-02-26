import { makeid } from '@/utils/general.utils'
import { FC } from 'react'
import { ISearchResults } from '../Results.interface'
import styles from './List.module.scss'
import ResultItem from './ResultItem'

const ResultList: FC<ISearchResults> = ({
	searchResults,
	suggestions,
	onItemDelete,
	onItemClick
}) => {
	return (
		<ul className={styles.list}>
			<>
				{suggestions?.map(item => (
					<ResultItem
						onClick={() => onItemClick(item)}
						value={item}
						resid={0}
						description={'last search'}
						isFromCache={true}
						onDeleteCached={onItemDelete}
						key={makeid()}
					/>
				))}
				{searchResults.map(result => (
					<ResultItem
						onClick={() => onItemClick(result.value)}
						value={result.value}
						thumbnail={result.thumbnail}
						description={result.description}
						resid={result.resid}
						key={result.resid}
					/>
				))}
			</>
		</ul>
	)
}

export default ResultList
