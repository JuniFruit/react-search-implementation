import { useEffect, useState } from 'react'

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const updateSize = (): void => {
			setIsMobile(window.innerWidth < 768)
		}
		updateSize()
		window.addEventListener('resize', updateSize)

		return (): void => window.removeEventListener('resize', updateSize)
	}, [isMobile])

	return { isMobile }
}
