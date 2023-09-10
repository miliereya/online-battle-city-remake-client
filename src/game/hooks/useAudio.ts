import { getKeys } from '../utils/object.utils'

export const useAudio = <T>(sounds: T) => {
	if (!sounds) return
	const titles = getKeys(sounds)

	for (let i = 0; i < titles.length; i++) {
		if (sounds[titles[i]]) {
			if (titles[i] !== 'player_move')
				new Audio(`/${String(titles[i])}.ogg`).play()
		}
	}
}
