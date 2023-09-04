export type TypeMoveButton = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'
export type TypeActionButton = 'FIRE' | 'PAUSE'

export type TypeButton = TypeMoveButton | TypeActionButton

export interface InputDto {
	button: TypeButton
	gameId: string
	player: string
}

export type TypeGameObjet = 'STONE' | 'BRICK' | 'WATER' | 'TREES' | 'ICE'

export interface GameObject extends Coordinates {
	id: string
	type: TypeGameObjet
}

export interface Coordinates {
	coordinateX: number
	coordinateY: number
}

export type TypeEnemyTank = 'NORMAL' | 'SPEEDY' | 'HEAVY'
export type TypePlayerTank = 'LVL_0' | 'LVL_1' | 'LVL_2' | 'LVL_3'

export type TypeTank = TypeEnemyTank | TypePlayerTank

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

export type TypeBonus = 'GRENADE' | 'HELMET' | 'SHOVEL' | 'STAR' | 'HP'

export interface ITank extends Coordinates {
	id: string
	direction: TypeMoveButton
	tick: 1 | 2
	type: TypeTank
	speed: 1 | 2
	cooldown: number
	lives: 0 | 1 | 2 | 3
	bonus?: TypeBonus
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
	enemies: ITank[]
}
