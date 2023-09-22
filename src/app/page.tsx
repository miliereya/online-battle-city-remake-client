'use client'

import { BattleCity } from '@/battle-city/components/battle-city'

export default function Home() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100vw',
				height: '100vh',
				background: '#000',
			}}
		>
			<BattleCity />
		</div>
	)
}
