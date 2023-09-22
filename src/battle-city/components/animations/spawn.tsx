import s from '../game.module.scss'
import RenderObject from '../render'
import { spawn } from '@/battle-city/render/animations/spawn'
import { Tank } from '@/battle-city/game/init'
import { usePixel } from '@/battle-city/hooks/usePixel'

interface Props {
	tank: Tank
}

export const SpawnAnimation = (props: Props) => {
	const { coordinateX, coordinateY, id, spawnAnimation: sp } = props.tank
	const pixel = usePixel()

	return (
		<>
			<div
				className={s.object}
				style={{
					left: `${(coordinateX - 7) * pixel}px`,
					bottom: `${(coordinateY - 7) * pixel}px`,
					zIndex: 10,
					opacity:
						(sp > 0 && sp < 3) || (sp >= 18 && sp < 21) || (sp >= 36 && sp < 39)
							? 1
							: 0,
				}}
			>
				{spawn.t1.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${(coordinateX - 7) * pixel}px`,
					bottom: `${(coordinateY - 7) * pixel}px`,
					zIndex: 10,
					opacity:
						(sp >= 3 && sp < 6) ||
						(sp >= 15 && sp < 18) ||
						(sp >= 21 && sp < 24) ||
						(sp >= 33 && sp < 36) ||
						(sp >= 39 && sp < 42)
							? 1
							: 0,
				}}
			>
				{spawn.t2.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${(coordinateX - 7) * pixel}px`,
					bottom: `${(coordinateY - 7) * pixel}px`,
					zIndex: 10,
					opacity:
						(sp >= 6 && sp < 9) ||
						(sp >= 12 && sp < 15) ||
						(sp >= 24 && sp < 27) ||
						(sp >= 30 && sp < 33) ||
						(sp >= 42 && sp < 45)
							? 1
							: 0,
				}}
			>
				{spawn.t3.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${(coordinateX - 7) * pixel}px`,
					bottom: `${(coordinateY - 7) * pixel}px`,
					zIndex: 10,
					opacity:
						(sp >= 9 && sp < 12) ||
						(sp >= 27 && sp < 30) ||
						(sp >= 45 && sp < 50)
							? 1
							: 0,
				}}
			>
				{spawn.t4.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
		</>
	)
}
