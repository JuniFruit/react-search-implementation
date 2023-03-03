import { makeid } from '@/utils/general.utils'
import { FC, forwardRef, KeyboardEventHandler, useCallback } from 'react'
import { ISearchResults } from '../Results.interface'
import styles from './List.module.scss'
import ResultItem from './ResultItem'

const ResultList = forwardRef<HTMLUListElement, ISearchResults>(
	({ searchResults, suggestions, onItemDelete, onItemClick }, ref) => {
		const handleKeyPress = useCallback((query: string, code: string) => {
			if (code === 'Enter') onItemClick(query)
		}, [])

		return (
			<ul className={styles.list} ref={ref}>
				<>
					{suggestions?.map(item => (
						<ResultItem
							onClick={() => onItemClick(item)}
							value={item}
							resid={0}
							description={'last search'}
							isFromCache={true}
							onDeleteCached={onItemDelete}
							onKeyDown={e => handleKeyPress(item, e.code)}
							key={makeid()}
						/>
					))}
					{searchResults.map(result => (
						<ResultItem
							onClick={() => onItemClick(result.value)}
							value={result.value}
							thumbnail={result.thumbnail}
							description={result.description}
							onKeyDown={e => handleKeyPress(result.value, e.code)}
							resid={result.resid}
							key={result.resid}
						/>
					))}
				</>
			</ul>
		)
	}
)

export default ResultList
