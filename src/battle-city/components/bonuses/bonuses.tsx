import { Timer } from './timer'
import { Star } from './star'
import { Grenade } from './grenade'
import { Helmet } from './helmet'
import { Hp } from './hp'
import { Bonus } from '@/battle-city/game/init'

interface ObjectProps {
	bonuses: Bonus[]
}

export const Bonuses = (props: ObjectProps) => {
	return (
		<>
			{props.bonuses.map((obj) => {
				switch (obj.type) {
					case 'TIMER':
						return <Timer key={obj.id} timer={obj} />
					case 'STAR':
						return <Star key={obj.id} star={obj} />
					case 'GRENADE':
						return <Grenade key={obj.id} grenade={obj} />
					case 'HELMET':
						return <Helmet key={obj.id} helmet={obj} />
					case 'HP':
						return <Hp key={obj.id} hp={obj} />
				}
			})}
		</>
	)
}
