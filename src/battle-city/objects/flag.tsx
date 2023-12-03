import RenderObject from '../render'
import s from '../game/game.module.scss'
import { Pixel } from '../types'
import { flag } from '../models'

interface FlagProps {
	isAlive: boolean
	pixel: Pixel
}

export const Flag = (props: FlagProps) => {
	return (
		<div
			className={s.object}
			style={{
				left: `${12 * 8 * props.pixel}px`,
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
