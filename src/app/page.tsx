import { Metadata } from "next";

import Banner from "@/components/Banner/Banner";
import Cards from "@/components/Cards/Cards";
import Enterprise from "@/components/Enterprise/Enterprise";
import Developers from "@/components/Developers/Developers";
import DevelopersNew from "@/components/Developers/DevelopersNew";
import Blog from "@/components/Blog/Blog";
import _developersMock from "@/_mock/developers.mock"
import _blogMock from "@/_mock/blog.mock"
import Indexer from "@/components/Indexer/Indexer";
import Chains from "@/components/Chains/Chains";

export const metadata: Metadata = {
    title: 'Subsquid',
}

export default function Home() {
    return (
        // <main className="main">
                <div className="sections">
                    <>
                        <Banner/>
                        <div className={'container'}>
                            <Cards/>
                        </div>
                        <Indexer />
                        <Chains />
                        <DevelopersNew items={_developersMock}/>
                        {/* <div className={'container'}>
                            
                            <Blog slides={_blogMock}/>
                        </div> */}
                    </>
                </div>
        // </main>
    )
}
