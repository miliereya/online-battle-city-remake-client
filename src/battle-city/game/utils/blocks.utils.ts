import { GameObject } from '../init'
import { mutationFilter } from '.'

export const deleteBlock = (id: string, objects: GameObject[]) => {
	mutationFilter(objects, (obj: GameObject) => obj.id !== id)
}
