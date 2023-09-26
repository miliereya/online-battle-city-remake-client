'use client'
import s from '../components/game.module.scss'

import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'
import {
	EditorObject,
	GameActions,
	GameManager,
	Lobby,
	TypeButton,
	TypeDirection,
} from './types'
import { InputDto } from './dto'
import { Settings } from './settings'
import { Game } from './init'
import {
	animationsFrameLogic,
	bonusesFrameLogic,
	bulletsFrameLogic,
	enemiesFrameLogic,
	enemiesSpawnLogic,
	gameStatusFrameLogic,
	levelFrameLogic,
	playersFrameLogic,
} from './logics'
import { lobbyActions } from '@/api/socket'
import { ILobby } from '../types/lobby.types'
import { CreateGameObject, TypeMoveButton } from '../types/game.types'
import { useFrameLoop } from '@/hooks/useFrameLoop'
import { TypeServer } from '@/api/socket.types'
import { isMobile } from 'react-device-detect'

export interface GameSettings {
	hardcore: boolean
	playerLevel: 0 | 1 | 2 | 3
	friendlyFire: boolean
	soundPack: 'default' | 'mario' | 'funny'
}

interface GameContextInterface {
	startGame: (
		players: 1 | 2,
		settings: GameSettings,
		editor?: EditorObject[]
	) => void
	game: Game | undefined
	lobby: ILobby | undefined
	lobbies: ILobby[]
	inputHandler: (button: TypeButton) => void
	inputHandler2: (button: TypeButton) => void
	createLobbyHandler: (
		name: string,
		settings: GameSettings,
		editor?: CreateGameObject[]
	) => void
	joinLobby: (name: string) => void
	server: TypeServer
	setServer: Dispatch<SetStateAction<TypeServer>>
	ping: number
	checkPing: () => void
	deleteLobby: (name: string) => void
}

export const GameContext = createContext<GameContextInterface>({
	game: undefined,
	lobby: undefined,
	lobbies: [],
	startGame(players, settings, editor) {},
	inputHandler(button: TypeButton) {},
	inputHandler2(button: TypeButton) {},
	createLobbyHandler: (
		name: string,
		settings: GameSettings,
		editor?: CreateGameObject[]
	) => {},
	joinLobby() {},
	server: 'USA',
	setServer() {},
	ping: 0,
	checkPing() {},
	deleteLobby(name: string) {},
})

interface GameProviderProps {
	children: ReactNode
}

