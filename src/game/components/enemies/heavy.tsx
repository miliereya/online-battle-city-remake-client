import { tank_heavy } from '@/game/render/heavy/tank-heavy'
import { ITank } from '@/game/types/game.types'
import { getDirectionDegrees } from '@/game/utils/style.utils'
import { FC } from 'react'
import RenderObject from '../render'

const heavy_1hp = tank_heavy('#183767', '#d2d2d2', '#ececec')
const heavy_2hp = tank_heavy('#175111', '#e98a00', '#f9ea8b')
const heavy_3hp = tank_heavy('#005200', '#008c31', '#b5f7ce')
const heavy_bonus = tank_heavy('#5a007b', '#b53121', '#ffffff')

let bonusTick = 1

setInterval(() => {
	bonusTick = bonusTick === 1 ? 2 : 1
}, 170)

interface TankHeavyProps {
	tank: ITank
}

export const TankHeavy: FC<TankHeavyProps> = ({ tank }) => {
	const { coordinateX, coordinateY, direction, tick, lives, bonus } = tank
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
						{heavy_bonus.t1.map((row, i) => (
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
						{heavy_bonus.t2.map((row, i) => (
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
						{heavy_1hp.t1.map((row, i) => (
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
						{heavy_1hp.t2.map((row, i) => (
							<RenderObject key={'2' + i} row={row} i={i} />
						))}
					</div>
				</>
			) : (
				<>
					{lives === 1 && (
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
								{heavy_1hp.t1.map((row, i) => (
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
								{heavy_1hp.t2.map((row, i) => (
									<RenderObject key={'2' + i} row={row} i={i} />
								))}
							</div>
						</>
					)}
					{lives === 2 && (
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
								{heavy_2hp.t1.map((row, i) => (
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
								{heavy_2hp.t2.map((row, i) => (
									<RenderObject key={'2' + i} row={row} i={i} />
								))}
							</div>
						</>
					)}
					{lives === 3 && (
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
								{heavy_3hp.t1.map((row, i) => (
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
								{heavy_3hp.t2.map((row, i) => (
									<RenderObject key={'2' + i} row={row} i={i} />
								))}
							</div>
						</>
					)}
				</>
			)}
		</>
	)
}
