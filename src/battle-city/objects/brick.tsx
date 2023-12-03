import s from '../game/game.module.scss'
import RenderObject from '../render'
import { Pixel } from '../types'
import { brick } from '../models'
import { GameObject } from '../instances'

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
