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

export interface IBonus extends Coordinates {
	id: string
	type: TypeBonus
	lifeTime: number
	picker: string | null
}

export interface IPlayer extends Coordinates {
	id: string
	type: TypePlayerTank
	deathCooldown: number
	lives: 0 | 1 | 2 | 3
	speed: 1 | 2
	cooldown: number
	direction: TypeMoveButton
	tick: 1 | 2
	spawnAnimation: number
	helmet: number
}

export type TypeBonus = 'GRENADE' | 'HELMET' | 'STAR' | 'HP' | 'TIMER'

export interface ITank extends Coordinates {
	id: string
	direction: TypeMoveButton
	tick: 1 | 2
	type: TypeTank
	speed: 1 | 2
	cooldown: number
	lives: 0 | 1 | 2 | 3
	spawnAnimation: number
	bonus?: TypeBonus
}

type TypeShooter = 'player' | 'enemy'

type TypeBang = 'BIG' | 'SMALL'

export interface IBullet extends Coordinates {
	direction: TypeMoveButton
	id: string
	shooter: TypeShooter
	level: 1 | 2
}

export interface IBang extends Coordinates {
	id: string
	type: TypeBang
	timer: number
}

interface EnemyList {
	type: TypeEnemyTank
	bonus?: TypeBonus
}
export interface GameSounds {
	heavy_hit: boolean
	pause: boolean
	level_start: boolean
	bang: boolean
	flag_bang: boolean
	game_over: boolean
	shoot: boolean
	hit_1: boolean
	bonus_spawn: boolean
	bonus_pickup: boolean
	player_move: boolean
	enemy_move: boolean
}

export interface CreateGameObject extends Coordinates {
	type: TypeGameObjet
	id: string
}

export interface IGame {
	id: string
	objects: GameObject[]
	p1: IPlayer
	p2: IPlayer
	isPaused: boolean
	bullets: IBullet[]
	enemies: ITank[]
	enemyList: EnemyList[]
	bonuses: IBonus[]
	bangs: IBang[]
	isFlagAlive: boolean
	levelChangeAnimation: number
	level: number
	gameOverAnimation: number
	sounds: GameSounds
}
