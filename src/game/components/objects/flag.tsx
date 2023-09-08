import RenderObject from '../render'
import s from '../game.module.scss'
import { flag } from '@/game/render/objects/flag'

interface FlagProps {
	isAlive: boolean
}

export const Flag = (props: FlagProps) => {
	return (
		<div
			className={s.object}
			style={{
				left: `${12 * 8 * 4}px`,
				bottom: 0,
			}}
		>
			{props.isAlive
				? flag.alive.map((row, i) => (
						<RenderObject key={'flag' + i} i={i} row={row} />
				  ))
				: flag.dead.map((row, i) => (
						<RenderObject key={'flag' + i} i={i} row={row} />
				  ))}
		</div>
	)
}
