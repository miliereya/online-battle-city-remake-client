'use client'
import { useGame } from './game/provider'
import { GameLocal } from './game/game-local'
import { GameOnline } from './game/game-online'
import { Menu } from './menu'

export const BattleCity = () => {
	const { game } = useGame()
	return game ? game.id === 'local' ? <GameLocal /> : <GameOnline /> : <Menu />
}
