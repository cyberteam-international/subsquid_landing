"use client"

import './Enterprise.scss'
import Tabs from "@/app/components/Tabs/Tabs";
import {CodeSlider} from "@/app/components/CodeSlider/CodeSlider";
import _enterpriseMock from "../../_mock/enterprise.mock";
import {useEffect, useState} from "react";
import {FadeInUp, SlideInLeft, SlideInRight} from "@/app/components/Animation";

export default function Enterprise() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        document.addEventListener('onTabChange', ((e: CustomEvent<number>) => {
            setCurrentIndex(e.detail)
        }) as EventListener)
    }, [])

    return (
        <div className="enterprise">
            <FadeInUp delay={100}>
                <div className="enterprise__header">
                    <h2>Enterprise-ready, dev-friendly</h2>
                    <p className="subtitle">Open-source toolkit and one-line cloud deployment.</p>
                </div>
            </FadeInUp>

            <div className="enterprise__items">
                <SlideInLeft delay={200}>
                    <div className="enterprise__tabs">
                        <Tabs/>
                    </div>
                </SlideInLeft>

                <SlideInRight delay={200}>
                    <div className="enterprise__component">
                        {currentIndex === 0 ? <CodeSlider slides={_enterpriseMock}/> : <picture>
                            <source media="(max-width: 1280px)" srcSet="/enterprise-1024.png"/>
                            <source media="(max-width: 1024px)" srcSet="/enterprise-768.png"/>
                            <source media="(max-width: 768px)" srcSet="/enterprise-350.png"/>
                            <img src="/enterprise-1280.png" alt="" className="enterprise__image"/>
                        </picture>}
                    </div>
                </SlideInRight>

                <SlideInLeft delay={400}>
                    <div className="enterprise__buttons">
                        <a href="https://docs.subsquid.io/" className="btn btn--outline" target="_blank">Docs</a>
                        <a href="https://www.subsquid.io/launch-app" className="btn btn--primary" target="_blank">Lauch
                            app</a>
                    </div>
                </SlideInLeft>
            </div>
        </div>
    )
}
