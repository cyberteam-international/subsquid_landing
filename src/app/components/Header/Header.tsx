"use client"

import './Header.scss'
import React, {useState} from "react";
import classNames from "classnames";
import GitHub from "@/app/components/GitHub/GitHub";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className={'header'}>
            <div className="container">
                <div className="header__wrapper">
                    <div>
                        <img src="/logo.png" alt="" className="header__logo"/>
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
                                <a href="#" className="nav__item">Docs</a>
                                <a href="#" className="nav__item">Blog</a>
                            </div>
                            <div className="nav__section">
                                <GitHub username="subsquid" reponame="squid-sdk"/>
                                <a href="#" className="btn btn--primary">Launch app</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
