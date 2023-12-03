import { mutationFilter } from '.'
import { Bonus } from '../instances'

export const deleteBonus = (id: string, bonuses: Bonus[]) => {
	mutationFilter(bonuses, (obj: Bonus) => obj.id !== id)
}
