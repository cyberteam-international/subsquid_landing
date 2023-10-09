import { FadeInUp, FadeInUpFast } from '../Animation'
import style from './TheMostToolkit.module.scss'

export default function TheMostToolkit() {

    const itemsList = ['Unlimited API requests', 'Real-time data streams via built-in RPC', 'High-uptime, SLA-compliant infrastructure', 'Easy API upgrades without downtime', 'Integrate external services via secrets',]

    const setItems = () => {
        return itemsList.map((item, index) => {
            return (
                <div key={index} className={style["toolkit__list-item"]}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <g clip-path="url(#clip0_1516_40209)">
                            <path d="M10 20.6016C15.523 20.6016 20 16.1246 20 10.6016C20 5.07856 15.523 0.601562 10 0.601562C4.477 0.601562 0 5.07856 0 10.6016C0 16.1246 4.477 20.6016 10 20.6016Z" fill="#2B2B2B" />
                            <path d="M5.47461 11.2462L8.06062 13.8322L14.5257 7.36719" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1516_40209">
                                <rect width="20" height="20" fill="white" transform="translate(0 0.601562)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p>{item}</p>
                </div>
            )
        })
    }

    return (
        <section className={style["toolkit"]}>
            <FadeInUpFast delay={300}>
                <div>
                    <h2 className="title">The most powerful indexing toolkit in <i>Web3</i></h2>
                    <p className={style["toolkit__subtitle"]}>Instantly retrieve unlimited data from 100+ blockchains, using familiar development tools</p>
                </div>
                </FadeInUpFast>
                <FadeInUp delay={500}>
                    <div className={style["toolkit__list"]}>{setItems()}</div>
                </FadeInUp>
        </section>
    )
}
