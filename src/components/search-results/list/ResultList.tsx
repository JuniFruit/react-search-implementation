import { FC } from 'react'
import ResultItem from './ResultItem'
import styles from './List.module.scss'

const ResultList: FC = () => {
	return (
		<ul className={styles.list}>
			<ResultItem value='test' />
		</ul>
	)
}

export default ResultList
