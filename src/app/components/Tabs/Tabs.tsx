"use client"

import './Tabs.scss'
import Image from "next/image";
import classNames from "classnames";
import {useState} from "react";
import _enterpriseMock from "@/app/_mock/enterprise.mock";
import {CodeSlider} from "@/app/components/CodeSlider/CodeSlider";

export default function Tabs() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [tabs, setTabs] = useState([
        {
            icon: "/cog.png",
            title: "Squid SDK",
            body: <ul>
                <li>100% open-source</li>
                <li>Deploy locally with ease</li>
                <li>Custom data sources & targets</li>
                <li>TypeScript-based!</li>
                <li>Automated tools: TypeGen & SquidGen</li>
            </ul>,
            active: true,
            component: <CodeSlider slides={_enterpriseMock}/>,
        },
        {
            icon: "/chart.png",
            title: "Aquarium SaaS",
            body: <>
                <ul>
                    <li>Instant GraphQL API and indexer deployment</li>
                    <li>High-uptime & SLA-compliant</li>
                    <li>Built-in monitoring & analytics</li>
                    <li>Transparent pay-as-you-go billing</li>
                    <li>Team collaboration tools</li>
                </ul>
                <div className="tabs__item-wrap">
                    <a href="#">View pricing</a>
                </div>
            </>,
            active: false,
        }
    ])

    function tabSelect(indexTab: number) {
        const event = new CustomEvent('onTabChange', {detail: indexTab});

        setCurrentIndex(indexTab)
        setTabs(old => old.map((tab, index) => ({
            icon: tab.icon,
            title: tab.title,
            body: tab.body,
            active: (index === indexTab)
        })))

        document.dispatchEvent(event);
    }

    return (
        <div className={'tabs'}>
            <div className="tabs__header">
                {tabs.map((tab, index) => (
                    <button onClick={() => tabSelect(index)} className={classNames({
                        'tabs__button': true,
                        'tabs__button--active': tab.active
                    })} key={index}>
                        <Image src={tab.icon} width={16} height={16} alt=""/>
                        <span>{tab.title}</span>
                    </button>
                ))}
            </div>

            <div className="tabs__items">
                <div className="tabs__item">
                    {tabs[currentIndex].body}
                </div>
            </div>
        </div>
    )
}
