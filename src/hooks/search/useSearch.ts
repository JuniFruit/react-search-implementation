import { useDebounce } from '@/hooks/search/utils-hooks/useDebounce'
import {
	ChangeEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import { ISearch, ISearchResult } from './Search.interface'
import { useIsMobile } from './utils-hooks/useIsMobile'
import { useSeachCache } from './utils-hooks/useSearchCache'

export function useSearch<T extends ISearchResult>({
	onGoTo,
	onSearch,
	delay = 200,
	isArrowsActive = true,
	isAutocompleteInline = true,
	maxCachedQueries = 15
}: ISearch<T>) {
	const { isMobile } = useIsMobile()
	const [results, setResults] = useState<T[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [autocomplete, setAutocomplete] = useState<string>('')
	const [suggestions, setSuggestions] = useState<string[]>([])

	const { addToCache, retrieveFromCache } = useSeachCache<T[]>()
	const debounced = useDebounce(searchTerm, delay)
	const inputRef = useRef<HTMLInputElement>(null)
	const resultsRef = useRef<HTMLUListElement | HTMLOListElement>(null)

	const handleInputClick = useCallback((value: string) => {
		_handleSuggestion(value)
	}, [])

	// saving only on submit
	const handleGoTo = useCallback((query = '') => {
		if (!query) return
		_cacheQuery(query)
		onGoTo(query)
	}, [])

	const handleArrowPress = useCallback((e: any) => {
		if (!resultsRef.current) return
		const resNodes = Array.from(resultsRef.current.children)
		if (!resNodes.length) return
		let activeInd = resNodes.findIndex(item => item === document.activeElement)

		if (e.code === 'ArrowDown') {
			e.preventDefault()
			activeInd++
		}
		if (e.code === 'ArrowUp') {
			e.preventDefault()

			if (activeInd < 0) activeInd = resNodes.length
			activeInd--
		}
		resNodes[activeInd]
			? (resNodes[activeInd] as HTMLElement).focus()
			: inputRef.current?.focus()
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
		if (queries.find(q => q === query)) return
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
		try {
			const res = await onSearch(searchTerm)

			setResults([...res])
			addToCache(searchTerm, res)
		} catch (error) {}
	}, [searchTerm])

	useEffect(() => {
		if (!isArrowsActive) return
		document.body.addEventListener('keydown', handleArrowPress)

		return () => {
			document.body.removeEventListener('keydown', handleArrowPress)
		}
	}, [])

	useEffect(() => {
		const cached = retrieveFromCache(searchTerm)
		if (cached !== undefined && cached.length !== 0)
			return setResults([...cached])

		_handleSearch()
		_handleSuggestion(searchTerm)
	}, [debounced])

	useEffect(() => {
		if (!debounced || !isAutocompleteInline || isMobile) return
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
		resultsRef,
		suggestions
	}
}
