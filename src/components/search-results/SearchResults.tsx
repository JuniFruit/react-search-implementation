import { FC, PropsWithChildren } from 'react'
import styles from './SearchResults.module.scss'

const SearchResultsWrapper: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.result_container}>{children}</div>
}

export default SearchResultsWrapper
