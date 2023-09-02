export type TypeMoveButton = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'
export type TypeActionButton = 'FIRE' | 'PAUSE'

export type TypeButton = TypeMoveButton | TypeActionButton

export interface InputDto {
	button: TypeButton
	gameId: string
	player: string
}

export type TypeGameObjet = 'STONE' | 'BRICK' | 'WATER' | 'TREES' | 'ICE'

export interface GameObject {
	id: string
	type: TypeGameObjet
	coordinateX: number
	coordinateY: number
}

export interface Coordinates {
	coordinateX: number
	coordinateY: number
}

export type IPlayerNum = 1 | 2

export interface IPlayer {
	id: string
	deathCooldown: number
	lives: number
	coordinateX: number
	coordinateY: number
	direction: TypeMoveButton
	tick: 1 | 2
}

type TypeShooter = 'player' | 'enemy'

export interface IBullet extends Coordinates {
	direction: TypeMoveButton
	id: string
	shooter: TypeShooter
	level: 1 | 2
}

export interface IGame {
	id: string
	objects: GameObject[]
	p1: IPlayer
	p2: IPlayer
	isPaused: boolean
	bullets: IBullet[]
}
