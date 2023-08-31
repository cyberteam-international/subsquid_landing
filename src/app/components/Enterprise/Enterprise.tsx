"use client"

import './Enterprise.scss'
import Tabs from "@/app/components/Tabs/Tabs";
import {CodeSlider} from "@/app/components/CodeSlider/CodeSlider";
import _enterpriseMock from "../../_mock/enterprise.mock";
import {useEffect, useState} from "react";

export default function Enterprise() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        document.addEventListener('onTabChange', ((e: CustomEvent<number>) => {
            setCurrentIndex(e.detail)
        }) as EventListener)
    }, [])

    return (
        <div className="enterprise">
            <div className="enterprise__header">
                <h2>Enterprise-ready, dev-friendly</h2>
                <p className="subtitle">Subsquid is solving the data issues faced by developers.</p>
            </div>

            <div className="enterprise__items">
                <Tabs/>
                {currentIndex === 0 ? <CodeSlider slides={_enterpriseMock}/> : <picture>
                    <source media="(max-width: 1280px)" srcSet="/enterprise-1024.png"/>
                    <source media="(max-width: 1024px)" srcSet="/enterprise-768.png"/>
                    <source media="(max-width: 768px)" srcSet="/enterprise-350.png"/>
                    <img src="/enterprise-1280.png" alt="" className="enterprise__image"/>
                </picture>}

                <div className="enterprise__buttons">
                    <a href="#!" className="btn btn--outline">Docs</a>
                    <a href="#!" className="btn btn--primary">Lauch app</a>
                </div>
            </div>
        </div>
    )
}
