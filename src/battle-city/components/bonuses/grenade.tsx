import s from '../game.module.scss'
import RenderObject from '../render'
import { grenade } from '@/battle-city/render/bonuses/grenade'
import { Bonus } from '@/battle-city/game/init'
import { usePixel } from '@/battle-city/hooks/usePixel'
import { Pixel } from '@/battle-city/types/render.types'

interface GrenadeProps {
	grenade: Bonus
	pixel: Pixel
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Grenade = (props: GrenadeProps) => {
	const { coordinateX, coordinateY, id } = props.grenade

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * props.pixel}px`,
				bottom: `${coordinateY * props.pixel}px`,
				zIndex: 10,
				opacity: tick === 1 ? 1 : 0,
			}}
		>
			{grenade.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
