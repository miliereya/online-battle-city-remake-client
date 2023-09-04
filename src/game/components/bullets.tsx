import { IBullet } from '@/game/types/game.types'
import { getDirectionDegrees } from '@/game/utils/style.utils'
import { render_bullet } from '@/game/render/bullet'
import RenderObject from './render'

interface BulletsProps {
	bullets: IBullet[]
}

export const Bullets = (props: BulletsProps) => {
	return (
		<>
			{props.bullets.map((bullet) => {
				const { coordinateX, coordinateY, direction, id } = bullet
				return (
					<div
						key={id}
						style={{
							rotate: getDirectionDegrees(direction),
							left: `${(coordinateX - 1.5) * 4}px`,
							bottom: `${(coordinateY - 1) * 4}px`,
							position: 'absolute',
							zIndex: 3
						}}
					>
						{render_bullet.map((row, i) => (
							<RenderObject key={id + i} i={i} row={row} />
						))}
					</div>
				)
			})}
		</>
	)
}
