"use client"

import './Blog.scss'
import React, {useRef, useState} from "react";
import {Swiper, SwiperSlide, SwiperClass} from 'swiper/react';
import {Pagination} from "swiper/modules";

export interface BlogProps {
    slides: ISlideBlog[]
}

export interface ISlideBlog {
    title: string
    text: string
    caption: string
    link: "#!",
}

export default function Blog(props: BlogProps) {
    const [slides, setSlides] = useState<ISlideBlog[]>(props.slides || [])

    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const paginationRef = useRef<HTMLDivElement | null>(null)

    return (
        <div className={'blog'}>
            <div className="blog__wrapper">
                <div className="blog__header">
                    <h2>Squid blog</h2>
                    <p className={'subtitle'}>Get the latest updates about Subsquid. </p>
                </div>

                <div className="blog__main">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={16}
                        pagination={{
                            clickable: true,
                            el: paginationRef.current as HTMLElement
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                slidesPerGroup: 2
                            },
                            1024: {
                                slidesPerView: 3,
                                slidesPerGroup: 3
                            }
                        }}
                        autoHeight={true} onSwiper={setSwiper} watchSlidesProgress={true}>
                        {slides.map((slide, index) => <SwiperSlide className="blog-item" key={index}>
                            <div className="blog-item__wrapper">
                                <a className="blog-item__link" href={slide.link}></a>
                                <div className="blog-item__header">
                                    <h3>{slide.title}</h3>
                                </div>
                                <div className="blog-item__main">
                                    <p>{slide.text}</p>
                                    <p>{slide.caption}</p>
                                </div>
                            </div>
                        </SwiperSlide>)}
                    </Swiper>
                </div>
            </div>

            <div className="blog__pagination" ref={paginationRef}></div>
        </div>
    )
}
