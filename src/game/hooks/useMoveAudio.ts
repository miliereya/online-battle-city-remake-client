'use client'
import { useEffect, useMemo, useState } from 'react'

export const useMoveAudio = (
	isPlayerMoving: boolean | undefined
	// isEnemyMoving: boolean
) => {
	const [prev, setPrev] = useState(false)
	const playerMoveSound =
		typeof Audio !== undefined && new Audio(`/player_move.ogg`)
	// const [enemyMove, setEnemyMove] = useState(false)

	useEffect(() => {
		if (
			isPlayerMoving !== undefined &&
			isPlayerMoving !== prev &&
			playerMoveSound
		) {
			isPlayerMoving ? playerMoveSound.play() : playerMoveSound.pause()
			setPrev(isPlayerMoving)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlayerMoving])
}
