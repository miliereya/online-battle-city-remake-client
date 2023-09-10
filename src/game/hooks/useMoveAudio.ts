'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

export const useMoveAudio = (
	isPlayerMoving: boolean | undefined
	// isEnemyMoving: boolean
) => {
	const [prev, setPrev] = useState(false)
	const playerMoveSound = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		playerMoveSound.current = new Audio(`/player_move.ogg`)
	}, [])
	useEffect(() => {
		if (
			isPlayerMoving !== undefined &&
			isPlayerMoving !== prev &&
			playerMoveSound.current
		) {
			isPlayerMoving
				? playerMoveSound.current.play()
				: playerMoveSound.current.pause()
			setPrev(isPlayerMoving)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlayerMoving])
}
