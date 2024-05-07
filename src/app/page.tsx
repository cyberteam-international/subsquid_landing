import {Metadata} from "next";

import Banner from "@/components/Banner/Banner";
import Cards from "@/components/Cards/Cards";
import Indexer from "@/components/Indexer/Indexer";
import Chains from "@/components/Chains/Chains";
import React from "react";
import DevelopersNew from "@/components/Developers/DevelopersNew";
import _developersMock from '../_mock/developers.mock'

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
                        <div>

                        </div>
                        <DevelopersNew items={_developersMock}/>
                        {/* <div className={'container'}>

                            <Blog slides={_blogMock}/>
                        </div> */}
                    </>
                </div>
        // </main>
    )
}
