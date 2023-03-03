export interface ISearch<T extends ISearchResult> {
	onGoTo: (query: string) => void
	onSearch: (searchTerm?: string) => Promise<T[]>
	delay?: number
	isArrowsActive?: boolean
	isAutocompleteInline?: boolean
	maxCachedQueries?: number
}

export interface ISearchResult {
	id: number | string
	name: string
}
