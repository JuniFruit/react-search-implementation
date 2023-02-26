import { useDebounce } from '@/hooks/search/utils-hooks/useDebounce'
import {
	ChangeEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import { useSeachCache } from './utils-hooks/useSearchCache'
import { ISearch, ISearchResult } from './Search.interface'

export function useSearch<T extends ISearchResult>({
	onGoTo,
	onSearch,
	delay = 200,
	isAutocompleteInline = true,
	maxCachedQueries = 15
}: ISearch<T>) {
	const [results, setResults] = useState<T[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [autocomplete, setAutocomplete] = useState<string>('')
	const [suggestions, setSuggestions] = useState<string[]>([])
	const { addToCache, retrieveFromCache } = useSeachCache<T[]>()
	const debounced = useDebounce(searchTerm, delay)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleInputClick = useCallback((value: string) => {
		_handleSuggestion(value)
	}, [])

	// saving only on submit
	const handleGoTo = useCallback((query = '') => {
		if (!query) return
		_cacheQuery(query)
		onGoTo(query)
	}, [])

	const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
		setAutocomplete('')
		setSearchTerm(e.target.value)
	}, [])

	const _retrieveQueries = useCallback((): string[] | [] => {
		const queries = window.localStorage.getItem('user_queries')
		return queries ? JSON.parse(queries) : []
	}, [])

	const _selectText = useCallback((searchQuery: string) => {
		if (!isAutocompleteInline) return
		const node = inputRef.current
		if (!node) return
		node.focus()
		node.setSelectionRange(searchQuery.length, -1)
	}, [])

	const _cacheQuery = useCallback((query: string) => {
		let queries = _retrieveQueries()
		queries = [query, ...queries]
		if (queries.length > maxCachedQueries) queries.pop()
		window.localStorage.setItem('user_queries', JSON.stringify(queries))
	}, [])

	// suggests only from cached queries
	const _handleInlineAutocomplete = useCallback(
		(searchQuery: string) => {
			const queries = _retrieveQueries()
			const query = queries.find((str: string) => {
				let temp = str.slice(0, searchTerm.length)
				return temp.toLowerCase() === searchQuery.toLowerCase()
			})
			if (!query) return
			const sliced = query.slice(searchQuery.length, -1) || ''
			if (searchQuery.length === 0 || searchQuery.length > 1) return
			setAutocomplete(sliced)
		},
		[debounced]
	)

	const handleDeleteCached = useCallback(
		(query: string) => {
			const queries = _retrieveQueries()
			const filtered = queries.filter(item => item !== query)
			window.localStorage.setItem('user_queries', JSON.stringify(filtered))

			setSuggestions(prev => prev.filter(sugg => sugg !== query))
		},
		[suggestions]
	)

	const _handleSuggestion = useCallback(
		(searchQuery: string) => {
			const queries = _retrieveQueries()
			const matches = queries.filter(str => {
				let temp = str.slice(0, searchQuery.length)
				return temp.toLowerCase() === searchQuery.toLowerCase()
			})
			setSuggestions(matches.slice(0, 5))
		},
		[debounced]
	)

	const _handleSearch = useCallback(async () => {
		const res = await onSearch(searchTerm)

		setResults(prev => [...res])
		addToCache(searchTerm, res)
	}, [searchTerm])

	useEffect(() => {
		const cached = retrieveFromCache(searchTerm)

		if (cached !== undefined && cached.length !== 0)
			return setResults([...cached])

		_handleSearch()
		_handleSuggestion(searchTerm)
	}, [debounced])

	useEffect(() => {
		if (!debounced || !isAutocompleteInline) return
		_handleInlineAutocomplete(searchTerm)
	}, [_handleInlineAutocomplete])

	useEffect(() => {
		_selectText(searchTerm)
	}, [autocomplete])

	return {
		handlers: {
			handleChange,
			handleGoTo,
			handleInputClick,
			handleDeleteCached
		},
		results,
		searchTerm: `${searchTerm}${autocomplete}`,
		inputRef,
		suggestions
	}
}
