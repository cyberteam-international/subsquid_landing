"use client"

import './Enterprise.scss'
import Tabs from "@/app/components/Tabs/Tabs";
import {CodeSlider} from "@/app/components/CodeSlider/CodeSlider";
import CodeSlidesData from "../../_mock/code-slider-data";

export default function Enterprise() {
    return (
        <div className={'enterprise'}>
            <div className="enterprise__header">
                <h2>Enterprise-ready, dev-friendly</h2>
                <p className={'subtitle'}>Subsquid is solving the data issues faced by developers.</p>
            </div>

            <div className="enterprise__items">
                <Tabs/>
                <CodeSlider slides={CodeSlidesData}/>
                <div className="enterprise__buttons">
                    <a href="#!" className="btn btn--outline">Docs</a>
                    <a href="#!" className="btn btn--primary">Lauch app</a>
                </div>
            </div>
        </div>
    )
}
