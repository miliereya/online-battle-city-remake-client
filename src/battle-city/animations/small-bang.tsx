import s from '../game/game.module.scss'
import RenderObject from '../render'
import { usePixel } from '@/battle-city/hooks/usePixel'
import { IBang, Pixel } from '../types'
import { bang } from '../models'

interface BigBangProps {
	bang: IBang
	pixel: Pixel
}

export const SmallBangAnimation = (props: BigBangProps) => {
	const { coordinateX, coordinateY, id, timer: t } = props.bang
	const pixel = usePixel()

	return (
		<>
			<div
				className={s.object}
				style={{
					left: `${(coordinateX - 7) * props.pixel}px`,
					bottom: `${(coordinateY - 7) * props.pixel}px`,
					zIndex: 10,
					opacity: t > 0 && t < 3 ? 1 : 0,
				}}
			>
				{bang.t1.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${(coordinateX - 7) * props.pixel}px`,
					bottom: `${(coordinateY - 7) * props.pixel}px`,
					zIndex: 10,
					opacity: t >= 3 && t < 6 ? 1 : 0,
				}}
			>
				{bang.t2.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
		</>
	)
}
