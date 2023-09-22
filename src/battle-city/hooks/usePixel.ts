import { useState, useEffect } from 'react'
import { Pixel } from '../types/render.types'

export const usePixel = () => {
	const [pixel, setPixel] = useState<Pixel>(4)

	useEffect(() => {
		const handleWindowResize = () => {
			const w = window.innerWidth
			if (w > 1200) {
				setPixel(4)
			} else {
				setPixel(3)
			}
		}
		handleWindowResize()
		window.addEventListener('resize', handleWindowResize)

		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [])

	return pixel
}
