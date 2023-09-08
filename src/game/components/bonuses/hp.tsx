import { IBonus } from '@/game/types/game.types'
import s from '../game.module.scss'
import RenderObject from '../render'
import { hp } from '@/game/render/bonuses/hp'

interface HpProps {
	hp: IBonus
}

let tick = 1
setInterval(() => {
	tick = tick === 1 ? 2 : 1
}, 150)

export const Hp = (props: HpProps) => {
	const { coordinateX, coordinateY, id } = props.hp

	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * 4}px`,
				bottom: `${coordinateY * 4}px`,
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
