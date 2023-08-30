"use client"

import './Tabs.scss'
import Image from "next/image";
import classNames from "classnames";
import {useState} from "react";

export default function Tabs() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [tabs, setTabs] = useState([
        {
            icon: "/cog.png",
            title: "Squid SDK",
            body: <ul>
                <li>Open source SDK</li>
                <li>Run locally or host with us</li>
                <li>Reduce development & infrastructure cost by 90%</li>
                <li>Use familiar tools like TypeScript & GraphQL</li>
                <li>Built-in monitoring & team collaboration</li>
            </ul>,
            active: true
        },
        {
            icon: "/chart.png",
            title: "Aquarium SaaS",
            body: <ul>
                <li>Open source SDK</li>
                <li>Run locally or host with us</li>
                <li>Reduce development & infrastructure cost by 90%</li>
                <li>Use familiar tools like TypeScript & GraphQL</li>
                <li>Built-in monitoring & team collaboration</li>
            </ul>,
            active: false
        }
    ])

    function tabSelect(indexTab: number) {
        setCurrentIndex(indexTab)
        setTabs(old => old.map((tab, index) => ({
            icon: tab.icon,
            title: tab.title,
            body: tab.body,
            active: (index === indexTab)
        })))
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
