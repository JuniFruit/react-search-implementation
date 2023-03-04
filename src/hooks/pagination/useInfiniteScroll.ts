import { useCallback, useEffect, useRef, useState } from 'react'

interface IUseInfiniteScroll {
	onRequestNext: (currPage: number) => any
	isLoading: boolean
	fireOnMount?: boolean
	options?: IntersectionObserverInit
}

export const useInfiniteScroll = ({
	onRequestNext,
	isLoading,
	options = {},
	fireOnMount = false
}: IUseInfiniteScroll) => {
	const [currPage, setCurrPage] = useState(0)
	const lastElRef = useRef<HTMLElement>(null)

	const fetchNext = useCallback(() => {
		onRequestNext(currPage)
		setCurrPage(prev => prev + 1)
	}, [currPage])

	useEffect(() => {
		if (!lastElRef.current || isLoading) return
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					fetchNext()
				}
			})
		}, options)

		observer.observe(lastElRef.current)

		return () => {
			observer.disconnect()
		}
	}, [lastElRef.current, currPage, isLoading])

	useEffect(() => {
		if (fireOnMount) fetchNext()
	}, [])

	return {
		lastElRef
	}
}
