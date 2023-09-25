'use client'

import { Metadata } from 'next'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

import '@/globals.scss'
import 'swiper/css';
import 'swiper/css/grid';

// export const metadata: Metadata = {
//     title: 'Subsquid',
// }

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {

	const currentPath = usePathname()

	return (
		<html lang="en">
			<head>
				<title>Subsquid</title>
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-6JBS6RNP90"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-6JBS6RNP90');`,
                }}></script>
			</head>
			<body className={inter.className}>
				{currentPath !== '/worker' && <Header />}
				{children}
				{currentPath !== '/worker' && <Footer />}
			</body>
		</html>
	)
}