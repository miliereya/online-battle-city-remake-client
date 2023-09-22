import { useEffect } from 'react'
import s from './animations.module.scss'

export const GameOverAnimation = () => {
	return (
		<p className={s.game_over_text}>
			GAME
			<br />
			OVER
		</p>
	)
}
