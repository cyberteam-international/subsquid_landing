"use client"

import './Header.scss'
import React, {useState} from "react";
import classNames from "classnames";
import GitHub from "@/components/GitHub/GitHub";
import Link from 'next/link';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisibleTopBar, setIsVisibleTopBar] = useState(true)

    return (
        <header className={classNames({
            'header': true,
            'header--open': isOpen
        })}>
            { isVisibleTopBar ? <div className="header-top">
                <img src="/star.png" alt=""/>
                <p>We've got a new look!</p>

                <button className="header-top__close" onClick={() => setIsVisibleTopBar(false)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12" stroke="#2B2B2B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 4L12 12" stroke="#2B2B2B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div> : undefined }
            <div className="header__inner">
                <div className="container">
                    <div className="header__wrapper">
                        <div>
                            <Link href="/"><img src="/logo.png" alt="" className="header__logo"/></Link>
                        </div>
                        <div>
                            <button className={classNames({
                                'hamburger': true,
                                'hamburger--active': isOpen
                            })} onClick={() => setIsOpen(!isOpen)}>
                                <span></span><span></span><span></span>
                            </button>
                            <div className={classNames({
                                'nav': true,
                                'nav--active': isOpen
                            })}>
                                <div className="nav__section">
                                    <a href="https://docs.subsquid.io/" className="nav__item" target="_blank">Docs</a>
                                    <a href="https://blog.subsquid.io/" className="nav__item" target="_blank">Blog</a>
                                    {/* <a href="/pricing" className="nav__item">Pricing</a> */}
                                    <a href="/brand-assets" className="nav__item">Brand assets</a>
                                    {/* <Link href={'/brand-assets'}>Brand assets</Link> */}
                                </div>
                                <div className="nav__section">
                                    <GitHub username="subsquid" reponame="squid-sdk"/>
                                    <a href="https://app.subsquid.io/" className="btn btn--primary" target="_blank">Launch app</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
