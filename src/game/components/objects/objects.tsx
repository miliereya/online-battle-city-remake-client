import { GameObject } from '@/game/types/game.types'
import { Stone } from './stone'
import { Brick } from './brick'
import { Water } from './water'
import { Trees } from './trees'
import { Ice } from './ice'

interface ObjectProps {
	objects: GameObject[]
}

export const Objects = (props: ObjectProps) => {
	return (
		<>
			{props.objects.map((obj) => {
				switch (obj.type) {
					case 'STONE':
						return <Stone key={obj.id} stone={obj} />
					case 'BRICK':
						return <Brick key={obj.id} brick={obj} />
					case 'WATER':
						return <Water key={obj.id} water={obj} />
					case 'TREES':
						return <Trees key={obj.id} trees={obj} />
					case 'ICE':
						return <Ice key={obj.id} ice={obj} />
				}
			})}
		</>
	)
}
