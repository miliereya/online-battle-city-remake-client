import { IBang, ITank } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'
import { bang } from '@/game/render/animations/bang'

interface BigBangProps {
	bang: IBang
}

export const SmallBangAnimation = (props: BigBangProps) => {
	const { coordinateX, coordinateY, id, timer: t } = props.bang

	return (
		<>
			<div
				className={s.object}
				style={{
					left: `${(coordinateX - 7) * 4}px`,
					bottom: `${(coordinateY - 7) * 4}px`,
					zIndex: 10,
					opacity: (t > 0 && t < 3)  ? 1 : 0,
				}}
			>
				{bang.t1.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${(coordinateX - 7) * 4}px`,
					bottom: `${(coordinateY - 7) * 4}px`,
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