const GameProvider: FC<GameProviderProps> = ({ children }) => {
	const [game, setGame] = useState<Game>()
	const [lobby, setLobby] = useState<ILobby>()
	const [lobbies, setLobbies] = useState<ILobby[]>([])
	const [server, setServer] = useState<TypeServer>('USA')
	const [ping, setPing] = useState(0)

	// let timer: any
	const [count, setCount] = useState(0)
	// const updateCount = () => {
	// 	timer =
	// 		!timer &&
	// 		setInterval(() => {
	// 			setCount((prevCount) => prevCount + 1)
	// 		}, 25)

	// 	// if (count === 100) clearInterval(timer)
	// }
	useFrameLoop(() => {
		setCount((prev) => prev + 1)
	})

	// useEffect(() => {
	// 	updateCount()

	// 	return () => clearInterval(timer)
	// }, [game])

	const createLobbyHandler = (
		name: string,
		settings: GameSettings,
		editor?: CreateGameObject[]
	) => {
		lobbyActions.create(server, name, setLobby, setGame, settings, editor)
	}

	const joinLobby = (name: string) => {
		lobbyActions.joinLobby(server, name, setGame)
	}

	const checkPing = () => {
		lobbyActions.ping(server, setPing)
	}

	const deleteLobby = (name: string) => {
		lobbyActions.delete(server, name)
	}

	const joinLobbyHandler = (id: string) => {
		// lobbyActions.joinLobby(id, setGame)
	}

	const startGame = (
		players: 1 | 2,
		settings: GameSettings,
		editor?: EditorObject[]
	) => {
		const game = new Game(players, settings, editor)
		setGame(game)
		let gameInterval: NodeJS.Timeout
		const clearGameInterval = () => {
			clearInterval(gameInterval)
		}
		gameInterval = setInterval(
			() => frameGame(game, clearGameInterval),
			Settings.frameRate
		)
		setTimeout(() => {
			game.isEnded = true
		}, Settings.gameExpireMinute * 1000 * 60)
	}

	const frameGame = (game: Game, clearGameInterval: () => void) => {
		const { levelChangeAnimation, gameOverAnimation, isPaused, isEnded } = game
		game.resetSounds()
		levelFrameLogic(game)
		gameStatusFrameLogic(game)
		if (!levelChangeAnimation) {
			if (!gameOverAnimation) {
				playersFrameLogic(game)
			}
			if (!isPaused) {
				bonusesFrameLogic(game)
				bulletsFrameLogic(game)
				enemiesSpawnLogic(game)
				enemiesFrameLogic(game)
				animationsFrameLogic(game)
			}
		}
		// update game
		if (isEnded) {
			clearGameInterval()
			setGame(undefined)
		}
	}
	const inputHandler = (button: TypeButton) => {
		if (!game) return
		const p1Controller = game.p1Controls

		if (
			button === 'TOP' ||
			button === 'RIGHT' ||
			button === 'LEFT' ||
			button === 'BOTTOM'
		) {
			p1Controller.move = button as TypeDirection
		}
		if (button === 'FIRE') p1Controller.fire = true
		if (button === 'PAUSE') p1Controller.pause = true
	}

	const inputHandler2 = (button: TypeButton) => {
		if (!game) return
		const p2Controller = game.p2Controls

		if (
			button === 'TOP' ||
			button === 'RIGHT' ||
			button === 'LEFT' ||
			button === 'BOTTOM'
		) {
			p2Controller.move = button as TypeDirection
		}
		if (button === 'FIRE') p2Controller.fire = true
		if (button === 'PAUSE') p2Controller.pause = true
	}

	const [movement, setMovement] = useState<TypeMoveButton | null>(null)

	const callbackForGameLoop = useCallback(() => {
		if (!movement || !game?.id) return
		// how frequently we should input new values to sockets  (возможно нужно еще какой-то транзишен добавить, 16 это дефолт, слишком быстро, но с 30 мне кажется что недостаточно плавно)
		lobbyActions.input(server, movement, game.id)
	}, [game?.id, movement])

	useFrameLoop(callbackForGameLoop)

	useEffect(() => {
		if (game?.id === 'local') return
		const moveOnlineHandler = (e: KeyboardEvent) => {
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

		const fireOnlineHandler = (e: KeyboardEvent) => {
			if (game && e.code === 'KeyF') {
				lobbyActions.input(server, 'FIRE', game.id)
			}
		}
		const pauseOnlineHandler = (e: KeyboardEvent) => {
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
		document.addEventListener('keypress', moveOnlineHandler)
		document.addEventListener('keyup', clearMovement)
		document.addEventListener('keypress', fireOnlineHandler)
		document.addEventListener('keypress', pauseOnlineHandler)
		return () => {
			document.removeEventListener('keypress', moveOnlineHandler)
			document.removeEventListener('keypress', fireOnlineHandler)
			document.removeEventListener('keyup', clearMovement)
			document.removeEventListener('keypress', pauseOnlineHandler)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game?.id])

	return (
		<GameContext.Provider
			value={{
				game,
				lobby,
				lobbies,
				startGame,
				inputHandler,
				inputHandler2,
				createLobbyHandler,
				joinLobby,
				server,
				setServer,
				ping,
				checkPing,
				deleteLobby,
			}}
		>
			{isMobile && (
				<div>
					<div className={s.control_wrapper}>
						<div className={s.control_top_wrapper}>
							<button id='top1' className={s.control_button}>
								↑
							</button>
						</div>
						<div className={s.control_top_wrapper}>
							<button id='left1' className={s.control_button}>
								←
							</button>
							<button id='fire1' className={s.control_button}>
								◌
							</button>
							<button id='right1' className={s.control_button}>
								→
							</button>
						</div>
						<div className={s.control_top_wrapper}>
							<button id='bottom1' className={s.control_button}>
								↓
							</button>
						</div>
					</div>
					<div className={s.pause_wrapper}>
						<button id='space' className={s.control_button}>
							_
						</button>
					</div>
					<div className={s.control_wrapper_2}>
						<div className={s.control_top_wrapper}>
							<button id='top2' className={s.control_button}>
								↑
							</button>
						</div>
						<div className={s.control_top_wrapper}>
							<button id='left2' className={s.control_button}>
								←
							</button>
							<button id='fire2' className={s.control_button}>
								◌
							</button>
							<button id='right2' className={s.control_button}>
								→
							</button>
						</div>
						<div className={s.control_top_wrapper}>
							<button id='bottom2' className={s.control_button}>
								↓
							</button>
						</div>
					</div>
				</div>
			)}
			{children}
		</GameContext.Provider>
	)
}

export default GameProvider
export const useGame = () => useContext(GameContext)
