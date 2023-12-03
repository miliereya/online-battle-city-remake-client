import GameProvider from '@/battle-city/game/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Battle City Remake',
	description: 'Battle City Remake with multiplayer by @miliereya',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<GameProvider>{children}</GameProvider>
			</body>
		</html>
	)
}
