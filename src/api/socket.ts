import { io } from 'socket.io-client'
import { GameActions, LobbyActions, TypeServer } from './socket.types'
import { ILobby } from '@/battle-city/types/lobby.types'
import { Dispatch, SetStateAction } from 'react'
import { CreateGameObject, IGame } from '@/battle-city/types/game.types'
import { GameSettings } from '@/battle-city/game/provider'
import { EditorObject } from '@/battle-city/game/types'
import { Game } from '@/battle-city/game/init'

const socketUSA = io(process.env.NEXT_PUBLIC_SERVER_USA ?? '', {
	withCredentials: true,
})

const socketEUR = io(process.env.NEXT_PUBLIC_SERVER_EUR ?? '', {
	withCredentials: true,
})

const socketRUS = io(process.env.NEXT_PUBLIC_SERVER_RUS ?? '', {
	withCredentials: true,
})

function getCurrentSocket(server: TypeServer) {
	return server === 'USA' ? socketUSA : server === 'EUR' ? socketEUR : socketRUS
}

export const lobbyActions = {
	ping(server: TypeServer, setPing: Dispatch<SetStateAction<number>>) {
		const socket = getCurrentSocket(server)
		socket.emit(LobbyActions.ping, undefined, (resTime: number) => {
			setPing(new Date().getTime() - resTime)
		})
	},
	create(
		server: TypeServer,
		name: string,
		setLobby: any,
		setGame: Dispatch<SetStateAction<Game | undefined>>,
		settings: GameSettings,
		editor?: EditorObject[]
	) {
		const socket = getCurrentSocket(server)
		socket.on(GameActions.frame, ({ game, ping }) => {
			// console.log(new Date().getTime() - ping)
			setGame(game)
		})

		// socket frame off if lobby deleted
		socket.emit(
			LobbyActions.create,
			{ name, settings, editor },
			(res: ILobby) => {
				setLobby(res)
				console.log(res)
			}
		)
	},

	joinLobby(
		server: TypeServer,
		name: string,
		setGame: Dispatch<SetStateAction<Game | undefined>>
	) {
		const socket = getCurrentSocket(server)
		socket.emit(LobbyActions.join, name)
		socket.on(GameActions.frame, ({ game, ping }: any) => {
			console.log('h')
			setGame(game)
			// console.log(new Date().getTime() - ping)

			// socket off if game over
		})
	},

	delete(server: TypeServer, name: string) {
		const socket = getCurrentSocket(server)
		socket.emit(LobbyActions.delete, name)
	},

	input(server: TypeServer, button: string, gameId: string) {
		const socket = getCurrentSocket(server)
		socket.emit(GameActions.input, { button, gameId })
	},
}
