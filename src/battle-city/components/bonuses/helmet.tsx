import s from '../game.module.scss'
import RenderObject from '../render'
import { helmet } from '@/battle-city/render/bonuses/helmet'
import { Bonus } from '@/battle-city/game/init'
import { usePixel } from '@/battle-city/hooks/usePixel'

interface HelmetProps {
	helmet: Bonus
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Helmet = (props: HelmetProps) => {
	const { coordinateX, coordinateY, id } = props.helmet
	const pixel = usePixel()

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * pixel}px`,
				bottom: `${coordinateY * pixel}px`,
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
