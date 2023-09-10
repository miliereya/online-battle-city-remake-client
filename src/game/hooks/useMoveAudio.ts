'use client'
import { useEffect, useMemo, useState } from 'react'


const playerMoveSound = new Audio(`/player_move.ogg`)

export const useMoveAudio = (
	isPlayerMoving: boolean | undefined
	// isEnemyMoving: boolean
) => {
	const [prev, setPrev] = useState(false)
	// const [enemyMove, setEnemyMove] = useState(false)

	useEffect(() => {
		if (isPlayerMoving !== undefined && isPlayerMoving !== prev) {
			isPlayerMoving ? playerMoveSound.play() : playerMoveSound.pause()
			setPrev(isPlayerMoving)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlayerMoving])
}