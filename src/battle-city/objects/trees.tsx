import s from '../game/game.module.scss'
import { trees } from '../models'
import RenderObject from '../render'
import { Pixel } from '../types'
import { GameObject } from '../instances'

interface TreesProps {
	trees: GameObject
	pixel: Pixel
}

export const Trees = (props: TreesProps) => {
	const { coordinateX, coordinateY, id } = props.trees

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * props.pixel}px`,
				bottom: `${coordinateY * props.pixel}px`,
				zIndex: 5,
			}}
		>
			{trees.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
