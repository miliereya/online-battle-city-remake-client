import { GameObject, TypeGameObjet } from '@/game/types/game.types'
import s from '../game.module.scss'
import { brick } from '@/game/render/brick'
import { stone } from '@/game/render/stone'

interface RenderBlockProps {
	row: string[]
	i: number
}

export const RenderObject = ({ row, i }: RenderBlockProps) => {
	return (
		<div key={0 + i} className={s.row}>
			{row.map((px, i) => {
				return (
					<div
						style={{ backgroundColor: px }}
						className={s.pixel}
						key={px + i + new Date()}
					></div>
				)
			})}
		</div>
	)
}

interface BlockProps {
	obj: GameObject
}

export const Block = (props: BlockProps) => {
	const { coordinateX, coordinateY, id, type } = props.obj
	return (
		<div
			className={s.object}
			style={{
				left: `${coordinateX * 4}px`,
				bottom: `${coordinateY * 4}px`,
			}}
		>
			{type === 'STONE' &&
				stone.map((row, i) => (
					<RenderObject key={id + i + new Date()} i={i} row={row} />
				))}
			{type === 'BRICK' &&
				brick.map((row, i) => (
					<RenderObject key={id + i + new Date()} i={i} row={row} />
				))}
		</div>
	)
}
