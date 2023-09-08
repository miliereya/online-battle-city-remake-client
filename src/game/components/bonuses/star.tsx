import { IBonus } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'
import { star } from '@/game/render/bonuses/star'

interface StarProps {
	star: IBonus
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Star = (props: StarProps) => {
	const { coordinateX, coordinateY, id } = props.star

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
			{star.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
