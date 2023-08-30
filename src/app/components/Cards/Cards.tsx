"use client"

import './Cards.scss'

export default function Cards() {
    const items = [
        {title: '100+', text: 'upported networks'},
        {title: '30+ billion', text: 'data lake requests'},
        {title: '5000+', text: 'dApps powered'},
    ]

    return (
        <div className={'cards'}>
            <div className={'cards__blob-1'}>
                <svg width="1040" height="1122" viewBox="0 0 1040 1122" fill="none">
                    <g opacity="0.3" filter="url(#filter0_f_401_2097)">
                        <path d="M554.849 869.628C556.606 978.937 765.972 1008.55 870.435 1009.69C983.679 1019.68 918.096 870.848 783.46 821.425C648.824 772.002 691.074 473.298 666.816 375.717C642.557 278.135 469.485 287.532 196.272 134.341C-76.9405 -18.8503 380.609 646.283 538.323 534.584C696.038 422.885 552.654 732.992 554.849 869.628Z" fill="#68BEFC"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_401_2097" x="0.0810547" y="0.303711" width="1039.26" height="1120.87" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="55.5" result="effect1_foregroundBlur_401_2097"/>
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className={'cards__blob-2'}>
                <svg width="639" height="1379" viewBox="0 0 639 1379" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_402_2808)">
                        <path d="M133.549 449.928C65.2259 373.644 174.997 209.484 238.423 136.939C301.623 52.2853 355.845 199.561 304.544 325.993C253.243 452.425 468.84 628.56 515.899 712.246C562.957 795.932 450.708 908.368 380.19 1201.27C309.673 1494.16 168.352 723.02 336.124 691.398C503.897 659.776 218.953 545.282 133.549 449.928Z" fill="#FBC688"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_402_2808" x="0.920898" y="0.939728" width="637.163" height="1377.59" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="55.5" result="effect1_foregroundBlur_402_2808"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            <h2>Web3’s largest decentralized data lake</h2>

            <div className={'cards__items'}>
                {items.map((item, index) => (
                    <div className={'cards-item'} key={index}>
                        <p className={'cards-item__title'}>{item.title}</p>
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
