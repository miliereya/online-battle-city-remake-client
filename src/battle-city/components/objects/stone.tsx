import { stone } from '@/battle-city/render/objects/stone'
import s from '../game.module.scss'
import RenderObject from '../render'
import { GameObject } from '@/battle-city/game/init'
import { Pixel } from '@/battle-city/types/render.types'

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
