import { Metadata } from 'next'
import Head from 'next/head'
import { Inter } from 'next/font/google'

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

    return (
      <html lang="en">
        {/* <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"
            />
        </Head> */}
        <body className={inter.className}>
            <Header/>
            {children}
            <Footer/>
        </body>
      </html>
    )
}