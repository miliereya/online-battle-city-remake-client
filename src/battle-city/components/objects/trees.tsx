import { trees } from '@/battle-city/render/objects/trees'
import s from '../game.module.scss'
import RenderObject from '../render'
import { GameObject } from '@/battle-city/game/init'
import { Pixel } from '@/battle-city/types/render.types'

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
