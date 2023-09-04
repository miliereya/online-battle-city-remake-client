import { IPlayer } from '@/game/types/game.types'
import { getDirectionDegrees } from '@/game/utils/style.utils'
import { tank_p2__lvl_0 } from '@/game/render/p2/tank-lvl_0'
import RenderObject from '../render'

interface PlayerProps {
	p: IPlayer
}

export const Player2 = (props: PlayerProps) => {
	const { coordinateX, coordinateY, direction, tick } = props.p

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
				{tank_p2__lvl_0.t1.map((row, i) => (
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
				{tank_p2__lvl_0.t2.map((row, i) => {
					return <RenderObject key={'2' + i} i={i} row={row} />
				})}
			</div>
		</>
	)
}
