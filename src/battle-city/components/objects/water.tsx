import { water } from '@/battle-city/render/objects/water'
import s from '../game.module.scss'
import RenderObject from '../render'
import { GameObject } from '@/battle-city/game/init'
import { usePixel } from '@/battle-city/hooks/usePixel'
import { Pixel } from '@/battle-city/types/render.types'

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
