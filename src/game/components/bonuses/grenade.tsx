import { IBonus } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'
import { grenade } from '@/game/render/bonuses/grenade'

interface GrenadeProps {
	grenade: IBonus
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Grenade = (props: GrenadeProps) => {
	const { coordinateX, coordinateY, id } = props.grenade

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * 4}px`,
				bottom: `${coordinateY * 4}px`,
				zIndex: 10,
				opacity: tick === 1 ? 1 : 0,
			}}
		>
			{grenade.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
