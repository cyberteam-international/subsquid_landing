"use client"

import './Banner.scss'
import {FadeInUp, FadeInUpFast} from "@/app/components/Animation";

export default function Banner() {
    return (
        <div className={'banner'}>
            <FadeInUpFast delay={100}>
                <h1 className={'banner__title'}>The Data Network<br/>for the Future of <i>Web3</i></h1>
            </FadeInUpFast>
            <FadeInUpFast delay={300}>
                <p className={'subtitle banner__subtitle'}>Subsquid is a global network that provides free, fast and
                    decentralized data access, without rate limits. Designed for billion-user dApps. </p>
            </FadeInUpFast>

            <FadeInUpFast delay={500}>
                <div className={'banner__buttons'}>
                    <a href="https://docs.subsquid.io/" className="btn btn--outline" target="_blank">Docs</a>
                    <a href="https://forms.gle/nGanXncHsMNBD77S9" target="_blank" className="btn btn--primary">Testnet</a>
                </div>
            </FadeInUpFast>
        </div>
    )
}
