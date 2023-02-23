import { IResultItem } from '@/components/search-results/Results.interface'

export interface ISearch<T> {
	onGoTo: (link: string) => void
	transformResponse: (res: T) => IResultItem[]
	onSearch: (searchTerm?: string) => Promise<T>
}
