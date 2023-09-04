import { brick } from '@/game/render/objects/brick'
import { GameObject } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'

interface BrickProps {
	brick: GameObject
}

export const Brick = (props: BrickProps) => {
	const { coordinateX, coordinateY, id } = props.brick

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * 4}px`,
				bottom: `${coordinateY * 4}px`,
			}}
		>
			{brick.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
