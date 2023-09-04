"use client"

import './Cards.scss'

export default function Cards() {
    const items = [
        {title: '100+', text: 'supported networks'},
        {title: '30+ billion', text: 'data lake requests'},
        {title: '5000+', text: 'dApps powered'},
    ]

    return (
        <div className={'cards'}>
            <div className={'cards__blob-1'}>
                <img src="/blub-1.png" alt=""/>
            </div>
            <div className={'cards__blob-2'}>
                <img src="/blub-2.png" alt=""/>
            </div>

            <h2 className="cards__title">Web3’s largest decentralized data lake</h2>

            <div className={'cards__items'}>
                {items.map((item, index) => (
                    <div className={'cards-item'} key={index}>
                        <p className={'cards-item__title'}>{item.title}</p>
                        <p className={'cards-item__text'}>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
