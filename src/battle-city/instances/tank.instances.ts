import { Bullet } from '.'
import {
	BusyCoordinates,
	TypeBonus,
	TypeDirection,
	TypeEnemySpawnPosition,
	TypeTank,
} from '../types'
import { isEnemy, isImpassibleGameObject, isTank } from '../utils'
import { Coordinates } from './coordinates.instances'
import { v4 as uuid4 } from 'uuid'

export class Tank extends Coordinates {
	id: string
	direction: TypeDirection
	tick: 1 | 2 = 1
	type: TypeTank
	speed: 1 | 2
	availableBullets: 0 | 1 | 2 | 3
	deathCooldown = 0
	spawnAnimation = 50
	lives: 0 | 1 | 2 | 3
	bonus?: TypeBonus
	nextMoves?: {
		direction: TypeDirection
		repeat: number
	}
	constructor(
		side: TypeEnemySpawnPosition,
		type: TypeTank,
		id?: string,
		bonus?: TypeBonus,
		isHardcore?: boolean
	) {
		let x: number
		const y = id ? 7 : 200

		if (id) x = side === 'left' ? 71 : 136
		else {
			side === 'left' ? (x = 7) : side === 'middle' ? (x = 103) : (x = 200)
		}

		super(x, y)

		this.id = id ?? uuid4()
		this.direction = id ? 'TOP' : 'BOTTOM'
		this.type = type
		this.speed = type === 'SPEEDY' ? 2 : 1
		this.lives = type === 'HEAVY' || (id && !isHardcore) ? 3 : 1
		this.bonus = bonus

		type === 'LVL_2'
			? (this.availableBullets = 2)
			: type === 'LVL_3'
			? (this.availableBullets = 3)
			: (this.availableBullets = 1)

		if (isEnemy(type)) this.generateNextMoves()
	}

	shoot(bullets: Bullet[]) {
		bullets.push(
			new Bullet(
				this.coordinateX,
				this.coordinateY,
				this.direction,
				this.type,
				this.id
			)
		)
		this.availableBullets--
	}

	generateNextMoves() {
		let direction: TypeDirection
		switch (Math.floor(Math.random() * 4 + 1)) {
			case 1:
				direction = 'TOP'
				break
			case 2:
				direction = 'BOTTOM'
				break
			case 3:
				direction = 'LEFT'
				break
			default:
				direction = 'RIGHT'
				break
		}
		this.nextMoves = {
			repeat: Math.floor(Math.random() * 20 + 10),
			direction,
		}
	}

	move(busyCoordinates: BusyCoordinates[]) {
		let willMove = true

		switch (this.direction) {
			case 'TOP':
				for (let i = 0; i < busyCoordinates.length; i++) {
					const { coordinateX, coordinateY, type } = busyCoordinates[i]
					if (
						this.coordinateY >= 200 ||
						(isImpassibleGameObject(type) &&
							coordinateY === this.coordinateY + 8 &&
							coordinateX >= this.coordinateX - 14 &&
							coordinateX <= this.coordinateX + 7) ||
						(isTank(type) &&
							coordinateY === this.coordinateY + 15 &&
							coordinateX >= this.coordinateX - 14 &&
							coordinateX <= this.coordinateX + 14)
					) {
						willMove = false
						break
					}
				}
				if (willMove) this.coordinateY++
				break
			case 'BOTTOM':
				for (let i = 0; i < busyCoordinates.length; i++) {
					const { coordinateX, coordinateY, type } = busyCoordinates[i]
					if (
						this.coordinateY <= 7 ||
						(isImpassibleGameObject(type) &&
							coordinateY === this.coordinateY - 15 &&
							coordinateX >= this.coordinateX - 14 &&
							coordinateX + 7 <= this.coordinateX + 14) ||
						(isTank(type) &&
							coordinateY === this.coordinateY - 15 &&
							coordinateX >= this.coordinateX - 14 &&
							coordinateX <= this.coordinateX + 14)
					) {
						willMove = false
						break
					}
				}
				if (willMove) this.coordinateY--
				break
			case 'LEFT':
				for (let i = 0; i < busyCoordinates.length; i++) {
					const { coordinateX, coordinateY, type } = busyCoordinates[i]
					if (
						this.coordinateX <= 7 ||
						(isImpassibleGameObject(type) &&
							coordinateX === this.coordinateX - 15 &&
							coordinateY >= this.coordinateY - 14 &&
							coordinateY + 7 <= this.coordinateY + 14) ||
						(isTank(type) &&
							coordinateX === this.coordinateX - 15 &&
							coordinateY >= this.coordinateY - 14 &&
							coordinateY <= this.coordinateY + 14)
					) {
						willMove = false
						break
					}
				}
				if (willMove) this.coordinateX--
				break
			case 'RIGHT':
				for (let i = 0; i < busyCoordinates.length; i++) {
					const { coordinateX, coordinateY, type } = busyCoordinates[i]
					if (
						this.coordinateX >= 200 ||
						(isImpassibleGameObject(type) &&
							coordinateX === this.coordinateX + 8 &&
							coordinateY >= this.coordinateY - 14 &&
							coordinateY + 7 <= this.coordinateY + 14) ||
						(isTank(type) &&
							coordinateX === this.coordinateX + 15 &&
							coordinateY >= this.coordinateY - 14 &&
							coordinateY <= this.coordinateY + 14)
					) {
						willMove = false
						break
					}
				}
				if (willMove) this.coordinateX++
				break
		}
		if (willMove) this.tick = this.tick === 1 ? 2 : 1
	}
}
