import s from '../game.module.scss'
import RenderObject from '../render'
import { star } from '@/battle-city/render/bonuses/star'
import { Bonus } from '@/battle-city/game/init'
import { usePixel } from '@/battle-city/hooks/usePixel'

interface StarProps {
	star: Bonus
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Star = (props: StarProps) => {
	const { coordinateX, coordinateY, id } = props.star
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
			{star.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
