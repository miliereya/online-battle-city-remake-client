import { Game } from '../game/init'
import { player_icon } from '../render/icons/player-icon'
import { stage_icon } from '../render/icons/stage-icon'
import { tank_icon } from '../render/icons/tank-icon'
import s from './game.module.scss'
import RenderObject from './render'

interface SidebarProps {
	game: Game
}

export const Sidebar = (props: SidebarProps) => {
	const { enemyList, p1, p2, level } = props.game
	return (
		<div className={s.sidebar}>
			<div className={s.tank_container}>
				{enemyList.map((e, i) => (
					<div key={i} className={s.tank_icon_wrapper}>
						{tank_icon.map((row, i) => (
							<RenderObject key={e.type + i} i={i} row={row} />
						))}
					</div>
				))}
			</div>
			<div className={s.p1_container}>
				<p className={s.sidebar_text}>1P</p>
				<div className={s.p_num_wrapper}>
					<div>
						{player_icon.map((row, i) => (
							<RenderObject key={'1' + i} i={i} row={row} />
						))}
					</div>
					<p className={s.sidebar_text}>{p1.lives}</p>
				</div>
			</div>
			{p2 && (
				<div className={s.p2_container}>
					<p className={s.sidebar_text}>2P</p>
					<div className={s.p_num_wrapper}>
						<div>
							{player_icon.map((row, i) => (
								<RenderObject key={'1' + i} i={i} row={row} />
							))}
						</div>
						<p className={s.sidebar_text}>{p2.lives}</p>
					</div>
				</div>
			)}
			{
				<div className={s.stage_wrapper}>
					{stage_icon.map((row, i) => (
						<RenderObject key={'1' + i} i={i} row={row} />
					))}
                    <p className={`${s.sidebar_text} ${s.sidebar_text_stage_num}`}>{level}</p>
				</div>
			}
		</div>
	)
}
