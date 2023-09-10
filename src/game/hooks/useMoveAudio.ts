import { useEffect, useMemo, useState } from 'react'

export const useMoveAudio = (
	isPlayerMoving: boolean | undefined
	// isEnemyMoving: boolean
) => {
	const [prev, setPrev] = useState(false)
	// const [enemyMove, setEnemyMove] = useState(false)
	const playerMoveSound = useMemo(() => new Audio(`/player_move.ogg`), [])

	useEffect(() => {
		if (isPlayerMoving !== undefined && isPlayerMoving !== prev) {
			isPlayerMoving ? playerMoveSound.play() : playerMoveSound.pause()
			setPrev(isPlayerMoving)
		}
	}, [isPlayerMoving])
}
