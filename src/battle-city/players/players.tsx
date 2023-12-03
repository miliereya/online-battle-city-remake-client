import { Player } from '../instances'
import { Player1 } from './p1'
import { Player2 } from './Player2'

interface PlayersProps {
	p1: Player
	p2: Player | null
}

export const Players = (props: PlayersProps) => {
	const { p1, p2 } = props
	return (
		<>
			{p1.deathCooldown === 0 && p1.lives > 0 && <Player1 p={p1} />}
			{p2 && p2.deathCooldown === 0 && p2.lives > 0 && <Player2 p={p2} />}
		</>
	)
}
