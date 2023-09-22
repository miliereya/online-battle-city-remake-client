import { getDirectionDegrees } from '@/battle-city/utils/style.utils'
import { tank_speedy } from '@/battle-city/render/speedy/tank-speedy'
import RenderObject from '../render'
import { tank_speedy_bonus } from '@/battle-city/render/speedy/tank-speedy-bonus'
import { Tank } from '@/battle-city/game/init'
import { usePixel } from '@/battle-city/hooks/usePixel'

let bonusTick = 1

setInterval(() => {
	bonusTick = bonusTick === 1 ? 2 : 1
}, 170)

interface TankSpeedyProps {
	tank: Tank
}

export const TankSpeedy = (props: TankSpeedyProps) => {
	const { coordinateX, coordinateY, direction, tick, bonus } = props.tank
	const pixel = usePixel()

	return (
		<>
			{bonus ? (
				<>
					<div
						style={{
							rotate: getDirectionDegrees(direction),
							left: `${(coordinateX - 7) * pixel}px`,
							bottom: `${(coordinateY - 7) * pixel}px`,
							position: 'absolute',
							zIndex: tick === 1 ? 2 : 1,
						}}
					>
						{tank_speedy_bonus.t1.map((row, i) => (
							<RenderObject key={'1' + i} row={row} i={i} />
						))}
					</div>
					<div
						style={{
							rotate: getDirectionDegrees(direction),
							left: `${(coordinateX - 7) * pixel}px`,
							bottom: `${(coordinateY - 7) * pixel}px`,
							position: 'absolute',
							zIndex: tick === 2 ? 2 : 1,
						}}
					>
						{tank_speedy_bonus.t2.map((row, i) => (
							<RenderObject key={'2' + i} row={row} i={i} />
						))}
					</div>
					<div
						style={{
							rotate: getDirectionDegrees(direction),
							left: `${(coordinateX - 7) * pixel}px`,
							bottom: `${(coordinateY - 7) * pixel}px`,
							position: 'absolute',
							zIndex: tick === 1 && bonusTick === 2 ? 4 : 0,
						}}
					>
						{tank_speedy.t1.map((row, i) => (
							<RenderObject key={'1' + i} row={row} i={i} />
						))}
					</div>
					<div
						style={{
							rotate: getDirectionDegrees(direction),
							left: `${(coordinateX - 7) * pixel}px`,
							bottom: `${(coordinateY - 7) * pixel}px`,
							position: 'absolute',
							zIndex: tick === 2 && bonusTick === 2 ? 4 : 0,
						}}
					>
						{tank_speedy.t2.map((row, i) => (
							<RenderObject key={'2' + i} row={row} i={i} />
						))}
					</div>
				</>
			) : (
				<>
					<div
						style={{
							rotate: getDirectionDegrees(direction),
							left: `${(coordinateX - 7) * pixel}px`,
							bottom: `${(coordinateY - 7) * pixel}px`,
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
							left: `${(coordinateX - 7) * pixel}px`,
							bottom: `${(coordinateY - 7) * pixel}px`,
							position: 'absolute',
							zIndex: tick === 2 ? 2 : 1,
						}}
					>
						{tank_speedy.t2.map((row, i) => {
							return <RenderObject key={'2' + i} i={i} row={row} />
						})}
					</div>
				</>
			)}
		</>
	)
}
