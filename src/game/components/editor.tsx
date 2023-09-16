import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CreateGameObject, IPlayer, TypeGameObjet } from '../types/game.types'
import s from './game.module.scss'
import { Stone } from './objects/stone'
import { stone } from '../render/objects/stone'
import RenderObject from './render'
import { brick } from '../render/objects/brick'
import { ice } from '../render/objects/ice'
import { water } from '../render/objects/water'
import { trees } from '../render/objects/trees'
import { Brick } from './objects/brick'
import { Water } from './objects/water'
import { Trees } from './objects/trees'
import { Ice } from './objects/ice'
import { flag } from '../render/objects/flag'
import { Player1 } from './players/p1'
import { Player2 } from './players/p2'
import { tank_normal } from '../render/normal/tank-normal'
import { getDirectionDegrees } from '../utils/style.utils'

const block = 64

interface EditorProps {
	objects: CreateGameObject[]
	setObjects: Dispatch<SetStateAction<CreateGameObject[]>>
}

export const Editor = (props: EditorProps) => {
	const { objects, setObjects } = props
	const [currentType, setCurrentType] = useState<TypeGameObjet | 'DELETE'>(
		'BRICK'
	)
	const [x, setX] = useState(13)
	const [y, setY] = useState(13)
	const [id, setId] = useState(0)

	useEffect(() => {
		const keyboardHandler = (e: KeyboardEvent) => {
			let code = e.code
			if (y !== 25 && code === 'KeyW') {
				setY((prev) => prev + 1)
			}
			if (x !== 25 && code === 'KeyD') {
				setX((prev) => prev + 1)
			}
			if (x !== 0 && code === 'KeyA') {
				setX((prev) => prev - 1)
			}
			if (y !== 0 && code === 'KeyS') {
				setY((prev) => prev - 1)
			}

			if (code === 'Space') {
				switch (currentType) {
					case 'BRICK':
						setCurrentType('STONE')
						break
					case 'STONE':
						setCurrentType('WATER')
						break
					case 'WATER':
						setCurrentType('TREES')
						break
					case 'TREES':
						setCurrentType('ICE')
						break
					case 'ICE':
						setCurrentType('DELETE')
						break
					default:
						setCurrentType('BRICK')
				}
			}

			if (code === 'Enter') {
				if (
					(x > 10 && x < 15 && y >= 0 && y < 3) ||
					(x > 7 && x < 10 && y >= 0 && y < 2) ||
					(x > 15 && x < 18 && y >= 0 && y < 2) ||
					(((x >= 0 && x < 2) || (x >= 12 && x < 14) || x >= 24) && y >= 24)
				)
					return
				const obj = objects.find(
					(o) => o.coordinateX === x * 8 && o.coordinateY === y * 8
				)

				if (obj?.type === currentType) return

				if (currentType === 'DELETE') {
					if (obj) {
						setObjects((prev) => prev.filter((o) => o.id !== obj.id))
					}
				} else {
					if (obj) {
						setObjects((prev) => [
							...prev.filter((o) => o.id !== obj.id),
							{
								type: currentType,
								coordinateX: x * 8,
								coordinateY: y * 8,
								id: String(id),
							},
						])
					} else {
						setObjects((prev) => [
							...prev,
							{
								type: currentType,
								coordinateX: x * 8,
								coordinateY: y * 8,
								id: String(id),
							},
						])
					}
					setId((prev) => prev + 1)
				}
			}
		}
		document.addEventListener('keypress', keyboardHandler)

		return () => {
			document.removeEventListener('keypress', keyboardHandler)
		}
	}, [x, y, currentType, id, objects])

	return (
		<div
			className={s.screen}
			style={{
				width: `${block * 13}px`,
				height: `${block * 13}px`,
			}}
		>
			<div
				style={{
					position: 'absolute',
					width: `${32}px`,
					height: `${32}px`,
					outline: '2px solid red',
					left: `${x * 32}px`,
					bottom: `${y * 32}px`,
					zIndex: 20,
				}}
			>
				{currentType === 'STONE' &&
					stone.map((row, i) => <RenderObject key={i} i={i} row={row} />)}
				{currentType === 'BRICK' &&
					brick.map((row, i) => <RenderObject key={i} i={i} row={row} />)}
				{currentType === 'ICE' &&
					ice.map((row, i) => <RenderObject key={i} i={i} row={row} />)}
				{currentType === 'WATER' &&
					water.t1.map((row, i) => <RenderObject key={i} i={i} row={row} />)}
				{currentType === 'TREES' &&
					trees.map((row, i) => <RenderObject key={i} i={i} row={row} />)}
				{currentType === 'DELETE' && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'red',
							fontSize: 26,
							width: `${32}px`,
							height: `${32}px`,
						}}
					>
						❌
					</div>
				)}
			</div>
			{objects.map((obj) => {
				switch (obj.type) {
					case 'STONE':
						return <Stone key={obj.id} stone={obj} />
					case 'BRICK':
						return <Brick key={obj.id} brick={obj} />
					case 'WATER':
						return <Water key={obj.id} water={obj} />
					case 'TREES':
						return <Trees key={obj.id} trees={obj} />
					case 'ICE':
						return <Ice key={obj.id} ice={obj} />
				}
			})}
			<Player1
				p={
					{
						coordinateX: 71,
						coordinateY: 7,
						direction: 'TOP',
						tick: 1,
						type: 'LVL_0',
						helmet: 0,
						spawnAnimation: 0,
					} as IPlayer
				}
			/>
			<Player2
				p={
					{
						coordinateX: 136,
						coordinateY: 7,
						direction: 'TOP',
						tick: 1,
						type: 'LVL_0',
						helmet: 0,
						spawnAnimation: 0,
					} as IPlayer
				}
			/>
			<div
				style={{
					rotate: getDirectionDegrees('BOTTOM'),
					left: `${0 * 4}px`,
					bottom: `${193 * 4}px`,
					position: 'absolute',
				}}
			>
				{tank_normal.t1.map((row, i) => (
					<RenderObject key={'1' + i} i={i} row={row} />
				))}
			</div>
			<div
				style={{
					rotate: getDirectionDegrees('BOTTOM'),
					left: `${96 * 4}px`,
					bottom: `${193 * 4}px`,
					position: 'absolute',
				}}
			>
				{tank_normal.t1.map((row, i) => (
					<RenderObject key={'1' + i} i={i} row={row} />
				))}
			</div>
			<div
				style={{
					rotate: getDirectionDegrees('BOTTOM'),
					left: `${193 * 4}px`,
					bottom: `${193 * 4}px`,
					position: 'absolute',
				}}
			>
				{tank_normal.t1.map((row, i) => (
					<RenderObject key={'1' + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${12 * 8 * 4}px`,
					bottom: 0,
				}}
			>
				{flag.alive.map((row, i) => (
					<RenderObject key={'flag' + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${88 * 4}px`,
					bottom: `${0 * 4}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${88 * 4}px`,
					bottom: `${8 * 4}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${88 * 4}px`,
					bottom: `${16 * 4}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${96 * 4}px`,
					bottom: `${16 * 4}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${104 * 4}px`,
					bottom: `${16 * 4}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${112 * 4}px`,
					bottom: `${16 * 4}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${112 * 4}px`,
					bottom: `${8 * 4}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${112 * 4}px`,
					bottom: `${0 * 4}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
		</div>
	)
}
