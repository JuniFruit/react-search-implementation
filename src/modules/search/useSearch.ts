import { IResultItem } from '@/modules/search/components/search-results/Results.interface'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useDebounce } from '@/modules/search/utils/useDebounce'

import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { addToCache, retrieveFromCache } from './cache/searchCache'
import { ISearch } from './Search.interface'

export function useSearch<T>({
	transformResponse,
	onGoTo,
	onSearch
}: ISearch<T>) {
	const [results, setResults] = useState<IResultItem[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const { ref, setIsShow, isShow } = useClickOutside(false)
	const debounced = useDebounce(searchTerm, 200)

	const handleInputClick = useCallback((value: string) => {
		console.log(value)
		setIsShow(true)
	}, [])

	const handleGoTo = useCallback(() => {
		onGoTo('')
	}, [])

	const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
		setSearchTerm(e.target.value)
	}, [])

	const handleSearch = useCallback(async () => {
		const raw = await onSearch(searchTerm)
		const transformed = transformResponse(raw)
		setResults(prev => transformed)
		addToCache(searchTerm, transformed)
	}, [searchTerm])

	useEffect(() => {
		const fromCache = retrieveFromCache(searchTerm)
		if (fromCache !== undefined && fromCache.length !== 0)
			return setResults([...fromCache])

		handleSearch()
	}, [debounced])

	return {
		handlers: {
			handleChange,
			handleGoTo,
			handleInputClick
		},
		results,
		isShow,
		ref
	}
}
