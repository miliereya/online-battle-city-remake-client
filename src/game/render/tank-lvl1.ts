import { IPlayerNum } from '../types/game.types'

export const tank_player__lvl_1 = (p: IPlayerNum, tick: 1 | 2) => {
	const ds = p === 1 ? '#4f3200' : '#173321'
	const dl = p === 1 ? '#175111' : '#4a7e12'
	const me = p === 1 ? '#e98a00' : '#50a870'
	const li = p === 1 ? '#f9ea8b' : '#a4ffcc'
	const no = ''

	return tick === 1
		? [
				[ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, no],
				[ds, li, dl, li, dl, li, dl, li, dl, li, dl, li, dl, ds, no],
				[ds, me, dl, me, dl, me, dl, me, dl, me, dl, me, dl, ds, no],
				[ds, me, dl, dl, dl, dl, dl, dl, dl, dl, dl, dl, dl, ds, no],
				[ds, ds, ds, me, li, li, li, li, li, li, li, ds, ds, ds, no],
				[no, ds, li, li, me, me, me, me, li, li, li, ds, no, no, no],
				[no, ds, li, me, li, li, li, me, me, me, me, ds, no, no, no],
				[no, ds, me, me, li, me, me, dl, me, li, li, li, li, li, li],
				[no, ds, me, me, me, dl, dl, dl, me, me, me, ds, no, no, no],
				[no, ds, me, dl, me, me, me, me, me, me, me, ds, no, no, no],
				[ds, ds, ds, dl, dl, dl, dl, dl, dl, me, me, ds, ds, ds, no],
				[ds, li, dl, dl, dl, dl, dl, dl, dl, dl, dl, dl, dl, ds, no],
				[ds, me, dl, me, dl, me, dl, me, dl, me, dl, me, dl, ds, no],
				[ds, me, dl, me, dl, me, dl, me, dl, me, dl, me, dl, ds, no],
				[ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, no],
		  ]
		: [
				[ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, no],
				[ds, dl, li, dl, li, dl, li, dl, li, dl, li, dl, li, ds, no],
				[ds, dl, me, dl, me, dl, me, dl, me, dl, me, dl, me, ds, no],
				[ds, me, dl, dl, dl, dl, dl, dl, dl, dl, dl, dl, dl, ds, no],
				[ds, ds, ds, me, li, li, li, li, li, li, li, ds, ds, ds, no],
				[no, ds, li, li, me, me, me, me, li, li, li, ds, no, no, no],
				[no, ds, li, me, li, li, li, me, me, me, me, ds, no, no, no],
				[no, ds, me, me, li, me, me, dl, me, li, li, li, li, li, li],
				[no, ds, me, me, me, dl, dl, dl, me, me, me, ds, no, no, no],
				[no, ds, me, dl, me, me, me, me, me, me, me, ds, no, no, no],
				[ds, ds, ds, dl, dl, dl, dl, dl, dl, me, me, ds, ds, ds, no],
				[ds, li, dl, dl, dl, dl, dl, dl, dl, dl, dl, dl, dl, ds, no],
				[ds, dl, me, dl, me, dl, me, dl, me, dl, me, dl, me, ds, no],
				[ds, dl, me, dl, me, dl, me, dl, me, dl, me, dl, me, ds, no],
				[ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, ds, no],
		  ]
}
