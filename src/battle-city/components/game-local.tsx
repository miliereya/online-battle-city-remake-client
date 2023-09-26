import { useCallback, useEffect, useState } from 'react'
import s from './game.module.scss'
import { Objects } from './objects/objects'
import { CreateGameObject, TypeMoveButton } from '../types/game.types'
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
import { useMobile } from '../hooks/useMobile'

export const GameLocal = () => {
	const pixel = usePixel()
	const { game, inputHandler, inputHandler2 } = useGame()
	const [movement, setMovement] = useState<TypeMoveButton | null>(null)
	const [movement2, setMovement2] = useState<TypeMoveButton | null>(null)
	const isMobile = useMobile()

	const callbackForGameLoop = useCallback(() => {
		if (!movement || !game) return
		inputHandler(movement)
	}, [game, movement])

	const callbackForGameLoop2 = useCallback(() => {
		if (!movement2 || !game) return
		inputHandler2(movement2)
	}, [game, movement2])

	useFrameLoop(callbackForGameLoop)
	useFrameLoop(callbackForGameLoop2)
	useEffect(() => {
		const moveHandler = (e: KeyboardEvent) => {
			// все подписки по хорошему нужно совершать в тот момент когда уже лобби есть, чтобы не было этой хрени с game?.id.
			if (!game) return
			let val: TypeMoveButton | undefined
			let code = e.code
			if (code === 'KeyW') {
				val = 'TOP'
			}
			if (code === 'KeyD') {
				val = 'RIGHT'
			}
			if (code === 'KeyA') {
				val = 'LEFT'
			}
			if (code === 'KeyS') {
				val = 'BOTTOM'
			}
			if (val) {
				setMovement(val)
			}
		}

		const moveHandler2 = (e: KeyboardEvent) => {
			// все подписки по хорошему нужно совершать в тот момент когда уже лобби есть, чтобы не было этой хрени с game?.id.
			if (!game) return
			let val: TypeMoveButton | undefined
			let code = e.code
			if (code === 'KeyI') {
				val = 'TOP'
			}
			if (code === 'KeyL') {
				val = 'RIGHT'
			}
			if (code === 'KeyJ') {
				val = 'LEFT'
			}
			if (code === 'KeyK') {
				val = 'BOTTOM'
			}
			if (val) {
				setMovement2(val)
			}
		}

		const fireHandler = (e: KeyboardEvent) => {
			if (game && e.code === 'KeyF') {
				inputHandler('FIRE')
			}
		}

		const fireHandler2 = (e: KeyboardEvent) => {
			if (game && e.code === 'Semicolon') {
				inputHandler2('FIRE')
			}
		}

		const pauseHandler = (e: KeyboardEvent) => {
			if (game && e.code === 'Space') {
				inputHandler('PAUSE')
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
		const clearMovement2 = (e: KeyboardEvent) => {
			const code = e.code
			if (
				code === 'KeyI' ||
				code === 'KeyL' ||
				code === 'KeyJ' ||
				code === 'KeyK'
			) {
				setMovement2(null)
			}
		}

		const fireMobileHandler1 = () => {
			inputHandler('FIRE')
		}

		const fireMobileHandler2 = () => {
			inputHandler2('FIRE')
		}

		const pauseMobileHandler = () => {
			inputHandler('PAUSE')
		}

		let move1Timer: NodeJS.Timeout
		let move2Timer: NodeJS.Timeout

		const moveTopHandler1 = () => {
			move1Timer = setInterval(() => inputHandler('TOP'), 10)
		}

		const moveRightHandler1 = () => {
			move1Timer = setInterval(() => inputHandler('RIGHT'), 10)
		}

		const moveLeftHandler1 = () => {
			move1Timer = setInterval(() => inputHandler('LEFT'), 10)
		}

		const moveBottomHandler1 = () => {
			move1Timer = setInterval(() => inputHandler('BOTTOM'), 10)
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
				.getElementById('fire2')
				?.addEventListener('click', fireMobileHandler2)
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
			document.addEventListener('keypress', moveHandler2)
			document.addEventListener('keyup', clearMovement)
			document.addEventListener('keyup', clearMovement2)
			document.addEventListener('keypress', fireHandler)
			document.addEventListener('keypress', fireHandler2)
			document.addEventListener('keypress', pauseHandler)
		}
		return () => {
			if (isMobile) {
				document
					.getElementById('fire1')
					?.removeEventListener('click', fireMobileHandler1)
				document
					.getElementById('fire2')
					?.removeEventListener('click', fireMobileHandler2)
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
				document.removeEventListener('keypress', moveHandler2)
				document.removeEventListener('keypress', fireHandler)
				document.removeEventListener('keypress', fireHandler2)
				document.removeEventListener('keyup', clearMovement)
				document.removeEventListener('keyup', clearMovement2)
				document.removeEventListener('keypress', pauseHandler)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game, isMobile])

	useAudio(game?.sounds, game?.settings)
	useMoveAudio(
		game?.sounds.player_move,
		game?.sounds.enemy_move,
		game?.settings
	)

	if (!game) return

	return (
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
