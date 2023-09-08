import { ice } from '@/game/render/objects/ice'
import { GameObject } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'

interface IceProps {
	ice: GameObject
}

export const Ice = (props: IceProps) => {
	const { coordinateX, coordinateY, id } = props.ice

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * 4}px`,
				bottom: `${coordinateY * 4}px`,
				zIndex: 1,
			}}
		>
			{ice.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
