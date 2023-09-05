import Banner from "@/app/components/Banner/Banner";
import Cards from "@/app/components/Cards/Cards";
import Enterprise from "@/app/components/Enterprise/Enterprise";
import Developers from "@/app/components/Developers/Developers";
import Blog from "@/app/components/Blog/Blog";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import _developersMock from "../app/_mock/developers.mock"
import _blogMock from "../app/_mock/blog.mock"
import RootLayout from "@/app/components/layout";

export default function Home() {
    return (
        <RootLayout>
            <Header/>
            <main className="main">
                <div className={'container'}>
                    <div className="sections">
                        <Banner/>
                        <Cards/>
                        <Enterprise/>
                        <Developers items={_developersMock}/>
                        <Blog slides={_blogMock}/>
                    </div>
                </div>
            </main>
            <Footer/>
        </RootLayout>
    )
}
