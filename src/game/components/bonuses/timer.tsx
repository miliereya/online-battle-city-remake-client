import { IBonus } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'
import { timer } from '@/game/render/bonuses/timer'

interface TimerProps {
	timer: IBonus
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Timer = (props: TimerProps) => {
	const { coordinateX, coordinateY, id } = props.timer

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
			{timer.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
