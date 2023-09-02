'use client'

import { lobbyActions } from '@/api/socket'
import { useCallback, useEffect, useRef, useState } from 'react'
import s from './game.module.scss'
import { Objects } from './objects/objects'
import { IGame, TypeButton, TypeMoveButton } from '../types/game.types'
import { Players } from './objects/players'
import { Lobby } from './lobby'
import { Bullets } from './objects/bullets'
import { useFrameLoop } from '@/hooks/useFrameLoop'

export const Game = () => {
	const [game, setGame] = useState<IGame>()
	const block = 64
	const [movement, setMovement] = useState<TypeMoveButton | null>(null)
	const previousTime = useRef(0)

	const callbackForGameLoop = useCallback(
		(time: number, deltaTime: number) => {
			if (!movement || !game?.id) return
			if (time - previousTime.current > 16) {
				// how frequently we should input new values to sockets  (возможно нужно еще какой-то транзишен добавить, 16 это дефолт, слишком быстро, но с 30 мне кажется что недостаточно плавно)
				lobbyActions.input(movement, game.id)
				previousTime.current = time
			}
		},
		[game?.id, movement]
	)

	useFrameLoop(callbackForGameLoop)

	useEffect(() => {
		const moveHandler = (e: KeyboardEvent) => {
			// все подписки по хорошему нужно совершать в тот момент когда уже лобби есть, чтобы не было этой хрени с game?.id.
			if (!game) return
			let val: TypeMoveButton | undefined
			let code = e.code
			if (code === 'KeyW' || code === 'ArrowUp') {
				val = 'TOP'
			}
			if (code === 'KeyD' || code === 'ArrowRight') {
				val = 'RIGHT'
			}
			if (code === 'KeyA' || code === 'ArrowLeft') {
				val = 'LEFT'
			}
			if (code === 'KeyS' || code === 'ArrowDown') {
				val = 'BOTTOM'
			}
			if (val) {
				setMovement(val)
			}
		}

		const fireHandler = (e: KeyboardEvent) => {
			if (game && e.key === 'Enter') {
				lobbyActions.input('FIRE', game.id)
			}
		}
		const pauseHandler = (e: KeyboardEvent) => {
			if (game && e.code === 'Space') {
				lobbyActions.input('PAUSE', game.id)
			}
		}

		const clearMovement = (e: KeyboardEvent) => {
			const code = e.code
			if (
				code === 'KeyW' ||
				code === 'ArrowUp' ||
				code === 'KeyD' ||
				code === 'ArrowRight' ||
				code === 'KeyA' ||
				code === 'ArrowLeft' ||
				code === 'KeyS' ||
				code === 'ArrowDown'
			) {
				setMovement(null)
			}
		}
		document.addEventListener('keypress', moveHandler)
		document.addEventListener('keyup', clearMovement)
		document.addEventListener('keyup', fireHandler)
		document.addEventListener('keypress', pauseHandler)
		return () => {
			document.removeEventListener('keypress', moveHandler)
			document.removeEventListener('keyup', fireHandler)
			document.removeEventListener('keyup', clearMovement)
			document.removeEventListener('keypress', pauseHandler)
		}
	}, [game?.id])

	return !game ? (
		<Lobby setGame={setGame} />
	) : (
		<div
			className={s.screen}
			style={{
				width: `${block * 13}px`,
				height: `${block * 13}px`,
			}}
		>
			<Players p1={game.p1} p2={game.p2} />
			<Objects objects={game.objects} />
			<Bullets bullets={game.bullets} />
		</div>
	)
}
