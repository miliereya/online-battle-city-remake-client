import { Socket } from 'socket.io'
import { EditorObject, Lobby } from '../types'

export interface CreateLobbyDto {
	name: string
	p1: Socket
	editor?: EditorObject[]
}

export interface JoinLobbyDto {
	id: string
	p2: Socket
}

export function publicLobbyData(lobbies: Lobby[]) {
	const data = []
	for (let i = 0; i < lobbies.length; i++) {
		data.push({
			name: lobbies[i]['name'],
			id: lobbies[i].id,
		})
	}
	return data
}
