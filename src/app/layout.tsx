'use client'

import { useEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

import '@/../public/fonts/fonts.scss'
import '@/globals.scss'
import 'swiper/css';
import 'swiper/css/grid';
import HeaderNew from '@/components/Header/HeaderNew'
import classNames from 'classnames'
import FooterNew from '@/components/Footer/FooterNew'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {

	const [headerWidth, setHeaderWidth] = useState<number>(0)

	const mainRef = useRef<HTMLElement>(null)

	const currentPath = usePathname()

	const setHeader = () => {
		if (currentPath === '/') {
			// return <HeaderNew />
		}
		else if (currentPath !== '/worker') {
			return <Header setHeaderWidth={setHeaderWidth} />
		}
	}

	const setFooter = () => {
		if (currentPath === '/') {
			return <FooterNew />
		}
		else if (currentPath !== '/worker' && headerWidth !== 0) {
			return <Footer />
		}
		{((currentPath === '/worker' || currentPath === '/') || headerWidth !== 0) && <Footer />}
	}

	useEffect(()=>{
		if (currentPath === '/') {
			document.body.classList.add('body_main')
		}
		else document.body.classList.remove('body_main')
	}, [currentPath])

	useEffect(()=>{
		if (typeof window !== 'undefined') {
			if (window.location.href.indexOf('#calculator') !== -1) {
				const block = document.getElementById("#calculator")
				if (block) {
					block.style.scrollMarginTop = `${headerWidth}px`
					block.scrollIntoView();
				}
			}
			else if (window.location.href.indexOf('#pricing') !== -1) {
				const block = document.getElementById("#pricing")
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
				{/* {currentPath !== '/worker' && <Header setHeaderWidth={setHeaderWidth} />} */}
				{setHeader()}
				<main ref={mainRef} style={{marginTop: `${currentPath !== '/'? headerWidth : 0}px`}} className={classNames('main', currentPath === '/' && 'main_main')}>
					{((currentPath === '/worker' || currentPath === '/') || headerWidth !== 0) && children}
				</main>
				{/* {((currentPath === '/worker' || currentPath === '/') || headerWidth !== 0) && <Footer />} */}
				{setFooter()}
			</body>
		</html>
	)
}