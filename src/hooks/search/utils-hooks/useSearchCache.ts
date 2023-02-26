import { useRef } from 'react'

export const useSeachCache = <T>() => {
	const cache = useRef<Object>({})

	const addToCache = (searchTerm: string, results: T) => {
		;(cache.current as any)[searchTerm] = results
	}

	const retrieveFromCache = (searchTerm: string) => {
		return (cache.current as any)[searchTerm]
	}

	return {
		addToCache,
		retrieveFromCache
	}
}
