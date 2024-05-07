"use client";

import "./Banner.scss";
import classNames from "classnames";
import {useEffect, useState} from "react";

export default function Banner() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const threshold = 500; // Порог скролла, после которого элемент скрывается
      setIsVisible(scrollTop < threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
      <div className={"banner"}>
        {isVisible && <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'fixed'}}>
          <h1 className="din">
            Unlock an <br/> Ocean of Data
          </h1>
          <h3 className="din">
            Data and tooling for your favorite dApp on EVM, Solana, and 100+ chains.
          </h3>
          <div className={"banner__water"}></div>
          <a href={"#"} style={{width: '165px'}} className={classNames("banner__button", "din__button")}>
            <p className="din">Go to Docs</p>
            <svg
                width="20"
                height="10"
                viewBox="0 0 20 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M15 1L19 5M19 5L15 9M19 5H1"
                  stroke="#2B2B2B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>}
        <div className={"banner__bottom"}>
          <p className="din">Let’s dive in!</p>
          <button
              className={classNames(
                  "din__button",
                  "din__button_orange",
                  "banner__bottom__button"
              )}
          >
            <svg
                width="13"
                height="26"
                viewBox="0 0 13 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M11.8307 19.6667L6.4974 25M6.4974 25L1.16406 19.6667M6.4974 25V1"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={"banner__nav"}  onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
          <div className={"banner__navLogo"}>
            <img src={isHovered ? "/assets/logo_syb.png" : "/headerNavLogo.svg"} alt="logo"/>
          </div>
          <div className={"banner__navList"}>
            <button>
              <img src="/fileNav.svg" alt="logo"/>Docs
            </button>
            <button>
              <img src="/cloudNav.svg" alt="logo"/>Cloud
            </button>
            <button>
              <img src="/menuNav.svg" alt="logo"/>Blog
            </button>
            <button>
              <img src="/twitterNav.svg" alt="logo"/>X
            </button>
            <button>
              <img src="/discordNav.svg" alt="logo"/>Discord
            </button>
          </div>
          <button className={"banner__navTrophy"}>
            <img src="/trophy.svg" style={{marginRight: 10}} alt="logo"/>
            {isHovered && " Join Quests"}
          </button>
          <button className={"banner__navRocket"}>
            <img src="/rocket.svg" style={{marginRight: 10}} alt="logo"/>
            {isHovered && " Launch app"}
          </button>
        </div>
        {/* <FadeInUpFast delay={100}>
                <h1 className={'banner__title'}>The <i>Web3</i> <span>Data Lake</span></h1>
            </FadeInUpFast>
            <FadeInUpFast delay={300}>
                <p className={'subtitle banner__subtitle'}>A peer-to-peer network to batch query and aggregate terabytes of on-chain and off-chain data in a ridiculously efficient way</p>
                <div className={"banner__items"}>
                    <div className={"banner__item"}>
                        <img src="/duckdb_logo_1.svg" alt="duckdb-logo_1"/>
                        <p>Powered by DuckDB</p>
                    </div>
                    <div className={"banner__item"}>
                        <img src="/duckdb_logo_2.png" alt="duckdb-logo_2"/>
                        <p>Secured by zero-knowledge proofs</p>
                    </div>
                </div>
            </FadeInUpFast>

            <FadeInUpFast delay={500}>
                <div className={'banner__buttons'}>
                    <a href="https://docs.subsquid.io/" className="btn btn--outline" target="_blank">Docs</a>
                    <a href="https://coinlist.co/subsquid-testnet" target="_blank" className="btn btn--primary">Testnet</a>
                </div>
            </FadeInUpFast> */}
      </div>
  );
}
