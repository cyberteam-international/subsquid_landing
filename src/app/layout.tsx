import './globals.scss'
import 'swiper/css';
import 'swiper/css/grid';
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from "react";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <title>Subsquid</title>
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    )
}
