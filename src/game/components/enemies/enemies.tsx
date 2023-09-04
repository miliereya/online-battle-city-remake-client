import { GameObject, ITank } from '@/game/types/game.types'
import { TankNormal } from './normal'
import { TankSpeedy } from './speedy'

interface EnemiesProps {
	enemies: ITank[]
}

export const Enemies = (props: EnemiesProps) => {
	return (
		<>
			{props.enemies.map((enemy) => {
				switch (enemy.type) {
					case 'NORMAL':
						return <TankNormal key={enemy.id} tank={enemy} />
					case 'SPEEDY':
						return <TankSpeedy key={enemy.id} tank={enemy} />
				}
			})}
		</>
	)
}
