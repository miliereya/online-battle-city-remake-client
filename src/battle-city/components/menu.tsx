import Image from 'next/image'
import { usePixel } from '../hooks/usePixel'
import s from './menu.module.scss'
import { useEffect, useState } from 'react'
import { Editor } from './editor'
import { CreateGameObject } from '../types/game.types'
import { getDirectionDegrees } from '../utils/style.utils'
import { tank_p1__lvl_0 } from '../render/p1/tank-lvl_0'
import RenderObject from './render'
import { useGame } from '../game/provider'
import { LevelChangeAnimation } from './animations/level-change'
import { isMobile } from 'react-device-detect'

const calculatePlayerYCoordinates = (choose: number) => {
	switch (choose) {
		case 1:
			return 79
		case 2:
			return 69
		case 3:
			return 59
		case 4:
			return 48
		default:
			return 38
	}
}

export const Menu = () => {
	const pixel = usePixel()
	const {
		startGame,
		game,
		createLobbyHandler,
		lobby,
		joinLobby,
		lobbies,
		server,
		setServer,
		checkPing,
		ping,
		deleteLobby,
	} = useGame()
	const [lobbyName, setLobbyName] = useState('')
	const [isEditingLobbyName, setEditingLobbyName] = useState(false)
	const [soundPack, setSoundPack] = useState<'default' | 'mario' | 'funny'>(
		'default'
	)

	const [findLobbyName, setFindLobbyName] = useState('')
	const [isEditingFindLobbyName, setEditingFindLobbyName] = useState(false)

	const [isHardcore, setHardcore] = useState(false)
	const [isFriendlyFire, setFriendlyFire] = useState(false)
	const [playerLevel, setPlayerLevel] = useState<0 | 1 | 2 | 3>(0)

	const [editor, setEditor] = useState<CreateGameObject[]>([])
	const [isEdited, setEdited] = useState(false)

	const [choose, setChoose] = useState(1)
	const [state, setState] = useState<
		| 'main'
		| '1 player'
		| '2 players'
		| 'multiplayer'
		| 'portfolio'
		| 'settings'
		| 'create lobby'
		| 'join lobby'
		| 'lobby'
		| 'find lobby'
	>('main')
	const [isEditorMode, setEditorMode] = useState(false)

	useEffect(() => {
		if (isEditorMode || game) return
		const settings = {
			hardcore: isHardcore,
			playerLevel,
			friendlyFire: isFriendlyFire,
			soundPack,
		}
		const chooseHandler = (code: string) => {
			code
			let isSettingChanged = false
			let range = 5
			if (
				state === '1 player' ||
				state === '2 players' ||
				state === 'find lobby'
			) {
				range = 3
			} else if (state === 'create lobby' || state === 'lobby') {
				range = 4
			}
			if (
				!isEditingLobbyName &&
				!isEditingFindLobbyName &&
				(code === 'KeyW' || code === 'KeyI')
			) {
				setChoose((prev) => (prev !== 1 ? prev - 1 : range))
				new Audio(`/audio/${soundPack}/menu.ogg`).play()
			}
			if (
				!isEditingLobbyName &&
				!isEditingFindLobbyName &&
				(code === 'KeyS' || code === 'KeyK')
			) {
				setChoose((prev) => (prev !== range ? prev + 1 : 1))
				new Audio(`/audio/${soundPack}/menu.ogg`).play()
			}
			if (code === 'Space') {
				if (isEditingLobbyName) {
					setEditingLobbyName(false)
					return
				}
				if (isEditingFindLobbyName) {
					setEditingFindLobbyName(false)
					return
				}
				switch (state) {
					case 'main':
						switch (choose) {
							case 1:
								setState('1 player')
								break
							case 2:
								setState('2 players')
								break
							case 3:
								setState('multiplayer')
								break
							case 4:
								setState('portfolio')
								break
							case 5:
								setState('settings')
								break
						}
						break
					case '1 player':
						switch (choose) {
							case 1:
								startGame(1, settings, isEdited ? editor : undefined)
								break
							case 2:
								setEditorMode(true)
								break
							case 3:
								setState('main')
								break
						}
						break
					case '2 players':
						switch (choose) {
							case 1:
								startGame(2, settings, isEdited ? editor : undefined)
								break
							case 2:
								setEditorMode(true)
								break
							case 3:
								setState('main')
								break
						}
						break
					case 'multiplayer':
						switch (choose) {
							case 1:
								setState('create lobby')
								break
							case 2:
								setState('find lobby')
								break
							case 3:
								isSettingChanged = true
								setServer((prev) =>
									prev === 'USA' ? 'EUR' : prev === 'EUR' ? 'RUS' : 'USA'
								)
								break
							case 4:
								isSettingChanged = true
								checkPing()
								break
							case 5:
								setState('main')
								break
						}
						break
					case 'create lobby':
						switch (choose) {
							case 1:
								setTimeout(() => {
									const lobbyInput = document.getElementById('lobby name')
									if (lobbyInput) lobbyInput.focus()
								}, 0)
								setEditingLobbyName(true)
								break
							case 2:
								if (!lobbyName) return
								createLobbyHandler(
									lobbyName.toLocaleLowerCase(),
									settings,
									isEdited ? editor : undefined
								)
								setState('lobby')
								setLobbyName('')
								break
							case 3:
								setEditorMode(true)
								break
							case 4:
								setState('multiplayer')
								break
						}
						break
					case 'find lobby':
						switch (choose) {
							case 1:
								setTimeout(() => {
									const findLobbyInput =
										document.getElementById('find lobby name')
									if (findLobbyInput) findLobbyInput.focus()
								}, 0)
								setEditingFindLobbyName(true)
								break
							case 2:
								if (!findLobbyName) return
								joinLobby(findLobbyName)
								if (lobby) {
									setState('find lobby')
								}
								break
							case 3:
								setFindLobbyName('')
								setState('multiplayer')
								break
						}
						break
					case 'lobby':
						switch (choose) {
							case 1:
								setTimeout(() => {
									const lobbyInput = document.getElementById('lobby name')
									if (lobbyInput) lobbyInput.focus()
								}, 0)
								setEditingLobbyName(true)
								break
							case 2:
								// sound
								break
							case 3:
								// sound
								break
							case 4:
								if (lobby) deleteLobby(lobby?.name)
								setState('create lobby')
								break
						}
						break
					case 'settings':
						switch (choose) {
							case 1:
								if (soundPack === 'default') {
									setSoundPack('mario')
									new Audio(`/audio/mario/menu.ogg`).play()
									return
								} else if (soundPack === 'mario') {
									setSoundPack('funny')
									new Audio(`/audio/funny/menu.ogg`).play()
									return
								} else {
									setSoundPack('default')
									new Audio(`/audio/default/menu.ogg`).play()
									return
								}
							case 2:
								isSettingChanged = true
								setFriendlyFire((prev) => !prev)
								break
							case 3:
								isSettingChanged = true
								setPlayerLevel((prev) => {
									switch (prev) {
										case 0:
											return 1
										case 1:
											return 2
										case 2:
											return 3
										case 3:
											return 0
									}
								})
								break
							case 4:
								isSettingChanged = true
								setHardcore((prev) => !prev)
								break
							case 5:
								setState('main')
								break
						}
						break
				}
				if (!isSettingChanged) setChoose(1)
				new Audio(`/audio/${soundPack}/shoot.ogg`).play()
			}
		}

		const chooseHandlerListener = (e: KeyboardEvent) => {
			chooseHandler(e.code)
		}

		const chooseTopHandler = () => {
			chooseHandler('KeyW')
		}

		const chooseBottomHandler = () => {
			chooseHandler('KeyS')
		}

		const chooseMobileHandler = () => {
			chooseHandler('Space')
		}

		if (isMobile) {
			document
				.getElementById('fire1')
				?.addEventListener('click', chooseMobileHandler)
			document
				.getElementById('top1')
				?.addEventListener('click', chooseTopHandler)
			document
				.getElementById('bottom1')
				?.addEventListener('click', chooseBottomHandler)
			document
				.getElementById('fire2')
				?.addEventListener('click', chooseMobileHandler)
			document
				.getElementById('top2')
				?.addEventListener('click', chooseTopHandler)
			document
				.getElementById('bottom2')
				?.addEventListener('click', chooseBottomHandler)
		} else {
			document.addEventListener('keypress', chooseHandlerListener)
		}
		return () => {
			if (isMobile) {
				document
					.getElementById('top1')
					?.removeEventListener('click', chooseTopHandler)
				document
					.getElementById('bottom1')
					?.removeEventListener('click', chooseBottomHandler)
				document
					.getElementById('fire1')
					?.removeEventListener('click', chooseMobileHandler)
				document
					.getElementById('top2')
					?.removeEventListener('click', chooseTopHandler)
				document
					.getElementById('bottom2')
					?.removeEventListener('click', chooseBottomHandler)
				document
					.getElementById('fire2')
					?.removeEventListener('click', chooseMobileHandler)
			} else {
				document.removeEventListener('keypress', chooseHandlerListener)
			}
		}
	}, [
		choose,
		state,
		isEditorMode,
		editor,
		isEdited,
		startGame,
		game,
		isFriendlyFire,
		isHardcore,
		playerLevel,
		isEditingLobbyName,
		setEditingLobbyName,
		lobbyName,
		setLobbyName,
		createLobbyHandler,
		isEditingFindLobbyName,
		findLobbyName,
		joinLobby,
		setServer,
		checkPing,
		deleteLobby,
		lobby,
		soundPack,
	])

	const setLobbyNameHandler = (val: string) => {
		const reg = new RegExp(/^[A-Za-z][A-Za-z0-9]*$/)
		if (
			!isEditingLobbyName ||
			val.length > 7 ||
			val[val.length - 1] === ' ' ||
			(val && !reg.test(val))
		) {
			return
		}
		setLobbyName(val)
	}

	const setLobbyFindNameHandler = (val: string) => {
		const reg = new RegExp(/^[A-Za-z][A-Za-z0-9]*$/)
		if (
			!isEditingFindLobbyName ||
			val.length > 7 ||
			val[val.length - 1] === ' ' ||
			(val && !reg.test(val))
		) {
			return
		}
		setFindLobbyName(val)
	}

	return isEditorMode ? (
		<Editor
			objects={editor}
			setObjects={setEditor}
			close={() => [setEditorMode(false), setEdited(true)]}
		/>
	) : (
		<div
			className={s.screen}
			style={{
				width: `${pixel * 13 * 16}px`,
				height: `${pixel * 13 * 16}px`,
				position: 'relative',
			}}
		>
			<Image src='/img/main_menu.png' alt='main_menu' fill={true} />
			<div className={s.menu_wrapper}>
				<div className={s.buttons_wrapper}>
					{state === 'main' && (
						<>
							<p className={s.menu_text}>1 PLAYER</p>
							<p className={s.menu_text}>2 PLAYERS</p>
							<p className={s.menu_text}>MULTIPLAYER</p>
							<p className={s.menu_text}>PORTFOLIO</p>
							<p className={s.menu_text}>SETTINGS</p>
						</>
					)}
					{state === '1 player' && (
						<>
							<p className={s.menu_text}>PLAY</p>
							<p className={s.menu_text}>CONSTRUCTION</p>
							<p className={s.menu_text}>BACK</p>
						</>
					)}
					{state === '2 players' && (
						<>
							<p className={s.menu_text}>PLAY</p>
							<p className={s.menu_text}>CONSTRUCTION</p>
							<p className={s.menu_text}>BACK</p>
						</>
					)}
					{state === 'multiplayer' && (
						<>
							<p className={s.menu_text}>CREATE LOBBY</p>
							<p className={s.menu_text}>FIND LOBBY</p>
							<p className={s.menu_text}>SERVER ({server})</p>
							<p className={s.menu_text}>CHECK PING ({ping})</p>
							<p className={s.menu_text}>BACK</p>
						</>
					)}
					{state === 'create lobby' && (
						<>
							<p className={s.menu_text}>
								NAME{isEditingLobbyName ? ':' : ''} <span>{lobbyName}</span>
							</p>
							<p className={s.menu_text}>CREATE</p>
							<p className={s.menu_text}>CONSTRUCTION</p>
							<p className={s.menu_text}>BACK</p>
							<input
								id='lobby name'
								type='text'
								onChange={(e) => setLobbyNameHandler(e.target.value)}
								value={lobbyName}
								style={{
									opacity: 0,
								}}
								onBlur={() => setEditingLobbyName(false)}
							/>
						</>
					)}
					{state === 'find lobby' && (
						<>
							<p className={s.menu_text}>
								NAME{isEditingFindLobbyName ? ':' : ''}{' '}
								<span>{findLobbyName}</span>
							</p>
							<p className={s.menu_text}>FIND LOBBY</p>
							<p className={s.menu_text}>BACK</p>
							<input
								id='find lobby name'
								type='text'
								onChange={(e) => setLobbyFindNameHandler(e.target.value)}
								value={findLobbyName}
								style={{
									opacity: 0,
								}}
								onBlur={() => setEditingFindLobbyName(false)}
							/>
						</>
					)}
					{state === 'lobby' && lobby && (
						<>
							<p className={s.menu_text}>LOBBY: {lobby?.name}</p>
							<p className={s.menu_text}>(WAIT FOR P2)</p>
							<p className={s.menu_text}>(SERVER {server})</p>
							<p className={s.menu_text}>BACK</p>
						</>
					)}
					{state === 'settings' && (
						<>
							<p className={s.menu_text}>SOUND ({soundPack})</p>
							<p className={s.menu_text}>
								FRIENDLY FIRE ({isFriendlyFire ? 'Y' : 'N'})
							</p>
							<p className={s.menu_text}>PLAYER LEVEL ({playerLevel})</p>
							<p className={s.menu_text}>HARDCORE ({isHardcore ? 'Y' : 'N'})</p>
							<p className={s.menu_text}>BACK</p>
						</>
					)}
				</div>

				{!isMobile && (
					<>
						<div className={s.p1_buttons}>
							<p className={s.buttons_text}>P1</p>
							<p className={s.buttons_text}>W A S D - MOVE</p>
							<p className={s.buttons_text}>F - FIRE</p>
							<p className={s.buttons_text}>SPACE - PAUSE</p>
						</div>
						<div className={s.p2_buttons}>
							<p className={s.buttons_text}>P2</p>
							<p className={s.buttons_text}>I J K L - MOVE</p>
							<p className={s.buttons_text}>; - FIRE</p>
							<p className={s.buttons_text}>SPACE - PAUSE</p>
						</div>
					</>
				)}
			</div>
			<div
				style={{
					rotate: getDirectionDegrees('RIGHT'),
					left: `${(54 - 7) * pixel}px`,
					bottom: `${(calculatePlayerYCoordinates(choose) - 7) * pixel}px`,
					position: 'absolute',
					scale: 0.7,
				}}
			>
				{tank_p1__lvl_0.t1.map((row, i) => (
					<RenderObject key={'1' + i} i={i} row={row} />
				))}
			</div>
		</div>
	)
}
