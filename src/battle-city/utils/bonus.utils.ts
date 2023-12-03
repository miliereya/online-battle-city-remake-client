import { EnemyList } from '../types'

export const generateBonuses = (enemyList: EnemyList[]) => {
	let prevVal = 0
	for (let i = 3; i < enemyList.length; i += 5) {
		let randomVal
		while (true) {
			randomVal = Math.floor(Math.random() * 5 + 1)
			if (randomVal !== prevVal) break
		}
		switch (randomVal) {
			case 1:
				enemyList[i].bonus = 'GRENADE'
				break
			case 2:
				enemyList[i].bonus = 'HELMET'
				break
			case 3:
				enemyList[i].bonus = 'TIMER'
				break
			case 4:
				enemyList[i].bonus = 'HP'
				break
			default:
				enemyList[i].bonus = 'STAR'
				break
		}
		prevVal = randomVal
	}
	return enemyList
}

export const generateBonusCoordinates = () => {
	return {
		x: Math.floor(Math.random() * 187 + 10),
		y: Math.floor(Math.random() * 187 + 10),
	}
}
