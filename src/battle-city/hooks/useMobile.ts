'use client'
import { useEffect, useState } from 'react'

export const useMobile = () => {
	const [width, setWidth] = useState(
		1000
	)
	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange)
		setWidth(window.innerWidth)
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
		}
	}, [])

	return width <= 768
}
