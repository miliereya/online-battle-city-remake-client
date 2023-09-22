'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

type PrevSound = null | 'player' | 'enemy'

export const useMoveAudio = (
	isPlayerMoving: boolean | undefined,
	isEnemyMoving: boolean | undefined
	// isEnemyMoving: boolean
) => {
	const [soundPrev, setSoundPrev] = useState<PrevSound>(null)
	const playerMoveSound = useRef<HTMLAudioElement | null>(null)
	const enemyMoveSound = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		playerMoveSound.current = new Audio(`/player_move.ogg`)
		enemyMoveSound.current = new Audio(`/enemy_move.ogg`)
	}, [])

	useEffect(() => {
		if (soundPrev === 'player') {
			playerMoveSound.current?.play()
			enemyMoveSound.current?.pause()
		} else if (soundPrev === 'enemy') {
			playerMoveSound.current?.pause()
			enemyMoveSound.current?.play()
		} else {
			playerMoveSound.current?.pause()
			enemyMoveSound.current?.pause()
		}
		return () => {
			enemyMoveSound.current?.pause()
			playerMoveSound.current?.pause()
		}
	}, [soundPrev])

	useEffect(() => {
		if (
			isPlayerMoving !== undefined &&
			isEnemyMoving !== undefined &&
			playerMoveSound.current &&
			enemyMoveSound.current
		) {
			if (isPlayerMoving) {
				if (soundPrev !== 'player') setSoundPrev('player')
			} else if (isEnemyMoving) {
				if (soundPrev !== 'enemy') {
					setSoundPrev('enemy')
				}
			} else {
				if (soundPrev !== null) setSoundPrev(null)
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlayerMoving, isEnemyMoving])
}
