import { GameObject } from '@/game/types/game.types'
import s from '../game.module.scss'
import { Block } from './object'

interface ObjectProps {
	objects: GameObject[]
}

export const Objects = (props: ObjectProps) => {
	return (
		<>
			{props.objects.map((obj) => {
				return <Block key={obj.id} obj={obj} />
			})}
		</>
	)
}
