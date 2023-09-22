import { GameObject } from '../init'
import { Map } from '../types'
import { MapInstance } from './map-instance'

export const Map3 = (): Map => ({
	objects: [
		...MapInstance(),
		new GameObject('BRICK', 0, 2),
		new GameObject('BRICK', 1, 2),
		new GameObject('BRICK', 1, 3),
		new GameObject('BRICK', 0, 3),
		new GameObject('BRICK', 0, 4),
		new GameObject('BRICK', 1, 4),
		new GameObject('BRICK', 1, 5),
		new GameObject('BRICK', 0, 5),
		new GameObject('BRICK', 2, 3),
		new GameObject('BRICK', 3, 2),
		new GameObject('BRICK', 2, 2),
		new GameObject('BRICK', 3, 3),
		new GameObject('BRICK', 3, 1),
		new GameObject('BRICK', 2, 1),
		new GameObject('BRICK', 2, 0),
		new GameObject('BRICK', 3, 0),
		new GameObject('BRICK', 4, 0),
		new GameObject('BRICK', 5, 0),
		new GameObject('BRICK', 5, 1),
		new GameObject('BRICK', 4, 1),
		new GameObject('STONE', 1, 1),
		new GameObject('STONE', 0, 1),
		new GameObject('STONE', 0, 0),
		new GameObject('STONE', 1, 0),
		new GameObject('STONE', 6, 2),
		new GameObject('STONE', 6, 3),
		new GameObject('STONE', 6, 4),
		new GameObject('STONE', 6, 5),
		new GameObject('BRICK', 0, 8),
		new GameObject('BRICK', 1, 8),
		new GameObject('BRICK', 1, 9),
		new GameObject('BRICK', 0, 9),
		new GameObject('BRICK', 2, 9),
		new GameObject('BRICK', 2, 8),
		new GameObject('BRICK', 2, 10),
		new GameObject('BRICK', 3, 10),
		new GameObject('BRICK', 5, 8),
		new GameObject('BRICK', 5, 9),
		new GameObject('BRICK', 6, 9),
		new GameObject('BRICK', 6, 10),
		new GameObject('BRICK', 7, 10),
		new GameObject('BRICK', 7, 9),
		new GameObject('BRICK', 8, 9),
		new GameObject('BRICK', 8, 8),
		new GameObject('BRICK', 7, 8),
		new GameObject('BRICK', 6, 8),
		new GameObject('BRICK', 10, 7),
		new GameObject('BRICK', 10, 6),
		new GameObject('BRICK', 11, 6),
		new GameObject('BRICK', 11, 7),
		new GameObject('BRICK', 11, 8),
		new GameObject('BRICK', 11, 9),
		new GameObject('BRICK', 12, 9),
		new GameObject('BRICK', 13, 9),
		new GameObject('BRICK', 14, 9),
		new GameObject('BRICK', 14, 5),
		new GameObject('BRICK', 14, 6),
		new GameObject('BRICK', 15, 6),
		new GameObject('BRICK', 16, 6),
		new GameObject('BRICK', 17, 6),
		new GameObject('BRICK', 17, 5),
		new GameObject('BRICK', 16, 5),
		new GameObject('BRICK', 15, 5),
		new GameObject('BRICK', 15, 9),
		new GameObject('BRICK', 16, 9),
		new GameObject('BRICK', 17, 9),
		new GameObject('BRICK', 18, 0),
		new GameObject('BRICK', 18, 1),
		new GameObject('BRICK', 19, 0),
		new GameObject('BRICK', 19, 1),
		new GameObject('TREES', 18, 5),
		new GameObject('TREES', 18, 4),
		new GameObject('TREES', 18, 3),
		new GameObject('TREES', 18, 2),
		new GameObject('TREES', 19, 2),
		new GameObject('TREES', 19, 3),
		new GameObject('TREES', 19, 4),
		new GameObject('TREES', 19, 5),
		new GameObject('TREES', 19, 6),
		new GameObject('TREES', 18, 6),
		new GameObject('TREES', 18, 7),
		new GameObject('TREES', 18, 8),
		new GameObject('TREES', 18, 9),
		new GameObject('TREES', 18, 10),
		new GameObject('TREES', 19, 10),
		new GameObject('TREES', 19, 9),
		new GameObject('TREES', 19, 8),
		new GameObject('TREES', 19, 7),
		new GameObject('TREES', 20, 7),
		new GameObject('TREES', 20, 6),
		new GameObject('TREES', 20, 5),
		new GameObject('TREES', 20, 4),
		new GameObject('TREES', 20, 3),
		new GameObject('TREES', 21, 3),
		new GameObject('TREES', 21, 2),
		new GameObject('TREES', 20, 2),
		new GameObject('TREES', 22, 2),
		new GameObject('TREES', 23, 2),
		new GameObject('TREES', 22, 3),
		new GameObject('TREES', 23, 3),
		new GameObject('TREES', 23, 4),
		new GameObject('TREES', 22, 4),
		new GameObject('TREES', 21, 5),
		new GameObject('TREES', 21, 4),
		new GameObject('TREES', 22, 5),
		new GameObject('TREES', 23, 5),
		new GameObject('TREES', 22, 6),
		new GameObject('TREES', 23, 6),
		new GameObject('TREES', 21, 6),
		new GameObject('TREES', 21, 7),
		new GameObject('TREES', 22, 7),
		new GameObject('TREES', 23, 7),
		new GameObject('TREES', 24, 7),
		new GameObject('TREES', 25, 7),
		new GameObject('TREES', 25, 8),
		new GameObject('TREES', 24, 8),
		new GameObject('TREES', 23, 8),
		new GameObject('TREES', 21, 8),
		new GameObject('TREES', 20, 9),
		new GameObject('TREES', 20, 10),
		new GameObject('TREES', 21, 10),
		new GameObject('TREES', 22, 10),
		new GameObject('TREES', 23, 10),
		new GameObject('TREES', 24, 10),
		new GameObject('TREES', 25, 9),
		new GameObject('TREES', 24, 9),
		new GameObject('TREES', 23, 9),
		new GameObject('TREES', 22, 9),
		new GameObject('TREES', 21, 9),
		new GameObject('TREES', 20, 8),
		new GameObject('TREES', 22, 8),
		new GameObject('TREES', 25, 10),
		new GameObject('TREES', 23, 11),
		new GameObject('TREES', 22, 11),
		new GameObject('TREES', 22, 12),
		new GameObject('TREES', 23, 12),
		new GameObject('BRICK', 23, 14),
		new GameObject('BRICK', 23, 15),
		new GameObject('BRICK', 23, 16),
		new GameObject('BRICK', 23, 17),
		new GameObject('BRICK', 24, 18),
		new GameObject('BRICK', 23, 18),
		new GameObject('BRICK', 22, 18),
		new GameObject('BRICK', 21, 18),
		new GameObject('BRICK', 20, 18),
		new GameObject('BRICK', 19, 17),
		new GameObject('BRICK', 19, 18),
		new GameObject('BRICK', 18, 18),
		new GameObject('BRICK', 18, 17),
		new GameObject('BRICK', 18, 16),
		new GameObject('BRICK', 19, 16),
		new GameObject('STONE', 17, 12),
		new GameObject('STONE', 16, 12),
		new GameObject('STONE', 15, 12),
		new GameObject('STONE', 14, 12),
		new GameObject('STONE', 12, 12),
		new GameObject('STONE', 13, 12),
		new GameObject('BRICK', 13, 14),
		new GameObject('BRICK', 12, 14),
		new GameObject('BRICK', 13, 15),
		new GameObject('BRICK', 12, 15),
		new GameObject('BRICK', 12, 16),
		new GameObject('BRICK', 13, 16),
		new GameObject('BRICK', 15, 17),
		new GameObject('BRICK', 14, 17),
		new GameObject('BRICK', 14, 18),
		new GameObject('BRICK', 15, 18),
		new GameObject('BRICK', 11, 16),
		new GameObject('BRICK', 10, 16),
		new GameObject('BRICK', 9, 16),
		new GameObject('BRICK', 8, 16),
		new GameObject('TREES', 7, 16),
		new GameObject('TREES', 7, 15),
		new GameObject('TREES', 6, 15),
		new GameObject('TREES', 5, 15),
		new GameObject('TREES', 4, 15),
		new GameObject('TREES', 3, 15),
		new GameObject('TREES', 2, 15),
		new GameObject('TREES', 1, 15),
		new GameObject('TREES', 0, 15),
		new GameObject('TREES', 0, 14),
		new GameObject('TREES', 1, 14),
		new GameObject('TREES', 2, 14),
		new GameObject('TREES', 3, 14),
		new GameObject('TREES', 4, 14),
		new GameObject('TREES', 5, 14),
		new GameObject('TREES', 7, 14),
		new GameObject('TREES', 6, 14),
		new GameObject('TREES', 3, 13),
		new GameObject('TREES', 2, 13),
		new GameObject('TREES', 3, 12),
		new GameObject('TREES', 2, 12),
		new GameObject('TREES', 6, 16),
		new GameObject('TREES', 5, 16),
		new GameObject('TREES', 4, 16),
		new GameObject('TREES', 3, 16),
		new GameObject('TREES', 2, 16),
		new GameObject('TREES', 1, 16),
		new GameObject('TREES', 0, 16),
		new GameObject('TREES', 0, 17),
		new GameObject('TREES', 1, 17),
		new GameObject('TREES', 2, 17),
		new GameObject('TREES', 3, 17),
		new GameObject('TREES', 4, 17),
		new GameObject('TREES', 5, 17),
		new GameObject('BRICK', 0, 21),
		new GameObject('BRICK', 1, 21),
		new GameObject('BRICK', 1, 20),
		new GameObject('BRICK', 0, 20),
		new GameObject('TREES', 0, 19),
		new GameObject('TREES', 1, 19),
		new GameObject('TREES', 0, 18),
		new GameObject('TREES', 1, 18),
		new GameObject('TREES', 2, 18),
		new GameObject('TREES', 2, 19),
		new GameObject('TREES', 2, 20),
		new GameObject('TREES', 2, 21),
		new GameObject('TREES', 2, 22),
		new GameObject('TREES', 2, 23),
		new GameObject('TREES', 3, 23),
		new GameObject('TREES', 4, 23),
		new GameObject('TREES', 5, 23),
		new GameObject('TREES', 6, 23),
		new GameObject('TREES', 7, 23),
		new GameObject('TREES', 7, 22),
		new GameObject('TREES', 7, 21),
		new GameObject('TREES', 7, 20),
		new GameObject('TREES', 7, 19),
		new GameObject('TREES', 7, 17),
		new GameObject('TREES', 6, 17),
		new GameObject('TREES', 6, 18),
		new GameObject('TREES', 7, 18),
		new GameObject('TREES', 6, 19),
		new GameObject('TREES', 5, 19),
		new GameObject('TREES', 4, 19),
		new GameObject('TREES', 3, 18),
		new GameObject('TREES', 4, 18),
		new GameObject('TREES', 5, 18),
		new GameObject('TREES', 3, 19),
		new GameObject('TREES', 3, 20),
		new GameObject('TREES', 3, 21),
		new GameObject('TREES', 4, 22),
		new GameObject('TREES', 5, 22),
		new GameObject('TREES', 3, 22),
		new GameObject('TREES', 6, 21),
		new GameObject('TREES', 5, 21),
		new GameObject('TREES', 4, 21),
		new GameObject('TREES', 4, 20),
		new GameObject('TREES', 5, 20),
		new GameObject('TREES', 6, 20),
		new GameObject('TREES', 6, 22),
		new GameObject('BRICK', 8, 22),
		new GameObject('BRICK', 9, 22),
		new GameObject('BRICK', 9, 23),
		new GameObject('BRICK', 8, 23),
		new GameObject('BRICK', 8, 24),
		new GameObject('BRICK', 9, 24),
		new GameObject('BRICK', 9, 25),
		new GameObject('BRICK', 8, 25),
		new GameObject('STONE', 25, 22),
		new GameObject('STONE', 24, 22),
		new GameObject('STONE', 23, 22),
		new GameObject('STONE', 22, 22),
		new GameObject('STONE', 21, 22),
		new GameObject('STONE', 20, 22),
		new GameObject('BRICK', 16, 25),
		new GameObject('BRICK', 17, 25),
		new GameObject('BRICK', 17, 24),
		new GameObject('BRICK', 16, 24),
		new GameObject('STONE', 17, 13),
		new GameObject('STONE', 16, 13),
		new GameObject('STONE', 15, 13),
		new GameObject('STONE', 14, 13),
		new GameObject('STONE', 13, 13),
		new GameObject('STONE', 12, 13),
		new GameObject('BRICK', 8, 17),
		new GameObject('BRICK', 9, 17),
		new GameObject('BRICK', 10, 17),
		new GameObject('BRICK', 11, 17),
		new GameObject('BRICK', 12, 17),
		new GameObject('BRICK', 13, 17),
		new GameObject('BRICK', 15, 19),
		new GameObject('BRICK', 14, 19),
		new GameObject('BRICK', 18, 19),
		new GameObject('BRICK', 19, 19),
		new GameObject('BRICK', 20, 19),
		new GameObject('BRICK', 21, 19),
		new GameObject('BRICK', 22, 19),
		new GameObject('BRICK', 23, 19),
		new GameObject('BRICK', 24, 19),
		new GameObject('TREES', 18, 11),
		new GameObject('TREES', 19, 11),
		new GameObject('TREES', 20, 11),
		new GameObject('TREES', 21, 11),
		new GameObject('TREES', 22, 13),
		new GameObject('TREES', 23, 13),
		new GameObject('TREES', 25, 11),
		new GameObject('TREES', 24, 11),
	],
	enemyList: [
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'NORMAL' },
		{ type: 'SPEEDY' },
		{ type: 'SPEEDY' },
		{ type: 'SPEEDY' },
		{ type: 'SPEEDY' },
		{ type: 'HEAVY' },
		{ type: 'HEAVY' },
	],
})
