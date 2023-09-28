import Image from "next/image";
import React from "react";
import icon from '../../../public/assets/icon.png'

import style from './style.module.scss'

import { Metadata } from "next";

type Props = {};

const svgTextSubsquid = <svg xmlns="http://www.w3.org/2000/svg" width="530" height="83" viewBox="0 0 530 83" fill="none">
    <path d="M56.2745 19.5248L43.2507 23.516C42.5155 19.4198 39.1545 13.0129 29.7018 13.0129C22.6647 13.0129 18.0434 17.5293 18.0434 22.4657C18.0434 26.5619 20.6691 29.8178 26.1307 30.8682L36.5288 32.8637C50.0777 35.4895 57.3248 44.3121 57.3248 54.8151C57.3248 66.2635 47.767 77.8168 30.437 77.8168C10.6912 77.8168 1.9737 65.1081 0.818359 54.5L14.2623 50.929C14.8925 58.2811 20.039 64.8981 30.542 64.8981C38.3143 64.8981 42.6205 61.0119 42.6205 55.7604C42.6205 51.4541 39.3646 48.0932 33.5879 46.9378L23.1899 44.8372C11.3214 42.4215 3.65419 34.7543 3.65419 23.516C3.65419 10.2822 15.5226 0.199219 29.5967 0.199219C47.662 0.199219 54.594 11.1224 56.2745 19.5248Z" fill="currentColor"/>
    <path d="M98.2408 77.9218C82.3812 77.9218 69.6725 68.154 69.6725 49.8787V1.77468H84.1667V48.8284C84.1667 58.5962 89.6283 63.7427 98.2408 63.7427C107.063 63.7427 112.42 58.5962 112.42 48.8284V1.77468H126.914V49.8787C126.914 68.154 114.205 77.9218 98.2408 77.9218Z" fill="currentColor"/>
    <path d="M144.282 1.77468H171.065C185.559 1.77468 193.751 10.2822 193.751 21.8355C193.751 29.5028 189.13 35.6996 182.933 37.8002C190.18 39.5857 196.062 46.2026 196.062 55.4453C196.062 67.5238 187.029 76.2414 173.06 76.2414H144.282V1.77468ZM158.566 32.5486H168.859C175.476 32.5486 179.467 28.8726 179.467 23.2009C179.467 17.5293 175.791 13.9582 168.754 13.9582H158.566V32.5486ZM158.566 64.1628H170.329C177.367 64.1628 181.568 60.4868 181.568 54.5C181.568 48.6183 177.787 44.5221 170.54 44.5221H158.566V64.1628Z" fill="currentColor"/>
    <path d="M259.537 19.5248L246.514 23.516C245.778 19.4198 242.417 13.0129 232.965 13.0129C225.928 13.0129 221.306 17.5293 221.306 22.4657C221.306 26.5619 223.932 29.8178 229.394 30.8682L239.792 32.8637C253.341 35.4895 260.588 44.3121 260.588 54.8151C260.588 66.2635 251.03 77.8168 233.7 77.8168C213.954 77.8168 205.237 65.1081 204.081 54.5L217.525 50.929C218.155 58.2811 223.302 64.8981 233.805 64.8981C241.577 64.8981 245.883 61.0119 245.883 55.7604C245.883 51.4541 242.627 48.0932 236.851 46.9378L226.453 44.8372C214.584 42.4215 206.917 34.7543 206.917 23.516C206.917 10.2822 218.786 0.199219 232.86 0.199219C250.925 0.199219 257.857 11.1224 259.537 19.5248Z" fill="currentColor"/>
    <path d="M269.259 39.0605C269.259 15.0085 287.325 0.199219 307.49 0.199219C327.761 0.199219 345.827 15.0085 345.827 39.0605C345.827 49.5636 342.361 58.2811 336.689 64.793L345.616 74.6659L336.059 82.8583L326.921 72.7754C321.144 76.0313 314.422 77.8168 307.49 77.8168C287.325 77.8168 269.259 63.0075 269.259 39.0605ZM284.279 38.9555C284.279 55.7604 296.042 63.7427 307.49 63.7427C310.746 63.7427 314.107 63.1125 317.048 61.8522L305.39 49.0384L315.053 40.741L326.711 53.7648C329.232 49.9837 330.807 45.0473 330.807 38.9555C330.807 22.1506 319.044 14.1683 307.49 14.1683C296.042 14.1683 284.279 22.1506 284.279 38.9555Z" fill="currentColor"/>
    <path d="M387.276 77.9218C371.416 77.9218 358.708 68.154 358.708 49.8787V1.77468H373.202V48.8284C373.202 58.5962 378.663 63.7427 387.276 63.7427C396.098 63.7427 401.455 58.5962 401.455 48.8284V1.77468H415.949V49.8787C415.949 68.154 403.241 77.9218 387.276 77.9218Z" fill="currentColor"/>
    <path d="M448.021 76.2414H433.317V1.77468H448.021V76.2414Z" fill="currentColor"/>
    <path d="M480.555 62.7974H492.109C504.292 62.7974 514.48 55.2352 514.48 39.0605C514.48 22.8858 504.397 15.2186 492.214 15.2186H480.555V62.7974ZM492.634 76.2414H466.061V1.77468H492.739C513.955 1.77468 529.5 15.5337 529.5 39.0605C529.5 62.5874 513.85 76.2414 492.634 76.2414Z" fill="currentColor"/>
</svg>

export const metadata: Metadata = {
    title: 'Press kit',
}

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
        <div className={style['assets']}>
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
                            <Image src={icon} quality={100} unoptimized alt="subsquid"/>
                            {svgTextSubsquid}
                        </div>
                        <p>Icon only: alternatively, you can use just the Squiddie icon without the company name. This simplified version is suitable for situations where a more minimalistic or icon-based representation is required while maintaining brand recognition.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_icon"]}`}>
                            <Image src={icon} quality={100} unoptimized alt="subsquid"/>
                        </div>
                        <p>When placing our logo on a dark background, please utilize the reverse version. In this version, the text becomes white to ensure maximum visibility and legibility against the dark backdrop. This ensures our logo maintains its clarity and impact, regardless of the background color.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_reverse"]}`}>
                            <Image src={icon} quality={100} unoptimized alt="subsquid"/>
                            {svgTextSubsquid}
                        </div>
                        <p>If the logo needs to be monochromatic for specific purposes, please use the black and white version.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_black_white"]}`}>
                            <Image src={icon} quality={100} unoptimized alt="subsquid"/>
                            {svgTextSubsquid}
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
                            You can download <a href="/assets/assets_svg.zip" download={true}>SVG</a> or <a href="/assets/assets_png.zip" download={true}>PNG</a> files.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}
