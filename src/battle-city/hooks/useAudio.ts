'use client'

import { GameSettings } from '../game/provider'
import { getKeys } from '../utils/object.utils'

export const useAudio = <T>(sounds: T, settings: GameSettings | undefined) => {
	if (!sounds || !settings) return
	const titles = getKeys(sounds)

	for (let i = 0; i < titles.length; i++) {
		if (sounds[titles[i]]) {
			if (
				titles[i] !== 'player_move' &&
				titles[i] !== 'enemy_move' &&
				typeof Audio !== undefined
			)
				new Audio(`/audio/${settings.soundPack}/${String(titles[i])}.ogg`).play()
		}
	}
}
