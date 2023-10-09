'use client'

import { useEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

import '@/globals.scss'
import 'swiper/css';
import 'swiper/css/grid';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {

	const [headerWidth, setHeaderWidth] = useState<number>(0)

	const mainRef = useRef<HTMLElement>(null)

	const currentPath = usePathname()

	useEffect(()=>{
		if (typeof window !== 'undefined') {
			if (window.location.href.indexOf('#calculator') !== -1) {
				const block = document.getElementById("#calculator")
				if (block) {
					block.style.scrollMarginTop = `${headerWidth}px`
					block.scrollIntoView();
				}
			}
		}
	})

	return (
		<html lang="en">
			<head>
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-6JBS6RNP90"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-6JBS6RNP90');`,
                }}></script>
			</head>
			<body className={inter.className}>
				{currentPath !== '/worker' && <Header setHeaderWidth={setHeaderWidth} />}
				<main ref={mainRef} style={{marginTop: `${headerWidth}px`}} className='main'>
					{(currentPath === '/worker' || headerWidth !== 0) && children}
				</main>
				{(currentPath !== '/worker' && headerWidth !== 0) && <Footer />}
			</body>
		</html>
	)
}