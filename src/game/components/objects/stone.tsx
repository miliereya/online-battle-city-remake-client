import { stone } from '@/game/render/objects/stone'
import { GameObject } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'

interface StoneProps {
	stone: GameObject
}

export const Stone = (props: StoneProps) => {
	const { coordinateX, coordinateY, id } = props.stone

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * 4}px`,
				bottom: `${coordinateY * 4}px`,
			}}
		>
			{stone.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
