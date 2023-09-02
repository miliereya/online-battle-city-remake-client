import { useEffect, useRef } from 'react'

export const useFrameLoop = (
	callback: (time: number, deltaTime: number) => void
) => {
	const rafId = useRef(0)
	const previousTime = useRef(0)

	useEffect(() => {
		const loop = (time: number) => {
			if (previousTime.current !== undefined) {
				const deltaTime = time - previousTime.current
				callback(time, deltaTime)
			}

			previousTime.current = time
			rafId.current = requestAnimationFrame(loop)
		}

		rafId.current = requestAnimationFrame(loop)

		console.log('changed raflOOp')

		return () => cancelAnimationFrame(rafId.current)
	}, [callback])
}
