import { io } from 'socket.io-client'
import { GameActions, LobbyActions } from './socket.types'
import { ILobby } from '@/battle-city/types/lobby.types'
import { Dispatch, SetStateAction } from 'react'
import { GameSettings } from '@/battle-city/game/provider'
import { EditorObject } from '@/battle-city/types'
import { Game } from '@/battle-city/instances'

const socket = io(process.env.NEXT_PUBLIC_SERVER_USA ?? '', {
	withCredentials: true,
})

export const lobbyActions = {
	ping(setPing: Dispatch<SetStateAction<number>>) {
		socket.emit(LobbyActions.ping, undefined, (resTime: number) => {
			setPing(new Date().getTime() - resTime)
		})
	},
	create(
		name: string,
		setLobby: any,
		setGame: Dispatch<SetStateAction<Game | undefined>>,
		settings: GameSettings,
		editor?: EditorObject[]
	) {
		socket.on(GameActions.frame, ({ game }: { game: Game }) => {
			if (game.isEnded) {
				socket.off(GameActions.frame)
				setGame(undefined)
			} else setGame(game)
		})

		socket.emit(
			LobbyActions.create,
			{ name, settings, editor },
			(res: ILobby) => {
				setLobby(res)
				console.log(res)
			}
		)
	},

	joinLobby(name: string, setGame: Dispatch<SetStateAction<Game | undefined>>) {
		socket.emit(LobbyActions.join, name)
		socket.on(GameActions.frame, ({ game }: { game: Game }) => {
			if (game.isEnded) {
				setGame(undefined)
				socket.off(GameActions.frame)
			} else setGame(game)
		})
	},

	delete(name: string) {
		socket.emit(LobbyActions.delete, name)
		socket.off(GameActions.frame)
	},

	input(button: string, gameId: string) {
		socket.emit(GameActions.input, { button, gameId })
	},
}
