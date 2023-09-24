import { IBang } from '@/battle-city/types/game.types'
import { BigBangAnimation } from './big-bang'
import { SmallBangAnimation } from './small-bang'
import { usePixel } from '@/battle-city/hooks/usePixel'

interface BangsProps {
	bangs: IBang[]
}

export const Bangs = (props: BangsProps) => {
	const pixel = usePixel()
	return (
		<>
			{props.bangs.map((b) => {
				switch (b.type) {
					case 'BIG':
						return <BigBangAnimation key={b.id} bang={b} pixel={pixel} />
					case 'SMALL':
						return <SmallBangAnimation key={b.id} bang={b} pixel={pixel} />
				}
			})}
		</>
	)
}
