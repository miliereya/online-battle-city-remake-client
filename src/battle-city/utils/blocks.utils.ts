import { mutationFilter } from '.'
import { GameObject } from '../instances'

export const deleteBlock = (id: string, objects: GameObject[]) => {
	mutationFilter(objects, (obj: GameObject) => obj.id !== id)
}
