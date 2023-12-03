import s from '../game/game.module.scss'
import { water } from '../models'
import RenderObject from '../render'
import { Pixel } from '../types'
import { GameObject } from '../instances'

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 600)

interface WaterProps {
	water: GameObject
	pixel: Pixel
}

export const Water = (props: WaterProps) => {
	const { coordinateX, coordinateY, id } = props.water

	return (
		<>
			<div
				className={s.object}
				style={{
					left: `${coordinateX * props.pixel}px`,
					bottom: `${coordinateY * props.pixel}px`,
					zIndex: tick === 1 ? 2 : 1,
				}}
			>
				{water.t1.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${coordinateX * props.pixel}px`,
					bottom: `${coordinateY * props.pixel}px`,
					zIndex: tick === 2 ? 2 : 1,
				}}
			>
				{water.t2.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
		</>
	)
}
