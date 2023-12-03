import s from '../game/game.module.scss'
import { ice } from '../models'
import RenderObject from '../render'
import { Pixel } from '../types'
import { GameObject } from '../instances'

interface IceProps {
	ice: GameObject
	pixel: Pixel
}

export const Ice = (props: IceProps) => {
	const { coordinateX, coordinateY, id } = props.ice

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * props.pixel}px`,
				bottom: `${coordinateY * props.pixel}px`,
				zIndex: 1,
			}}
		>
			{ice.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
