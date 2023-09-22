import { Socket } from 'socket.io'
import { EditorObject } from '.'

export interface Lobby {
	id: string
	name: string
	p1: Socket
	expireMinute: number
	editor?: EditorObject[]
}

export interface LobbyManager {
	[key: string]: Lobby
}
