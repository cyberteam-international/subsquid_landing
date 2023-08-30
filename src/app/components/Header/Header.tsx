"use client"

import './Header.scss'
import React, {useState} from "react";
import classNames from "classnames";

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
                    </div>
                </div>
            </div>
        </header>
    )
}
