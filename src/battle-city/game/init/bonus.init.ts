import { Player } from '.'
import { TypeBonus } from '../types'
import { generateBonusCoordinates, isPlayerDead } from '../utils'
import { Coordinates } from './coordinates.init'
import { v4 as uuid4 } from 'uuid'

export class Bonus extends Coordinates {
	id: string
	type: TypeBonus
	lifeTime: number = 400
	constructor(type: TypeBonus) {
		const { x, y } = generateBonusCoordinates()
		super(x, y)
		this.id = uuid4()
		this.type = type
	}

	isAnyPlayerTouched(p1: Player, p2: Player | null) {
		return !isPlayerDead(p1) &&
			p1.coordinateX + 7 >= this.coordinateX &&
			p1.coordinateX <= this.coordinateX + 22 &&
			p1.coordinateY + 7 >= this.coordinateY &&
			p1.coordinateY <= this.coordinateY + 21
			? p1
			: p2 && !isPlayerDead(p2) &&
			  p2.coordinateX + 7 >= this.coordinateX &&
			  p2.coordinateX <= this.coordinateX + 22 &&
			  p2.coordinateY + 7 >= this.coordinateY &&
			  p2.coordinateY <= this.coordinateY + 21
			? p2
			: null
	}
}
