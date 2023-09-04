import { tank_heavy } from '@/game/render/heavy/tank-heavy'
import { ITank } from '@/game/types/game.types'
import { getDirectionDegrees } from '@/game/utils/style.utils'
import { FC } from 'react'
import RenderObject from '../render'

interface TankHeavyProps {
	tank: ITank
}

export const TankHeavy: FC<TankHeavyProps> = ({ tank }) => {
	const { coordinateX, coordinateY, direction, tick } = tank
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
				{tank_heavy.t1.map((row, i) => (
					<RenderObject key={'1' + i} row={row} i={i} />
				))}
			</div>
			<div
				style={{
					rotate: getDirectionDegrees(direction),
					left: `${(coordinateX - 7) * 4}px`,
					bottom: `${(coordinateY - 7) * 4}px`,
					position: 'absolute',
					zIndex: tick === 2 ? 1 : 2,
				}}
			>
				{tank_heavy.t2.map((row, i) => (
					<RenderObject key={'2' + i} row={row} i={i} />
				))}
			</div>
		</>
	)
}
