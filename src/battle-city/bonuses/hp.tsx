import s from '../game/game.module.scss'
import { Bonus } from '../instances'
import { hp } from '../models'
import RenderObject from '../render'
import { Pixel } from '@/battle-city/types/render.types'

interface HpProps {
	hp: Bonus
	pixel: Pixel
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Hp = (props: HpProps) => {
	const { coordinateX, coordinateY, id } = props.hp

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * props.pixel}px`,
				bottom: `${coordinateY * props.pixel}px`,
				zIndex: 10,
				opacity: tick === 1 ? 1 : 0,
			}}
		>
			{hp.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
