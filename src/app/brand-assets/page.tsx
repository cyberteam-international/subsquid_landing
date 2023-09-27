import Image from "next/image";
import React from "react";

import icon_black_white from '@/../public/pageAssets/icon_black_white.svg'
import icon_company from '@/../public/pageAssets/icon_company.svg'
import icon_reverse from '@/../public/pageAssets/icon_reverse.svg'
import icon from '@/../public/pageAssets/icon.svg'

import style from './style.module.scss'

type Props = {};

export default function page({ }: Props) {

    const colorsList = [
        {
            background: '#CAE1F1',
            color: '#2B2B2B'
        },
        {
            background: '#FDF1E4',
            color: '#2B2B2B'
        },
        {
            background: '#FFFFFF',
            color: '#2B2B2B'
        },
        {
            background: '#2B2B2B',
            color: '#FFF'
        },
    ]

    return (
        <main className={`main ${style['assets']}`}>
            <div className={`container ${style['assets__container']}`}>
                <section className={style['assets__header']}>
                    <h1 className="title">Brand assets</h1>
                    <p>Thank you for your interest in Subsquid. We have some brand guidelines to share with you. <span>Please take a moment to get acquainted with them.</span></p>
                </section>
                <section className={style['assets__sections']}>
                    <div className={`${style['assets-section']} ${style['assets-section__name']}`}>
                        <h2 className="title">Our name</h2>
                        <p>“Subsquid” is one word, spelled with a big S.</p>
                    </div>
                    <div className={`${style['assets-section']} ${style['assets-section__logo']}`}>
                        <h2 className="title">Our logo</h2>
                        <p>Our logo can be utilized in two distinct configurations. </p>
                        <p>Squiddie icon with company name: this is the primary version of our logo, featuring the iconic Squiddie graphic alongside our company name. It represents the full brand identity and is the preferred choice for most use cases.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_company"]}`}>
                            <Image {...icon_company} quality={100}/>
                        </div>
                        <p>Icon only: alternatively, you can use just the Squiddie icon without the company name. This simplified version is suitable for situations where a more minimalistic or icon-based representation is required while maintaining brand recognition.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_icon"]}`}>
                            <Image {...icon} quality={100}/>
                        </div>
                        <p>When placing our logo on a dark background, please utilize the reverse version. In this version, the text becomes white to ensure maximum visibility and legibility against the dark backdrop. This ensures our logo maintains its clarity and impact, regardless of the background color.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_reverse"]}`}>
                            <Image {...icon_reverse} quality={100}/>
                        </div>
                        <p>If the logo needs to be monochromatic for specific purposes, please use the black and white version.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_black_white"]}`}>
                            <Image {...icon_black_white} quality={100}/>
                        </div>
                    </div>
                    <div className={`${style['assets-section']} ${style['assets-section__colors']}`}>
                        <h2 className="title">Our colors</h2>
                        <p>We utilize light blue, sandy, and white colors for gradients, cards, backgrounds and banners. Black, or graphite, is reserved for our primary buttons and text elements, providing contrast and emphasis in our design.</p>
                        <div className={style['assets-section__colors__list']}>
                            {colorsList.map((item, index) =>
                                <div key={index} className={style['assets-section__colors__list-item']} style={{ ...item }}>{item.background}</div>
                            )}
                        </div>
                    </div>
                    <div className={`${style['assets-section']} ${style['assets-section__do']}`}>
                        <h2 className="title">Please do</h2>
                        <p>Provide plenty of space around the Subsquid logo and Squiddie. Make them big, make them small, just give them the chance to breathe and not feel cluttered.</p>
                    </div>
                    <div className={`${style['assets-section']} ${style['assets-section__dont']}`}>
                        <h2 className="title">Please don’t</h2>
                        <ul className={style['assets-section__dont__list']}>
                            <li>Alter these files in any way.</li>
                            <li>Display these graphics in a way that implies a relationship, affiliation, or endorsement by Subsquid of your product, service, or business.</li>
                            <li>Use these graphics as part of your own product, business, or service’s name.</li>
                            <li>Combine these graphics with any other graphics without written consent from Subsquid.</li>
                        </ul>
                    </div>
                    <div className={`${style['assets-section']} ${style['assets-section__download']}`}>
                        <h2 className="title">Download</h2>
                        <p>
                            You can download <a href="@/../public/pageAssets/pageAssets_svg.rar" download={true}>SVG</a> or <a href="@/../public/pageAssets/pageAssets_png.rar" download={true}>PNG</a> files.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}
