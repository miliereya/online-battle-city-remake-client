import { IBang } from '@/battle-city/types/game.types'
import { BigBangAnimation } from './big-bang'
import { SmallBangAnimation } from './small-bang'

interface BangsProps {
	bangs: IBang[]
}

export const Bangs = (props: BangsProps) => {
	return (
		<>
			{props.bangs.map((b) => {
				switch (b.type) {
					case 'BIG':
						return <BigBangAnimation key={b.id} bang={b} />
					case 'SMALL':
						return <SmallBangAnimation key={b.id} bang={b} />
				}
			})}
		</>
	)
}
