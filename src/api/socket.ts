import { io } from 'socket.io-client'
import { GameActions, LobbyActions } from './socket.types'
import { ILobby } from '@/game/types/lobby.types'
import { Dispatch, SetStateAction } from 'react'
import { IGame } from '@/game/types/game.types'

const server = process.env.NEXT_PUBLIC_SERVER

export const socket = io(server ?? '', {
	withCredentials: true,
})

export const lobbyActions = {
	create(
		name: string,
		setLobby: any,
		setGame: Dispatch<SetStateAction<IGame | undefined>>
	) {
		socket.on(GameActions.frame, ({ game, ping }) => {
			// console.log(new Date().getTime() - ping)
			setGame(game)
		})
		socket.emit(LobbyActions.create, { name }, (res: ILobby) => {
			setLobby(res)
		})
	},

	findLobbies(setLobbies: Dispatch<SetStateAction<ILobby[]>>) {
		socket.emit(LobbyActions.find, undefined, (lobbies: ILobby[]) => {
			setLobbies(lobbies)
			console.log(lobbies)
		})
	},

	joinLobby(id: string, setGame: Dispatch<SetStateAction<IGame | undefined>>) {
		socket.emit(LobbyActions.join, id)
		socket.on(GameActions.frame, ({ game, ping }) => {
			setGame(game)
			// console.log(new Date().getTime() - ping)
		})
	},

	input(button: string, gameId: string) {
		socket.emit(GameActions.input, { button, gameId })
	},
}
