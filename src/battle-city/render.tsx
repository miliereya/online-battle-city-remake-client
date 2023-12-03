import s from './game/game.module.scss'
import { memo } from 'react'
interface RenderObjectProps {
	row: string[]
	i: number
}

const RenderObject = memo(({ row, i }: RenderObjectProps) => {
	return (
		<div key={0 + i} className={s.row}>
			{row.map((px, i) => {
				return (
					<div
						style={{ backgroundColor: px }}
						className={s.pixel}
						key={px + i}
					></div>
				)
			})}
		</div>
	)
})

RenderObject.displayName = 'name'
export default RenderObject

