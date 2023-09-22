import { GameActions, GameManager, Lobby, TypeDirection } from './types'
import { InputDto } from './dto'
import { Settings } from './settings'
import { Game } from './init'
import {
	animationsFrameLogic,
	bonusesFrameLogic,
	bulletsFrameLogic,
	enemiesFrameLogic,
	enemiesSpawnLogic,
	gameStatusFrameLogic,
	levelFrameLogic,
	playersFrameLogic,
} from './logics'

export class GameService {
	gameManager: GameManager = {}


	input(dto: InputDto) {
		const game = this.gameManager[dto.gameId]
		if (!game) return

		const playerController =
			dto.player === game.p1.id ? game.p1Controls : game.p2Controls

		const button = dto.button
		if (
			button === 'TOP' ||
			button === 'RIGHT' ||
			button === 'LEFT' ||
			button === 'BOTTOM'
		) {
			playerController.move = dto.button as TypeDirection
		}
		if (button === 'FIRE') playerController.fire = true
		if (button === 'PAUSE') playerController.pause = true
	}
}
