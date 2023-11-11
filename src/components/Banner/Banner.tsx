"use client"

import Image from 'next/image';
import './Banner.scss'
import {FadeInUp, FadeInUpFast} from "@/components/Animation";

import duckdb_logo_1 from '@/../public/duckdb_logo_1.svg'
import duckdb_logo_2 from '@/../public/duckdb_logo_2.png'

export default function Banner() {
    return (
        <div className={'banner'}>
            <FadeInUpFast delay={100}>
                <h1 className={'banner__title'}>The <i>Web3</i> <span>Data Lake</span></h1>
            </FadeInUpFast>
            <FadeInUpFast delay={300}>
                <p className={'subtitle banner__subtitle'}>A peer-to-peer network to batch query and aggregate terabytes of on-chain and off-chain data in a ridiculously efficient way</p>
                <div className={"banner__items"}>
                    <div className={"banner__item"}>
                        <img src="/duckdb_logo_1.svg" alt="duckdb-logo_1"/>
                        <p>Powered by DuckDB</p>
                    </div>
                    <div className={"banner__item"}>
                        <img src="/duckdb_logo_2.png" alt="duckdb-logo_2"/>
                        <p>Secured by zero-knowledge proofs</p>
                    </div>
                </div>
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
