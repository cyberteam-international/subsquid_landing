'use client'

import Head from 'next/head'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

import '@/globals.scss'
import 'swiper/css';
import 'swiper/css/grid';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {

	const [headerWidth, setHeaderWidth] = useState<number>()

	const mainRef = useRef<HTMLElement>(null)

	const currentPath = usePathname()

	useEffect(()=>{
		
		if (mainRef.current) {
			mainRef.current.style.marginTop = `${headerWidth}px`
		}
	}, [mainRef, headerWidth])

	return (
		<html lang="en">
			<Head>
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-6JBS6RNP90"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-6JBS6RNP90');`,
                }}></script>
			</Head>
			<body className={inter.className}>
				{currentPath !== '/worker' && <Header setHeaderWidth={setHeaderWidth} />}
				<main ref={mainRef} className='main'>
					{children}
				</main>
				{currentPath !== '/worker' && <Footer />}
			</body>
		</html>
	)
}