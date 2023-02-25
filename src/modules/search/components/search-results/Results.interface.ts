export interface ISearchResults {
	searchResults: IResultItem[]
}

export interface IResultItem {
	value: string
	description?: string
	thumbnail?: string
	id: string | number
}
