'use client'

import { lobbyActions } from '@/api/socket'
import { useCallback, useEffect, useRef, useState } from 'react'
import s from './game.module.scss'
import { Objects } from './objects/objects'
import { IGame, TypeButton, TypeMoveButton } from '../types/game.types'
import { Players } from './players/players'
import { Lobby } from './lobby'
import { Bullets } from './bullets'
import { useFrameLoop } from '@/hooks/useFrameLoop'
import { Enemies } from './enemies/enemies'
import { Bonuses } from './bonuses/bonuses'
import { Flag } from './objects/flag'
import { Bangs } from './animations/bangs'
import { LevelChangeAnimation } from './animations/level-change'
import { GameOverAnimation } from './animations/game-over'
import { Sidebar } from './sidebar'
import { useAudio } from '../hooks/useAudio'
import { useMoveAudio } from '../hooks/useMoveAudio'

export const Game = () => {
	const [game, setGame] = useState<IGame>()
	const block = 64
	const [movement, setMovement] = useState<TypeMoveButton | null>(null)

	const callbackForGameLoop = useCallback(() => {
		if (!movement || !game?.id) return
		// how frequently we should input new values to sockets  (возможно нужно еще какой-то транзишен добавить, 16 это дефолт, слишком быстро, но с 30 мне кажется что недостаточно плавно)
		lobbyActions.input(movement, game.id)
	}, [game?.id, movement])

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
		document.addEventListener('keypress', fireHandler)
		document.addEventListener('keypress', pauseHandler)
		return () => {
			document.removeEventListener('keypress', moveHandler)
			document.removeEventListener('keypress', fireHandler)
			document.removeEventListener('keyup', clearMovement)
			document.removeEventListener('keypress', pauseHandler)
		}
	}, [game?.id])

	useAudio(game?.sounds)
	useMoveAudio(game?.sounds.player_move)

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
			{game.levelChangeAnimation && <LevelChangeAnimation level={game.level} />}
			{game.gameOverAnimation && <GameOverAnimation />}
			<Players p1={game.p1} p2={game.p2} />
			<Objects objects={game.objects} />
			<Bullets bullets={game.bullets} />
			<Enemies enemies={game.enemies} />
			<Bonuses bonuses={game.bonuses} />
			<Bangs bangs={game.bangs} />
			<Flag isAlive={game.isFlagAlive} />
			<Sidebar game={game} />
		</div>
	)
}
