import { mutationFilter } from '.'
import { Bonus } from '../init'

export const deleteBonus = (id: string, bonuses: Bonus[]) => {
	mutationFilter(bonuses, (obj: Bonus) => obj.id !== id)
}
