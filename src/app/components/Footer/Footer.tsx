"use client"

import './Footer.scss'
import React, {useState} from "react";
import classNames from "classnames";

const Chevron = <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
        d="M12.7924 15.9706C12.3921 16.4906 11.6079 16.4906 11.2076 15.9706L8.04322 11.86C7.53703 11.2024 8.00579 10.25 8.83563 10.25L15.1644 10.25C15.9942 10.25 16.463 11.2024 15.9568 11.86L12.7924 15.9706Z"
        fill="currentColor"/>
</svg>

export interface INavItem {
    text: string,
    link: string
}

export interface INav {
    title: string
    items: INavItem[],
    active?: boolean
}

export default function Footer() {
    const [navs, setNavs] = useState<INav[]>([
        {
            title: "Resources",
            items: [
                {link: "https://docs.subsquid.io/", text: "Documentation"},
                {link: "#!", text: "Blog"},
                {link: "#!", text: "Press kit"},
            ]
        },
        {
            title: "Follow us",
            items: [
                {link: "https://twitter.com/subsquid", text: "Twitter"},
                {link: "https://discord.com/invite/subsquid", text: "Discord"},
                {link: "#!", text: "YouTube"},
                {link: "https://github.com/subsquid", text: "GitHub"},
            ]
        },
        {
            title: "Legal",
            items: [
                {link: "#!", text: "Imprint & Privacy"},
            ]
        },
    ])

    function openDropdown(el: HTMLElement, nav: INav, index: number) {
        if(window.innerWidth < 1024) {
            const itemsEl: HTMLElement | null = el.querySelector('.footer-item__items')

            if (itemsEl) {
                setNavs((prevState) => (prevState.map((_nav, _index) => ({
                    title: _nav.title,
                    items: _nav.items,
                    active: (index === _index) ? !_nav.active : _nav.active
                }))))

                if (nav.active) {
                    itemsEl.style.height = 0 + "px"
                } else {
                    itemsEl.style.height = itemsEl.scrollHeight + "px"
                }
            }
        }
    }

    return (
        <footer className={'footer'}>
            {/*<div className="footer__blops-1">*/}
            {/*    <svg width="2045" height="1251" viewBox="0 0 2045 1251" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*        <g filter="url(#filter0_f_502_2926)">*/}
            {/*            <path d="M777.727 890.922C704.068 1000.54 458.857 934.024 345.459 887.067C216.784 845.004 385.221 724.857 562.853 736.939C740.485 749.02 891.035 427.813 981.259 340.409C1071.48 253.006 1251.95 342.208 1647.14 313.286C2042.33 284.365 1112.25 745.548 1015.52 560.074C918.78 374.6 869.801 753.904 777.727 890.922Z" fill="#FBC688"/>*/}
            {/*        </g>*/}
            {/*        <defs>*/}
            {/*            <filter id="filter0_f_502_2926" x="0.150391" y="0.901611" width="2044.28" height="1249.54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">*/}
            {/*                <feFlood floodOpacity="0" result="BackgroundImageFix"/>*/}
            {/*                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>*/}
            {/*                <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_502_2926"/>*/}
            {/*            </filter>*/}
            {/*        </defs>*/}
            {/*    </svg>*/}
            {/*</div>*/}
            {/*<div className="footer__blops-2">*/}
            {/*    <svg width="1979" height="839" viewBox="0 0 1979 839" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*        <g filter="url(#filter0_f_517_3115)">*/}
            {/*            <path d="M1375.15 137.858C1499.47 38.71 1733.43 237.806 1834.88 349.748C1954.66 463.009 1724.8 529.654 1540.26 429.706C1355.72 329.758 1061.11 651.591 928.37 715.557C795.631 779.524 640.23 583.626 206.403 429.706C-227.425 275.786 957.507 155.849 983.408 429.706C1009.31 703.563 1219.75 261.794 1375.15 137.858Z" fill="#EFF6FF"/>*/}
            {/*        </g>*/}
            {/*        <defs>*/}
            {/*            <filter id="filter0_f_517_3115" x="0" y="0" width="1979" height="839" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">*/}
            {/*                <feFlood floodOpacity="0" result="BackgroundImageFix"/>*/}
            {/*                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>*/}
            {/*                <feGaussianBlur stdDeviation="55.5" result="effect1_foregroundBlur_517_3115"/>*/}
            {/*            </filter>*/}
            {/*        </defs>*/}
            {/*    </svg>*/}
            {/*</div>*/}

            <div className="container">
                <div className="footer__wrapper">
                    <h2>Subscribe</h2>
                    <form action="" className="footer-form">
                        <input type="email" required placeholder="Your email"/>
                        <button type="submit">Subscribe</button>
                    </form>

                    <div className="footer__data">
                        <div className="footer__items">
                            {navs.map((nav, index) => (
                                <div className={classNames({
                                    'footer-item': true,
                                    'footer-item--active': nav.active
                                })} key={index} onClick={(e) => openDropdown(e.currentTarget, nav, index)}>
                                    <div className="footer-item__title"><span>{nav.title}</span> {Chevron}</div>
                                    <div className="footer-item__items">
                                        {nav.items.map((item, _index) => <a key={_index}
                                                                            href={item.link} target="_blank">{item.text}</a>) || []}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="footer__caption">Subsquid Labs GmbH / Zug, Switzerland</p>
                    </div>
                </div>
                <div className="footer__logos">
                    <div className='footer__subsquid'>
                        <img src="/logo.png" alt=""/>
                        <p>SUBSQUID</p>
                    </div>
                    <div>
                        <div className="footer__logo">
                            <img className="footer__item-powered" src="/powered.svg" alt=""/>
                            <div><img className="footer__item-polygon" src="/Polygon.svg" alt=""/></div>
                        </div>
                        <div><img className="footer__item-gcloud" src="/GCloud.svg" alt=""/></div>
                        <div><img className="footer__item-substrabe" src="/Substrabe.svg" alt=""/></div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
