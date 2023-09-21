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

export const metadata: Metadata = {
    title: 'Subsquid',
}

const inter = Inter({subsets: ['latin']})

export default function RootLayout ({children}: {children: React.ReactNode}) {

    const currentPath = usePathname()

    return (
      <html lang="en">
        <body className={inter.className}>
            {currentPath !== '/worker' && <Header/>}
            {children}
            {currentPath !== '/worker' && <Footer/>}
        </body>
      </html>
    )
}