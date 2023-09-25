'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { GameSettings } from '../game/provider'

type PrevSound = null | 'player' | 'enemy'

export const useMoveAudio = (
	isPlayerMoving: boolean | undefined,
	isEnemyMoving: boolean | undefined,
	settings: GameSettings | undefined
	// isEnemyMoving: boolean
) => {
	const [soundPrev, setSoundPrev] = useState<PrevSound>(null)
	const playerMoveSound = useRef<HTMLAudioElement | null>(null)
	const enemyMoveSound = useRef<HTMLAudioElement | null>(null)
	const marioThemeSound = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		if (!settings) return
		playerMoveSound.current = new Audio(
			`/audio/${settings.soundPack}/player_move.ogg`
		)
		enemyMoveSound.current = new Audio(
			`/audio/${settings.soundPack}/enemy_move.ogg`
		)
		marioThemeSound.current = new Audio(`/audio/mario/theme.ogg`)
	}, [settings])

	useEffect(() => {
		if (soundPrev === 'player') {
			if (settings?.soundPack === 'mario') {
				marioThemeSound.current?.play()
			} else {
				playerMoveSound.current?.play()
				enemyMoveSound.current?.pause()
			}
		} else if (soundPrev === 'enemy') {
			if (settings?.soundPack === 'mario') {
				marioThemeSound.current?.play()
			} else {
				playerMoveSound.current?.pause()
				enemyMoveSound.current?.play()
			}
		} else {
			playerMoveSound.current?.pause()
			enemyMoveSound.current?.pause()
		}
		return () => {
			marioThemeSound.current?.pause()
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
