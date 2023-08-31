import { IPlayer } from '@/game/types/game.types'
import { RenderObject } from './object'
import { tank_player__lvl_1 } from '@/game/render/tank-lvl1'
import { getDirectionDegrees } from '@/game/utils/style.utils'

interface PlayerProps {
	p: IPlayer
	pNum: 1 | 2
}

export const Player = (props: PlayerProps) => {
	const { coordinateX, coordinateY, direction, tick } = props.p
	return (
		<div
			style={{
				rotate: getDirectionDegrees(direction),
				left: `${(coordinateX - 7) * 4}px`,
				bottom: `${(coordinateY - 7) * 4}px`,
				position: 'absolute',
			}}
		>
			{tank_player__lvl_1(props.pNum, tick).map((row, i) => (
				<RenderObject
					key={props.pNum.toString() + i + new Date()}
					i={i}
					row={row}
				/>
			))}
		</div>
	)
}
