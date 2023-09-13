import Banner from "@/components/Banner/Banner";
import Cards from "@/components/Cards/Cards";
import Enterprise from "@/components/Enterprise/Enterprise";
import Developers from "@/components/Developers/Developers";
import Blog from "@/components/Blog/Blog";
import _developersMock from "@/_mock/developers.mock"
import _blogMock from "@/_mock/blog.mock"

export default function Home() {
    return (
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
    )
}
