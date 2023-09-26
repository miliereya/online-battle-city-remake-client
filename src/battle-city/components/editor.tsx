import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CreateGameObject, TypeGameObjet } from '../types/game.types'
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
import { usePixel } from '../hooks/usePixel'
import { Player } from '../game/init'
import { useMobile } from '../hooks/useMobile'

interface EditorProps {
	objects: CreateGameObject[]
	setObjects: Dispatch<SetStateAction<CreateGameObject[]>>
	close: () => void
}

export const Editor = (props: EditorProps) => {
	const { objects, setObjects, close } = props
	const [currentType, setCurrentType] = useState<TypeGameObjet | 'DELETE'>(
		'BRICK'
	)
	const [x, setX] = useState(13)
	const [y, setY] = useState(13)
	const [id, setId] = useState(0)
	const [isDoneSelected, setDoneSelected] = useState(false)
	const isMobile = useMobile()

	useEffect(() => {
		const chooseHandler = (code: string) => {
			if (isDoneSelected) {
				if (code === 'KeyA') {
					setDoneSelected(false)
				}
				if (code === 'Space') {
					close()
				}
			} else {
				if (code === 'KeyD' && x === 25) {
					setDoneSelected(true)
				}
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
				if (code === 'KeyF') {
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
				if (code === 'Space') {
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
		}
		const chooseHandlerListener = (e: KeyboardEvent) => {
			chooseHandler(e.code)
		}

		const chooseTopHandler = () => {
			chooseHandler('KeyW')
		}

		const chooseBottomHandler = () => {
			chooseHandler('KeyS')
		}

		const chooseLeftHandler = () => {
			chooseHandler('KeyA')
		}

		const chooseRightHandler = () => {
			chooseHandler('KeyD')
		}

		const chooseMobileHandler = () => {
			chooseHandler('Space')
		}

		const chooseSpaceHandler = () => {
			chooseHandler('KeyF')
		}

		if (isMobile) {
			document
				.getElementById('space')
				?.addEventListener('click', chooseSpaceHandler)
			document
				.getElementById('fire1')
				?.addEventListener('click', chooseMobileHandler)
			document
				.getElementById('top1')
				?.addEventListener('click', chooseTopHandler)
			document
				.getElementById('right1')
				?.addEventListener('click', chooseRightHandler)
			document
				.getElementById('left1')
				?.addEventListener('click', chooseLeftHandler)
			document
				.getElementById('right2')
				?.addEventListener('click', chooseRightHandler)
			document
				.getElementById('left2')
				?.addEventListener('click', chooseLeftHandler)
			document
				.getElementById('bottom1')
				?.addEventListener('click', chooseBottomHandler)
			document
				.getElementById('fire2')
				?.addEventListener('click', chooseMobileHandler)
			document
				.getElementById('top2')
				?.addEventListener('click', chooseTopHandler)
			document
				.getElementById('bottom2')
				?.addEventListener('click', chooseBottomHandler)
		} else {
			document.addEventListener('keypress', chooseHandlerListener)
		}

		return () => {
			if (isMobile) {
				document
					.getElementById('top1')
					?.removeEventListener('click', chooseTopHandler)
				document
					.getElementById('bottom1')
					?.removeEventListener('click', chooseBottomHandler)
				document
					.getElementById('fire1')
					?.removeEventListener('click', chooseMobileHandler)
				document
					.getElementById('top2')
					?.removeEventListener('click', chooseTopHandler)
				document
					.getElementById('bottom2')
					?.removeEventListener('click', chooseBottomHandler)
				document
					.getElementById('fire2')
					?.removeEventListener('click', chooseMobileHandler)
				document
					.getElementById('right1')
					?.removeEventListener('click', chooseRightHandler)
				document
					.getElementById('left1')
					?.removeEventListener('click', chooseLeftHandler)
				document
					.getElementById('right2')
					?.removeEventListener('click', chooseRightHandler)
				document
					.getElementById('left2')
					?.removeEventListener('click', chooseLeftHandler)
					document
						.getElementById('space')
						?.removeEventListener('click', chooseSpaceHandler)
			} else {
				document.removeEventListener('keypress', chooseHandlerListener)
			}
		}
	}, [
		x,
		y,
		currentType,
		id,
		objects,
		setObjects,
		isDoneSelected,
		setDoneSelected,
		close,
		isMobile,
	])

	const pixel = usePixel()

	return (
		<div
			className={s.screen}
			style={{
				width: `${pixel * 13 * 16}px`,
				height: `${pixel * 13 * 16}px`,
			}}
		>
			<p
				className={s.done_text}
				style={{
					color: isDoneSelected ? '#000' : '#fff',
				}}
			>
				DONE
			</p>
			{!isDoneSelected && (
				<div
					style={{
						position: 'absolute',
						width: `${8 * pixel}px`,
						height: `${8 * pixel}px`,
						outline: `2px solid ${
							(x > 10 && x < 15 && y >= 0 && y < 3) ||
							(x > 7 && x < 10 && y >= 0 && y < 2) ||
							(x > 15 && x < 18 && y >= 0 && y < 2) ||
							(((x >= 0 && x < 2) || (x >= 12 && x < 14) || x >= 24) && y >= 24)
								? 'red'
								: '#493'
						}`,
						left: `${x * 8 * pixel}px`,
						bottom: `${y * 8 * pixel}px`,
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
								width: `${8 * pixel}px`,
								height: `${8 * pixel}px`,
							}}
						>
							❌
						</div>
					)}
				</div>
			)}
			{objects.map((obj) => {
				switch (obj.type) {
					case 'STONE':
						return <Stone key={obj.id} stone={obj} pixel={pixel} />
					case 'BRICK':
						return <Brick key={obj.id} brick={obj} pixel={pixel} />
					case 'WATER':
						return <Water key={obj.id} water={obj} pixel={pixel} />
					case 'TREES':
						return <Trees key={obj.id} trees={obj} pixel={pixel} />
					case 'ICE':
						return <Ice key={obj.id} ice={obj} pixel={pixel} />
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
					} as Player
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
					} as Player
				}
			/>
			<div
				style={{
					rotate: getDirectionDegrees('BOTTOM'),
					left: `${0 * pixel}px`,
					bottom: `${193 * pixel}px`,
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
					left: `${96 * pixel}px`,
					bottom: `${193 * pixel}px`,
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
					left: `${193 * pixel}px`,
					bottom: `${193 * pixel}px`,
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
					left: `${12 * 8 * pixel}px`,
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
					left: `${88 * pixel}px`,
					bottom: `${0 * pixel}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${88 * pixel}px`,
					bottom: `${8 * pixel}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${88 * pixel}px`,
					bottom: `${16 * pixel}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${96 * pixel}px`,
					bottom: `${16 * pixel}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${104 * pixel}px`,
					bottom: `${16 * pixel}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${112 * pixel}px`,
					bottom: `${16 * pixel}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${112 * pixel}px`,
					bottom: `${8 * pixel}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
			<div
				className={s.object}
				style={{
					left: `${112 * pixel}px`,
					bottom: `${0 * pixel}px`,
				}}
			>
				{brick.map((row, i) => (
					<RenderObject key={id + i} i={i} row={row} />
				))}
			</div>
		</div>
	)
}
