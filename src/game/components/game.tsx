'use client'

import { lobbyActions } from '@/api/socket'
import { useEffect, useState } from 'react'
import s from './game.module.scss'
import { Objects } from './objects/objects'
import { IGame, TypeButton, TypeMoveButton } from '../types/game.types'
import { Players } from './objects/players'
import { Lobby } from './lobby'
import { Bullets } from './objects/bullets'

let x = 0

setInterval(() => x++, 30)
let movementTimer: NodeJS.Timeout | null

export const Game = () => {
	const [game, setGame] = useState<IGame>()
	const block = 64
	const [movement, setMovement] = useState<TypeMoveButton | null>(null)

	useEffect(() => {
		if (game && movement) lobbyActions.input(movement, game.id)
	}, [x])

	const moveHandler = (e: KeyboardEvent) => {
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
			if (movementTimer) {
				clearTimeout(movementTimer)
				movementTimer = null
			}
			// setMovement(val)
			// lobbyActions.input(val, game.id)
		}
	}

	const fireHandler = (e: KeyboardEvent) => {
		if (game && e.key === 'Enter') {
			lobbyActions.input('FIRE', game.id)
		}
	}
	const pauseHandler = (e: KeyboardEvent) => {
		if (game && e.key === 'Pause') {
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
			movementTimer = setTimeout(() => {
				setMovement(null)
			}, 5)
		}
	}
	useEffect(() => {
		document.addEventListener('keypress', moveHandler)
		document.addEventListener('keyup', clearMovement)
		document.addEventListener('keyup', fireHandler)
		document.addEventListener('keydown', pauseHandler)
		return () => {
			document.removeEventListener('keypress', moveHandler)
			document.removeEventListener('keyup', fireHandler)
			document.removeEventListener('keyup', clearMovement)
			document.removeEventListener('keydown', pauseHandler)
		}
	}, [game])

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
