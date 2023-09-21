import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default function RootLayout ({children}: {children: React.ReactNode}) {

    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}