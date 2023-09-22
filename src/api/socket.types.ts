export enum LobbyActions {
	create = 'lobby/create',
	ping = 'lobby/ping',
	join = 'lobby/join',
	delete = 'lobby/delete',
}

export enum GameActions {
	frame = 'game/frame',
	input = 'game/input',
	ended = 'game/ended',
}

export type TypeServer = 'USA' | 'EUR' | 'RUS'
