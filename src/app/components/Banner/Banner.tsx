"use client"

import './Banner.scss'

export default function Banner() {
    return (
        <div className={'banner'}>
            <h1 className={'banner__title'}>The Data Network<br/>for the Future of <i>Web3</i></h1>
            <p className={'subtitle banner__subtitle'}>Subsquid is a global network that provides free, fast and decentralized data access, without rate limits. Designed for billion-user dApps. </p>
            
            <div className={'banner__buttons'}>
                <a href="https://docs.subsquid.io/" className="btn btn--outline" target="_blank">Docs</a>
                <a href="#!" className="btn btn--primary">Testnet</a>
            </div>
        </div>
    )
}
