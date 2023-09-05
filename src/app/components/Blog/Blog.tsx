"use client"

import './Blog.scss'
import React, {useRef, useState} from "react";
import {Swiper, SwiperSlide, SwiperClass} from 'swiper/react';
import {Pagination} from "swiper/modules";
import {FadeInUp} from "@/app/components/Animation";

export interface BlogProps {
    slides: ISlideBlog[]
}

export interface ISlideBlog {
    title: string
    text: string
    caption: string
    link: string,
}

export default function Blog(props: BlogProps) {
    const [slides, setSlides] = useState<ISlideBlog[]>(props.slides || [])

    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const paginationRef = useRef<HTMLDivElement | null>(null)

    return (
        <div className={'blog'}>
            <div className="blog__wrapper">
                <FadeInUp delay={100}>
                    <div className="blog__header">
                        <h2>Squid blog</h2>
                        <p className={'subtitle'}>Get the latest updates about Subsquid. </p>
                    </div>
                </FadeInUp>

                <div className="blog__main">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={32}
                        pagination={{
                            clickable: true,
                            el: paginationRef.current as HTMLElement
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                slidesPerGroup: 2,
                                spaceBetween: 32
                            },
                            1024: {
                                slidesPerView: 3,
                                slidesPerGroup: 3,
                                spaceBetween: 24
                            },
                            1280: {
                                slidesPerView: 3,
                                slidesPerGroup: 3,
                                spaceBetween: 32
                            }
                        }}
                        autoHeight={true} onSwiper={setSwiper} watchSlidesProgress={true}>
                        {slides.map((slide, index) => <SwiperSlide className="blog-item" key={index}>
                            <FadeInUp delay={100}>
                                <div className="blog-item__wrapper">
                                    <a className="blog-item__link" href={slide.link} target="_blank"></a>
                                    <div className="blog-item__header">
                                        <h3>{slide.title}</h3>
                                    </div>
                                    <div className="blog-item__main">
                                        <p className="blog-item__text">{slide.text}</p>
                                        <p>{slide.caption}</p>
                                    </div>
                                </div>
                            </FadeInUp>
                        </SwiperSlide>)}
                    </Swiper>
                </div>
            </div>

            <div className="blog__pagination" ref={paginationRef}></div>
        </div>
    )
}
