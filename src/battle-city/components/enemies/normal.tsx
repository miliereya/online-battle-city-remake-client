import { getDirectionDegrees } from '@/battle-city/utils/style.utils'
import { tank_normal } from '@/battle-city/render/normal/tank-normal'
import RenderObject from '../render'
import { tank_normal_bonus } from '@/battle-city/render/normal/tank-normal-bonus'
import { Tank } from '@/battle-city/game/init'
import { usePixel } from '@/battle-city/hooks/usePixel'
import { Pixel } from '@/battle-city/types/render.types'

let bonusTick = 1

setInterval(() => {
	bonusTick = bonusTick === 1 ? 2 : 1
}, 170)

interface TankNormalProps {
	tank: Tank
	pixel: Pixel
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
							left: `${(coordinateX - 7) * props.pixel}px`,
							bottom: `${(coordinateY - 7) * props.pixel}px`,
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
							left: `${(coordinateX - 7) * props.pixel}px`,
							bottom: `${(coordinateY - 7) * props.pixel}px`,
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
							left: `${(coordinateX - 7) * props.pixel}px`,
							bottom: `${(coordinateY - 7) * props.pixel}px`,
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
							left: `${(coordinateX - 7) * props.pixel}px`,
							bottom: `${(coordinateY - 7) * props.pixel}px`,
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
							left: `${(coordinateX - 7) * props.pixel}px`,
							bottom: `${(coordinateY - 7) * props.pixel}px`,
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
							left: `${(coordinateX - 7) * props.pixel}px`,
							bottom: `${(coordinateY - 7) * props.pixel}px`,
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
