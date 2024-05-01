import React from "react";
import classNames from "classnames";
import Image from "next/image";

import monkey from '@/../public/chains_monkey.svg';
import Arbitrum from '@/../public/chains/Arbitrum.svg';
import Avail from '@/../public/chains/Avail.svg';
import Berachain from '@/../public/chains/Berachain.svg';
import Manta_Network from '@/../public/chains/Manta_Network.svg';
import Moonbeam from '@/../public/chains/Moonbeam.svg';
import Polkadot from '@/../public/chains/Polkadot.svg';
import Polygon from '@/../public/chains/Polygon.svg';
import Solana from '@/../public/chains/Solana.svg';

import './Chains.scss';

type Props = {};

export default function Chains({ }: Props) {
    return (
        <div className="chains">
            <h2 className="din">Subsquid Supports Your Chain</h2>
            <h3 className="din">100+ networks, L2s, appchains and more!</h3>
            <div className="chains__block">
                <Image className="chains__block__monkey" src={monkey} alt={'monkey'}/>
                <Image className="chains__block__Arbitrum" src={Arbitrum} alt={'Arbitrum'}/>
                <Image className="chains__block__Avail" src={Avail} alt={'Avail'}/>
                <Image className="chains__block__Berachain" src={Berachain} alt={'Berachain'}/>
                <Image className="chains__block__Manta_Network" src={Manta_Network} alt={'Manta_Network'}/>
                <Image className="chains__block__Moonbeam" src={Moonbeam} alt={'Moonbeam'}/>
                <Image className="chains__block__Polkadot" src={Polkadot} alt={'Polkadot'}/>
                <Image className="chains__block__Polygon" src={Polygon} alt={'Polygon'}/>
                <Image className="chains__block__Solana" src={Solana} alt={'Solana'}/>
                
            </div>
            <h4 className="din">and 100+ more!</h4>
            <button className={classNames('din__button', 'din__button_orange', 'chains__button')}>
                <p>View full list of chains</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 8L21 12M21 12L17 16M21 12H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    )
}
