import { ice } from '@/battle-city/render/objects/ice'
import s from '../game.module.scss'
import RenderObject from '../render'
import { GameObject } from '@/battle-city/game/init'
import { Pixel } from '@/battle-city/types/render.types'

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
