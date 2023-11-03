"use client"

import './Banner.scss'
import {FadeInUp, FadeInUpFast} from "@/components/Animation";

export default function Banner() {
    return (
        <div className={'banner'}>
            <FadeInUpFast delay={100}>
                <h1 className={'banner__title'}>The <i>Web3</i> Data Lake</h1>
            </FadeInUpFast>
            <FadeInUpFast delay={300}>
                <p className={'subtitle banner__subtitle'}>A peer-to-peer network to batch query and aggregate terabytes
                    of on-chain and off-chain data in a ridiculously efficient way<br /><br />
                    ▶ Powered by DuckDB<br />
                    ▶ Secured by zero-knowledge proofs
                </p>
            </FadeInUpFast>

            <FadeInUpFast delay={500}>
                <div className={'banner__buttons'}>
                    <a href="https://docs.subsquid.io/" className="btn btn--outline" target="_blank">Docs</a>
                    <a href="https://coinlist.co/subsquid-testnet" target="_blank" className="btn btn--primary">Testnet</a>
                </div>
            </FadeInUpFast>
        </div>
    )
}