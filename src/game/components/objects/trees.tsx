import { trees } from '@/game/render/objects/trees'
import { GameObject } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'

interface TreesProps {
	trees: GameObject
}

export const Trees = (props: TreesProps) => {
	const { coordinateX, coordinateY, id } = props.trees

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * 4}px`,
				bottom: `${coordinateY * 4}px`,
				zIndex: 5,
			}}
		>
			{trees.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
