import { IBonus } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'
import { helmet } from '@/game/render/bonuses/helmet'

interface HelmetProps {
	helmet: IBonus
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Helmet = (props: HelmetProps) => {
	const { coordinateX, coordinateY, id } = props.helmet

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
			{helmet.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
