import { lobbyActions } from '@/api/socket'
import { useCallback, useEffect, useRef, useState } from 'react'
import s from './game.module.scss'
import { Objects } from './objects/objects'
import {
	CreateGameObject,
	IGame,
	TypeButton,
	TypeMoveButton,
} from '../types/game.types'
import { Players } from './players/players'
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
import { useGame } from '../game/provider'
import { usePixel } from '../hooks/usePixel'
import { Pause } from './animations/pause'
import { isMobile } from 'react-device-detect'

export const GameOnline = () => {
	const { game, server } = useGame()
	const pixel = usePixel()
	const [objects, setObjects] = useState<CreateGameObject[]>([])
	const [movement, setMovement] = useState<TypeMoveButton | null>(null)

	const callbackForGameLoop = useCallback(() => {
		if (!movement || !game?.id) return
		// how frequently we should input new values to sockets  (возможно нужно еще какой-то транзишен добавить, 16 это дефолт, слишком быстро, но с 30 мне кажется что недостаточно плавно)
		lobbyActions.input(server, movement, game.id)
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
			if (game && e.code === 'KeyF') {
				lobbyActions.input(server, 'FIRE', game.id)
			}
		}
		const pauseHandler = (e: KeyboardEvent) => {
			if (game && e.code === 'Space') {
				lobbyActions.input(server, 'PAUSE', game.id)
			}
		}

		const clearMovement = (e: KeyboardEvent) => {
			const code = e.code
			if (
				code === 'KeyW' ||
				code === 'KeyD' ||
				code === 'KeyA' ||
				code === 'KeyS'
			) {
				setMovement(null)
			}
		}
		const fireMobileHandler1 = () => {
			if (game) lobbyActions.input(server, 'FIRE', game.id)
		}

		const pauseMobileHandler = () => {
			if (game) lobbyActions.input(server, 'SPACE', game.id)
		}

		let move1Timer: NodeJS.Timeout

		const moveTopHandler1 = () => {
			move1Timer = setInterval(() => {
				if (game) lobbyActions.input(server, 'TOP', game.id)
			}, 10)
		}

		const moveRightHandler1 = () => {
			move1Timer = setInterval(() => {
				if (game) lobbyActions.input(server, 'RIGHT', game.id)
			}, 10)
		}

		const moveLeftHandler1 = () => {
			move1Timer = setInterval(() => {
				if (game) lobbyActions.input(server, 'LEFT', game.id)
			}, 10)
		}

		const moveBottomHandler1 = () => {
			move1Timer = setInterval(() => {
				if (game) lobbyActions.input(server, 'BOTTOM', game.id)
			}, 10)
		}

		const clearMobileMovement = () => {
			clearInterval(move1Timer)

			setMovement(null)
		}

		if (isMobile) {
			document
				.getElementById('fire1')
				?.addEventListener('click', fireMobileHandler1)
			document
				.getElementById('space')
				?.addEventListener('click', pauseMobileHandler)
			document
				.getElementById('top1')
				?.addEventListener('touchstart', moveTopHandler1)
			document
				.getElementById('top1')
				?.addEventListener('touchend', clearMobileMovement)
			document
				.getElementById('bottom1')
				?.addEventListener('touchstart', moveBottomHandler1)
			document
				.getElementById('bottom1')
				?.addEventListener('touchend', clearMobileMovement)
			document
				.getElementById('right1')
				?.addEventListener('touchstart', moveRightHandler1)
			document
				.getElementById('right1')
				?.addEventListener('touchend', clearMobileMovement)
			document
				.getElementById('left1')
				?.addEventListener('touchstart', moveLeftHandler1)
			document
				.getElementById('left1')
				?.addEventListener('touchend', clearMobileMovement)
		} else {
			document.addEventListener('keypress', moveHandler)
			document.addEventListener('keyup', clearMovement)
			document.addEventListener('keypress', fireHandler)
			document.addEventListener('keypress', pauseHandler)
		}
		return () => {
			if (isMobile) {
				document
					.getElementById('fire1')
					?.removeEventListener('click', fireMobileHandler1)
				document
					.getElementById('space')
					?.removeEventListener('click', pauseMobileHandler)
				document
					.getElementById('top1')
					?.removeEventListener('touchstart', moveTopHandler1)
				document
					.getElementById('top1')
					?.addEventListener('touchend', clearMobileMovement)
				document
					.getElementById('bottom1')
					?.removeEventListener('touchstart', moveBottomHandler1)
				document
					.getElementById('bottom1')
					?.addEventListener('touchend', clearMobileMovement)
				document
					.getElementById('right1')
					?.removeEventListener('touchstart', moveRightHandler1)
				document
					.getElementById('right1')
					?.addEventListener('touchend', clearMobileMovement)
				document
					.getElementById('left1')
					?.removeEventListener('touchstart', moveLeftHandler1)
				document
					.getElementById('left1')
					?.addEventListener('touchend', clearMobileMovement)
			} else {
				document.removeEventListener('keypress', moveHandler)
				document.removeEventListener('keypress', fireHandler)
				document.removeEventListener('keyup', clearMovement)
				document.removeEventListener('keypress', pauseHandler)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game?.id])

	useAudio(game?.sounds, game?.settings)
	useMoveAudio(
		game?.sounds.player_move,
		game?.sounds.enemy_move,
		game?.settings
	)

	return !game ? null : (
		<div
			className={s.screen}
			style={{
				width: `${pixel * 13 * 16}px`,
				height: `${pixel * 13 * 16}px`,
			}}
		>
			{game.levelChangeAnimation && <LevelChangeAnimation level={game.level} />}
			{game.gameOverAnimation && <GameOverAnimation />}
			{game.isPaused && <Pause />}
			<Players p1={game.p1} p2={game.p2} />
			<Objects objects={game.objects} />
			<Bullets bullets={game.bullets} />
			<Enemies enemies={game.enemies} />
			<Bonuses bonuses={game.bonuses} />
			<Bangs bangs={game.bangs} />
			<Flag pixel={pixel} isAlive={game.isFlagAlive} />
			<Sidebar game={game} />
		</div>
	)
}
