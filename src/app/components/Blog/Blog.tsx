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
                    <p className={'subtitle'}>Subsquid is solving the data issues faced by developers.</p>
                </div>

                <div className="blog__main">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={16}
                        loop={true}
                        pagination={{
                            clickable: true,
                            el: paginationRef.current as HTMLElement
                        }}
                        autoHeight={true} onSwiper={setSwiper}>
                        {slides.map((slide, index) => <SwiperSlide className="blog-item" key={index}>
                            <div className="blog-item__wrapper">
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
