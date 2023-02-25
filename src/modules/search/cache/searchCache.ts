import { IResultItem } from '@/modules/search/components/search-results/Results.interface'

interface ISeachCache {
	term: IResultItem[]
}

const cache: ISeachCache | {} = {}

export const addToCache = (searchTerm: string, dataToCache: IResultItem[]) => {
	console.log(cache)
	;(cache as any)[searchTerm] = dataToCache
}

export const retrieveFromCache = (searchTerm: string) => {
	return (cache as any)[searchTerm]
}
