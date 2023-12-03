import { MapInstance } from './map-instance'
import { GameObject } from '../instances'
import { EditorObject, Map } from '../types'


export const EditorMap = (editor: EditorObject[]): Map => {
	const editorGameObjects: GameObject[] = []
	for (let i = 0; i < editor.length; i++) {
		const o = editor[i]
		editorGameObjects.push(
			new GameObject(o.type, o.coordinateX / 8, o.coordinateY / 8)
		)
	}
	return {
		objects: [...MapInstance(), ...editorGameObjects],
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
			{ type: 'NORMAL' },
			{ type: 'NORMAL' },
			{ type: 'NORMAL' },
			{ type: 'NORMAL' },
			{ type: 'SPEEDY' },
			{ type: 'SPEEDY' },
		],
	}
}
