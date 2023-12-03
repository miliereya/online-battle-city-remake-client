import { TypeBonus, TypeTank } from "."

export type TypeGameBLock =
	| 'STONE'
	| 'BRICK'
	| 'WATER'
	| 'TREES'
	| 'ICE'
	| 'FLAG'


export type TypeBang = 'BIG' | 'SMALL'

export type TypeObject = TypeGameBLock | TypeBonus | TypeTank | 'BULLET'
