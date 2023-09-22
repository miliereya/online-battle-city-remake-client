import RenderObject from '../render'
import s from '../game.module.scss'
import { flag } from '@/battle-city/render/objects/flag'
import { Pixel } from '@/battle-city/types/render.types'

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
