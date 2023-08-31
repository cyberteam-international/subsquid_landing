"use client"

import "./Developers.scss";
import {Swiper, SwiperClass, SwiperSlide} from "swiper/react";
import {Grid, Pagination, Thumbs} from "swiper/modules";
import {useState} from "react";

export interface DevepolerCardProps {
    idx: number,
    name: string
    slug: string
    avatar: string
    link: string
    social: {
        link: string
        image: string
    }
    children: any
}

export interface DevepolerCardsProps {
    items: DevepolerCardProps[]
}

export function DeveloperCard(props: DevepolerCardProps) {
    return (
        <div className="DeveloperCard">
            <div className="DeveloperCard__wrapper">
                <a href={props.link} className="DeveloperCard__link" target="_blank"></a>
                <div className="DeveloperCardHeader">
                    <div className="DeveloperCardHeader__info">
                        <img className="DeveloperCardHeader__avatar" src={props.avatar} alt=""/>
                        <div className="DeveloperCardHeader__data">
                            <p className="DeveloperCardHeader__name">{props.name}</p>
                            <p className="DeveloperCardHeader__slug">{props.slug}</p>
                        </div>
                    </div>
                    <div>
                        <a className="DeveloperCardHeader__social" href={props.social.link}><img
                            src={props.social.image}
                            alt=""/></a>
                    </div>
                </div>
                <div className="DeveloperCardMain">{props.children}</div>
            </div>
        </div>
    );
}

export default function Developers(props: DevepolerCardsProps) {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null)
    const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null)
    const [maxHeight, setMaxHeight] = useState<number>(0)

    const items = props.items.map((item, index) => {
        return <SwiperSlide style={{height: maxHeight}} key={index}><DeveloperCard {...item} children={item.children}/></SwiperSlide>
    })

    const itemsBullets = props.items.map((item, index) => {
        const indexRevert = (items.length - 1) - index
        return <SwiperSlide key={index} style={{zIndex: indexRevert}}>
            <div className="DeveloperBullet">
                <img src={item.avatar} alt=""/>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                    <rect x="1" y="1" width="21" height="21" rx="10.5" fill="#F6F8FB"/>
                    <path
                        d="M12.2276 10.3862C12.2276 9.0675 13.2951 8 14.6138 8C15.9325 8 17 8.98901 17 10.8257C17 13.3689 15.1005 15.1272 13.044 15.1586C12.6986 15.1586 12.5102 14.9545 12.5102 14.6091V14.5934C12.5102 14.248 12.6044 14.0911 12.7771 14.044C13.3265 13.9498 14.4411 13.6515 14.8022 12.7724C13.1068 12.7724 12.2276 11.6892 12.2276 10.3862ZM9.57457 12.7724C9.2135 13.6515 8.0989 13.9498 7.54945 14.044C7.37677 14.0911 7.28257 14.248 7.28257 14.5934V14.6091C7.28257 14.9545 7.47096 15.1586 7.81633 15.1586C9.87284 15.1272 11.7724 13.3689 11.7724 10.8257C11.7724 8.98901 10.7049 8 9.38619 8C8.0675 8 7 9.0675 7 10.3862C7 11.7049 7.86342 12.7724 9.57457 12.7724Z"
                        fill="#3880EC"/>
                    <rect x="1" y="1" width="21" height="21" rx="10.5" stroke="#3880EC" strokeWidth="2"/>
                </svg>
            </div>
        </SwiperSlide>
    })

    return (
        <div className="developers">
            <div className="developers__blob-1">
                <svg width="873" height="1650" viewBox="0 0 873 1650" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.3" filter="url(#filter0_f_82_12138)">
                        <path d="M716.557 570.124C825.977 492.066 709.846 259.476 638.104 152.938C569.19 31.3382 464.303 201.587 508.231 372.358C552.159 543.128 220.32 708.811 138.475 801.462C56.629 894.113 186.917 1062.74 222.514 1446.2C258.11 1829.65 612.075 902.355 388.951 820.66C165.827 738.966 579.783 667.697 716.557 570.124Z" fill="#68BEFC"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_82_12138" x="0.932617" y="0.780579" width="871.505" height="1648.93" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="55.5" result="effect1_foregroundBlur_82_12138"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="developers__blob-2">
                <svg width="2045" height="1251" viewBox="0 0 2045 1251" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_82_12139)">
                        <path d="M777.727 890.921C704.068 1000.54 458.857 934.024 345.459 887.067C216.784 845.004 385.221 724.857 562.853 736.939C740.485 749.02 891.035 427.813 981.259 340.409C1071.48 253.006 1251.95 342.208 1647.14 313.286C2042.33 284.364 1112.25 745.548 1015.52 560.074C918.78 374.599 869.801 753.904 777.727 890.921Z" fill="#FBC688"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_82_12139" x="0.150391" y="0.901367" width="2044.28" height="1249.54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_82_12139"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="developers__wrapper">
                <div className="developers__header">
                    <h2>Builders love it!</h2>
                    <p className='subtitle'>Subsquid is solving the data issues faced by developers.</p>
                </div>

                <div className="developers__main">
                    <Swiper autoHeight={true} className="developers__main" onSwiper={setMainSwiper} onInit={(s) => {
                        let maxValue = 0
                        s.slides.forEach(slide => {
                            if (maxValue < (slide.scrollHeight)) {
                                maxValue = slide.scrollHeight
                            }
                        })

                        setMaxHeight(maxValue)
                    }} thumbs={swiper ? {swiper: swiper} : {}} modules={[Grid, Pagination, Thumbs]} breakpoints={{
                        0: {
                            pagination: false,
                            autoHeight: true,
                            loop: true,
                            initialSlide: 1,
                            loopedSlides: 2,
                            loopPreventsSliding: true
                        },
                        768: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            grid: {
                                rows: 2,
                                fill: "column"
                            }
                        },
                        1024: {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                            grid: {
                                rows: 2,
                                fill: "column"
                            },
                        }
                    }} slidesPerView={1} navigation={true} spaceBetween={16} pagination={{clickable: true}}>{items}</Swiper>

                    <div className="Thumbs">
                        <Swiper className="Thumbs__slider" watchSlidesProgress onSwiper={setSwiper} slidesPerView={1}
                                width={400 / 8} modules={[Thumbs]} slidesPerGroup={1} loopedSlides={2}
                                loopPreventsSliding={true} loop={true}>{itemsBullets}</Swiper>

                        <div className="Thumbs__arrows">
                            <button className="Thumbs__arrow" onClick={() => {
                                if (mainSwiper)
                                    mainSwiper.slidePrev()
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 6L9 12L15 18" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button className="Thumbs__arrow" onClick={() => {
                                if (mainSwiper)
                                    mainSwiper.slideNext()
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 18L15 12L9 6" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}