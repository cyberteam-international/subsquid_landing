import React from "react";

import chart_1 from '@/../public/chart_1.svg'
import chart_2 from '@/../public/chart_2.svg'

import style from './Charts.module.scss'
import Image from "next/image";

export default function Charts() {
    return (
        <section className={style["charts"]}>
            <div className={style["charts-item"]}>
                <div>
                    <p className={style["charts-item__title"]}>Trusted by</p>
                    <p className={style["charts-item__subtitle"]}>Enterprise-grade reliability for individual developers, analysts, companies, and projects of all sizes</p>
                </div>
                <div className={style["charts-item__wrapper"]}>
                    <div className={style["charts-item__stats"]}>
                        <div className={style["charts-item__stats-item"]}>
                            <p>TEAMS</p>
                            <p>650+</p>
                        </div>
                        <div className={style["charts-item__stats-item"]}>
                            <p>LIVE PROJECTS</p>
                            <p>1000+</p>
                        </div>
                    </div>
                    <div className={style["charts-item__image"]}>
                        <Image {...chart_1} alt="chart 1" />
                    </div>
                </div>
            </div>
            <div className={style["charts-item"]}>
                <div>
                    <p className={style["charts-item__title"]}>Serverless blockchain indexing platform</p>
                    <p className={style["charts-item__subtitle"]}>Build indexers, deploy APIs, and launch analytics projects right from your laptop</p>
                </div>
                <div className={style["charts-item__wrapper"]}>
                    <div className={style["charts-item__image"]}>
                        <Image {...chart_2} alt="chart 2" />
                    </div>
                </div>
            </div>
        </section>
    )
}
