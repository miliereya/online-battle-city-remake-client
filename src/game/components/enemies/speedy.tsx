import { ITank } from '@/game/types/game.types'
import { getDirectionDegrees } from '@/game/utils/style.utils'
import { tank_speedy } from '@/game/render/speedy/tank-speedy'
import RenderObject from '../render'

interface TankSpeedyProps {
	tank: ITank
}

export const TankSpeedy = (props: TankSpeedyProps) => {
	const { coordinateX, coordinateY, direction, tick } = props.tank
	console.log(tick)
	return (
		<>
			<div
				style={{
					rotate: getDirectionDegrees(direction),
					left: `${(coordinateX - 7) * 4}px`,
					bottom: `${(coordinateY - 7) * 4}px`,
					position: 'absolute',
					zIndex: tick === 1 ? 2 : 1,
				}}
			>
				{tank_speedy.t1.map((row, i) => (
					<RenderObject key={'1' + i} i={i} row={row} />
				))}
			</div>
			<div
				style={{
					rotate: getDirectionDegrees(direction),
					left: `${(coordinateX - 7) * 4}px`,
					bottom: `${(coordinateY - 7) * 4}px`,
					position: 'absolute',
					zIndex: tick === 2 ? 2 : 1,
				}}
			>
				{tank_speedy.t2.map((row, i) => {
					return <RenderObject key={'2' + i} i={i} row={row} />
				})}
			</div>
		</>
	)
}
