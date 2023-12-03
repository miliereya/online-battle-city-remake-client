import s from '../game/game.module.scss'
import RenderObject from '../render'
import { Pixel } from '@/battle-city/types/render.types'
import { stone } from '../models'
import { GameObject } from '../instances'

interface StoneProps {
	stone: GameObject
	pixel: Pixel
}

export const Stone = (props: StoneProps) => {
	const { coordinateX, coordinateY, id } = props.stone

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * props.pixel}px`,
				bottom: `${coordinateY * props.pixel}px`,
			}}
		>
			{stone.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
