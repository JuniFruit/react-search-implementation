import { RawgService } from '@/services/rawg.service'
import { useState } from 'react'
import { useActions } from './useActions'

export const useGetGames = () => {
	const { storeResults, updateItem } = useActions()
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [errMsg, setErrMsg] = useState('')

	const fetchGames = (q: string, page_size: number, nextPage: number) => {
		setIsError(false)
		setErrMsg('')
		setIsLoading(true)
		RawgService.getGameList(q, page_size, nextPage)
			.then(res => {
				storeResults({
					results: res.data.results,
					query: q,
					next: nextPage + 1
				})
			})
			.catch(e => {
				setIsError(true)
				setErrMsg(e.message)
			})
			.finally(() => setIsLoading(false))
	}

	const fetchById = (id: number) => {
		setIsError(false)
		setErrMsg('')
		setIsLoading(true)
		RawgService.getById(id)
			.then(res => {
				updateItem({
					item: res,
					id: id
				})
			})
			.catch(e => {
				setIsError(true)
				setErrMsg(e.message)
			})
			.finally(() => setIsLoading(false))
	}

	return {
		status: {
			isError,
			errMsg,
			isLoading
		},
		fetchGames,
		fetchById
	}
}
