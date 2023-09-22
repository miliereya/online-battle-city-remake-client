import { getDirectionDegrees } from '@/battle-city/utils/style.utils'
import { render_bullet } from '@/battle-city/render/bullet'
import RenderObject from './render'
import { Bullet } from '../game/init'
import { usePixel } from '../hooks/usePixel'

interface BulletsProps {
	bullets: Bullet[]
}

export const Bullets = (props: BulletsProps) => {
	const pixel = usePixel()

	return (
		<>
			{props.bullets.map((bullet) => {
				const { coordinateX, coordinateY, direction, id } = bullet
				return (
					<div
						key={id}
						style={{
							rotate: getDirectionDegrees(direction),
							left: `${(coordinateX - 1.5) * pixel}px`,
							bottom: `${(coordinateY - 1) * pixel}px`,
							position: 'absolute',
							zIndex: 3,
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
