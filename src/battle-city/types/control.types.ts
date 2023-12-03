import { TypeDirection } from '.'

export interface Controls {
	pause: boolean
	fire: boolean
	move: TypeDirection | null
}
