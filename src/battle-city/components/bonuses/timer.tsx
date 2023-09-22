import s from '../game.module.scss'
import RenderObject from '../render'
import { timer } from '@/battle-city/render/bonuses/timer'
import { Bonus } from '@/battle-city/game/init'
import { usePixel } from '@/battle-city/hooks/usePixel'

interface TimerProps {
	timer: Bonus
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Timer = (props: TimerProps) => {
	const { coordinateX, coordinateY, id } = props.timer
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
			{timer.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
