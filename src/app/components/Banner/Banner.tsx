"use client"

import './Banner.scss'

export default function Banner() {
    return (
        <div className={'banner'}>
            <h1>The Data Network<br/>for the Future of <i>Web3</i></h1>
            <p className={'subtitle'}>Subsquid is solving the data issues faced by developers. Free and fast decentralized data access, without rate limits.</p>
            
            <div className={'banner__buttons'}>
                <a href="#!" className="btn btn--outline">Docs</a>
                <a href="#!" className="btn btn--primary">Testnet</a>
            </div>
        </div>
    )
}
