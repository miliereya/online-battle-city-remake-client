import { GameObject, ITank } from '@/game/types/game.types'
import { TankNormal } from './normal'
import { TankSpeedy } from './speedy'
import { TankHeavy } from './heavy'
import { SpawnAnimation } from '../animations/spawn'

interface EnemiesProps {
	enemies: ITank[]
}

export const Enemies = (props: EnemiesProps) => {
	return (
		<>
			{props.enemies.map((enemy) => {
				switch (enemy.type) {
					case 'NORMAL':
						return enemy.spawnAnimation ? (
							<SpawnAnimation key={enemy.id} tank={enemy} />
						) : (
							<TankNormal key={enemy.id} tank={enemy} />
						)
					case 'SPEEDY':
						return enemy.spawnAnimation ? (
							<SpawnAnimation key={enemy.id} tank={enemy} />
						) : (
							<TankSpeedy key={enemy.id} tank={enemy} />
						)
					case 'HEAVY':
						return enemy.spawnAnimation ? (
							<SpawnAnimation key={enemy.id} tank={enemy} />
						) : (
							<TankHeavy tank={enemy} key={enemy.id} />
						)
				}
			})}
		</>
	)
}
