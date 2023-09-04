import { water } from '@/game/render/objects/water'
import { GameObject } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 600)

interface WaterProps {
	water: GameObject
}

export const Water = (props: WaterProps) => {
	const { coordinateX, coordinateY, id } = props.water

	return (
		<>
			<div
				className={s.object}
				style={{
					left: `${coordinateX * 4}px`,
					bottom: `${coordinateY * 4}px`,
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
					left: `${coordinateX * 4}px`,
					bottom: `${coordinateY * 4}px`,
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
