import s from './game.module.scss'
import { memo } from 'react'
interface RenderObjectProps {
	row: string[]
	i: number
}

const RenderObject = memo(({ row, i }: RenderObjectProps) => {
	console.log('rerender')
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
