import { brick } from '@/battle-city/render/objects/brick'
import s from '../game.module.scss'
import RenderObject from '../render'
import { GameObject } from '@/battle-city/game/init'
import { Pixel } from '@/battle-city/types/render.types'

interface BrickProps {
	brick: GameObject
	pixel: Pixel
}

export const Brick = (props: BrickProps) => {
	const { coordinateX, coordinateY, id } = props.brick

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * props.pixel}px`,
				bottom: `${coordinateY * props.pixel}px`,
			}}
		>
			{brick.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
