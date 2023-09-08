import { ITank } from '@/game/types/game.types'
import { getDirectionDegrees } from '@/game/utils/style.utils'
import { tank_normal } from '@/game/render/normal/tank-normal'
import RenderObject from '../render'
import { tank_normal_bonus } from '@/game/render/normal/tank-normal-bonus'

let bonusTick = 1

setInterval(() => {
	bonusTick = bonusTick === 1 ? 2 : 1
}, 170)

interface TankNormalProps {
	tank: ITank
}

export const TankNormal = (props: TankNormalProps) => {
	const { coordinateX, coordinateY, direction, tick, bonus } = props.tank

	return (
		<>
			{bonus ? (
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
						{tank_normal_bonus.t1.map((row, i) => (
							<RenderObject key={'1' + i} row={row} i={i} />
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
						{tank_normal_bonus.t2.map((row, i) => (
							<RenderObject key={'2' + i} row={row} i={i} />
						))}
					</div>
					<div
						style={{
							rotate: getDirectionDegrees(direction),
							left: `${(coordinateX - 7) * 4}px`,
							bottom: `${(coordinateY - 7) * 4}px`,
							position: 'absolute',
							zIndex: tick === 1 && bonusTick === 2 ? 4 : 0,
						}}
					>
						{tank_normal.t1.map((row, i) => (
							<RenderObject key={'1' + i} row={row} i={i} />
						))}
					</div>
					<div
						style={{
							rotate: getDirectionDegrees(direction),
							left: `${(coordinateX - 7) * 4}px`,
							bottom: `${(coordinateY - 7) * 4}px`,
							position: 'absolute',
							zIndex: tick === 2 && bonusTick === 2 ? 4 : 0,
						}}
					>
						{tank_normal.t2.map((row, i) => (
							<RenderObject key={'2' + i} row={row} i={i} />
						))}
					</div>
				</>
			) : (
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
						{tank_normal.t1.map((row, i) => (
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
						{tank_normal.t2.map((row, i) => {
							return <RenderObject key={'2' + i} i={i} row={row} />
						})}
					</div>
				</>
			)}
		</>
	)
}
