"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Link from 'next/link';
import Image from 'next/image';

import { HeaderList } from '@/_mock/header.mock';

import GitHub from "@/components/GitHub/GitHub";
import HeaderDropdown from './HeaderDropdown';

import telegram from '@/../public/social/telegram.svg'
import twitter from '@/../public/social/twitter.svg'
import discord from '@/../public/social/discord.svg'

import './Header.scss'
import { useWindowWidth } from "@react-hook/window-size";

type Props = {
    setHeaderWidth: Dispatch<SetStateAction<number>>
}

export default function Header({ setHeaderWidth }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisibleTopBar, setIsVisibleTopBar] = useState(true)

    const headerRef = useRef<HTMLElement>(null)
    const headerTopRef = useRef<HTMLDivElement>(null)

    const windowWidth = useWindowWidth()

    const setTopSpace = () => {
        const isSafari = typeof window !== 'undefined' ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false;
        if (headerRef.current && headerTopRef.current) {
            if (isSafari) {
                return `${headerRef.current?.offsetHeight}px`
            }
            else return `${headerRef.current?.offsetHeight - headerTopRef.current?.offsetHeight}px`
        }
    }

    const setHeaderDropdown = () => {
        return HeaderList.map((item, index) => {
            return (
                <div className="nav__item">
                    <HeaderDropdown {...item} />
                </div>
            )
        })
    }

    useEffect(() => {
        if (headerRef.current) {
            setHeaderWidth(headerRef.current.offsetHeight)
        }
    }, [headerRef, isVisibleTopBar])

    useEffect(() => {
        if (windowWidth > 767.999) {
            setIsOpen(false)
        }
    }, [windowWidth])

    return (
        <header ref={headerRef} className={classNames({
            'header': true,
            'header--open': isOpen
        })}>
            {isVisibleTopBar ? <div className="header-top" ref={headerTopRef}>
                <img src="/rocket.png" alt="" />
                <p><a href="https://blog.subsquid.io/subsquid-testnet-phase-i-a-huge-success/" target="_blank">Testnet phase 1 complete. 50k indexers onboarded. Learn more</a></p>

                <button className="header-top__close" onClick={() => setIsVisibleTopBar(false)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12" stroke="#2B2B2B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 4L12 12" stroke="#2B2B2B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div> : undefined}
            <div className="header__inner">
                <div className="container">
                    <div className="header__wrapper">
                        <div>
                            <Link href="/"><img src="/logo.png" alt="" className="header__logo" /></Link>
                        </div>
                        <div>
                            <button className={classNames({
                                'hamburger': true,
                                'hamburger--active': isOpen
                            })} onClick={() => setIsOpen(!isOpen)}>
                                <span></span><span></span><span></span>
                            </button>
                            <nav
                                style={{ top: setTopSpace(), transition: '0.5s all' }}
                                className={classNames({
                                    'nav': true,
                                    'nav--active': isOpen
                                }
                                )}>
                                <div className="nav__section">
                                    {setHeaderDropdown()}
                                    <a href="https://www.google.com/" className="nav__item" target="_blank">Token</a>
                                </div>
                                {windowWidth < 1023.999 && (
                                    <div className="nav__section">
                                        <div className="nav__social">
                                            <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
                                                <Image {...discord} alt=''/>
                                            </a>
                                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                                <Image {...twitter} alt=''/>
                                            </a>
                                            <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer">
                                                <Image {...telegram} alt=''/>
                                            </a>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="nav__section">
                                    {windowWidth > 1023.999 && (
                                        <GitHub username="subsquid" reponame="squid-sdk" />
                                    )}
                                    {windowWidth > 1023.999 && (
                                        <div className="nav__social">
                                            <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
                                                <Image {...discord} alt=''/>
                                            </a>
                                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                                <Image {...twitter} alt=''/>
                                            </a>
                                            <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer">
                                                <Image {...telegram} alt=''/>
                                            </a>
                                        </div>
                                    )}
                                    <a href="https://app.subsquid.io/" className="btn btn--primary" target="_blank">Launch app</a>
                                    {windowWidth < 1023.999 && (
                                        <GitHub username="subsquid" reponame="squid-sdk" />
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
