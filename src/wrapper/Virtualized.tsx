import {
	forwardRef,
	PropsWithChildren,
	useEffect,
	useRef,
	useState
} from 'react'

interface IVirtualize {
	defaultHeight?: number
	visibleOffset?: number
	itemId: number | string
	root?: HTMLElement
	isLast?: boolean
}

interface ISizes {
	[id: string | number]: number
}

const sizeCache: ISizes = {}

const Virtualized = forwardRef<HTMLDivElement, PropsWithChildren<IVirtualize>>(
	(
		{
			defaultHeight = 350,
			visibleOffset = 600,
			root = null,
			isLast = false,
			itemId,
			children
		},
		ref
	) => {
		const [isVisible, setIsVisible] = useState<boolean>(isLast)
		const placeholderHeight = useRef<number>(defaultHeight)
		const intersectionRef = useRef<HTMLDivElement>(null)
		// Set visibility with intersection observer
		useEffect(() => {
			if (intersectionRef.current) {
				const observer = new IntersectionObserver(
					entries => {
						if (typeof window !== undefined && window.requestIdleCallback) {
							window.requestIdleCallback(
								() => setIsVisible(entries[0].isIntersecting),
								{ timeout: 600 }
							)
						} else {
							setIsVisible(entries[0].isIntersecting)
						}
					},
					{ root, rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px` }
				)
				observer.observe(intersectionRef.current)
				return () => {
					if (intersectionRef.current) {
						observer.unobserve(intersectionRef.current)
					}
				}
			}
		}, [intersectionRef])

		// Set height after render
		useEffect(() => {
			if (intersectionRef.current && isVisible) {
				placeholderHeight.current = intersectionRef.current.offsetHeight
				sizeCache[itemId] = intersectionRef.current.offsetHeight
			}
		}, [isVisible, intersectionRef.current])

		if (isLast) return <div ref={ref}>{children}</div>
		return (
			<div ref={intersectionRef}>
				{isVisible ? (
					<>{children}</>
				) : (
					<div
						style={{
							height: `${sizeCache[itemId] || placeholderHeight.current}px`,
							width: `100%`
						}}
					/>
				)}
			</div>
		)
	}
)

export default Virtualized
