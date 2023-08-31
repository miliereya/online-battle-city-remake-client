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
			{p1.isAlive && <Player pNum={1} p={p1} />}
			{p2.isAlive && <Player pNum={2} p={p2} />}
		</>
	)
}
