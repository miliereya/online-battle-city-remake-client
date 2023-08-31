import { io } from 'socket.io-client'
import { GameActions, LobbyActions } from './socket.types'
import { ILobby } from '@/game/types/lobby.types'
import { Dispatch, SetStateAction } from 'react'
import { IGame } from '@/game/types/game.types'

export const socket = io('http://localhost:5000', {
	withCredentials: true,
})

export const lobbyActions = {
	create(
		name: string,
		setLobby: any,
		setGame: Dispatch<SetStateAction<IGame | undefined>>
	) {
		socket.on(GameActions.frame, (game) => setGame(game))
		socket.emit(LobbyActions.create, { name }, (res: ILobby) => {
			console.log(res)
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
		socket.on(GameActions.frame, (game) => setGame(game))
	},

	input(button: string, gameId: string) {
		socket.emit(GameActions.input, { button, gameId })
	},
}
