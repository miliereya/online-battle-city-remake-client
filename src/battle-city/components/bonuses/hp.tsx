import { Bonus } from '@/battle-city/game/init'
import s from '../game.module.scss'
import RenderObject from '../render'
import { hp } from '@/battle-city/render/bonuses/hp'
import { usePixel } from '@/battle-city/hooks/usePixel'

interface HpProps {
	hp: Bonus
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Hp = (props: HpProps) => {
	const { coordinateX, coordinateY, id } = props.hp
	const pixel = usePixel()

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * pixel}px`,
				bottom: `${coordinateY * pixel}px`,
				zIndex: 10,
				opacity: tick === 1 ? 1 : 0,
			}}
		>
			{hp.map((row, i) => (
				<RenderObject key={id + i} i={i} row={row} />
			))}
		</div>
	)
}
