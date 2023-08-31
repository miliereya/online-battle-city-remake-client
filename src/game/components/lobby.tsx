import { Dispatch, useState, SetStateAction } from 'react'
import { ILobby } from '../types/lobby.types'
import { lobbyActions } from '@/api/socket'
import { IGame } from '../types/game.types'

interface LobbyProps {
	setGame: Dispatch<SetStateAction<IGame | undefined>>
}

export const Lobby = ({ setGame }: LobbyProps) => {
	const [lobby, setLobby] = useState<ILobby>()
	const [lobbies, setLobbies] = useState<ILobby[]>([])
	const [name, setName] = useState<string>('')

	const createLobbyHandler = () => {
		lobbyActions.create(name, setLobby, setGame)
	}

	const findLobbiesHandler = () => {
		lobbyActions.findLobbies(setLobbies)
	}

	const joinLobbyHandler = (id: string) => {
		lobbyActions.joinLobby(id, setGame)
	}

	return (
		<div>
			<input value={name} onChange={(e) => setName(e.target.value)} />
			<button onClick={createLobbyHandler} disabled={!name}>
				create
			</button>
			<button onClick={findLobbiesHandler}>find</button>
			{lobbies.map((l) => {
				return (
					<button key={l.id} onClick={() => joinLobbyHandler(l.id)}>
						{l.name}
					</button>
				)
			})}
		</div>
	)
}
