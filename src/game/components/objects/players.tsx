import { IGame, IPlayer } from '@/game/types/game.types'
import { Player } from './player'

interface PlayersProps {
	p1: IPlayer
	p2: IPlayer
}

export const Players = (props: PlayersProps) => {
	const { p1, p2 } = props
	return (
		<>
			{p1.deathCooldown === 0 && p1.lives > 0 && <Player pNum={1} p={p1} />}
			{p2.deathCooldown === 0 && p2.lives > 0 && <Player pNum={2} p={p2} />}
		</>
	)
}
