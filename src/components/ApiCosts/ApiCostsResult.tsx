import { useState, useContext, Fragment, useRef, useEffect } from "react";

import {
    TotalSumContext,
    ScrollElementContext,
    SelectValuesResourcesContext,
    NewProcessorsContext,
    ActiveTabContext,
    TabsProfileContext
} from "@/app/subsquid-cloud/context";

import style from './ApiCosts.module.scss'
import { useWindowWidth } from "@react-hook/window-size";

export default function ApiCostsResult() {

    const [totalSum, _setTotalSum] = useContext(TotalSumContext);
    const [selectValues, _setSelectValues] = useContext(SelectValuesResourcesContext)
    const [newProcessors, _setNewProcessors] = useContext(NewProcessorsContext)
    const [activeTab, _setActiveTab] = useContext(ActiveTabContext)
    const [tabsProfile, _setTabsProfile] = useContext(TabsProfileContext)

    const totalBlockRef = useContext(ScrollElementContext)
    const resultBlockRef = useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = useState(false);

    const windowWidth = typeof window !== undefined? useWindowWidth() : 0

    const setInfoText = () =>{
        const profile = tabsProfile[0].select
        if (activeTab === 'byUseCase') {
            if (profile === 'COLLOCATED') {
                return 'A free development indexer can only be deployed to the Playground. The Playground is an isolated space automatically created for each Cloud account. The deployments to the Playground are not billed'
            }
            else if (profile === 'DEDICATED') {
                return 'The calculated price quote is provisional. An optimal configuration may require more compute resources for use-cases serving complex API queries and/or processing high volumes of indexed data.'
            }
        }
        else if (activeTab === 'byResources') {
            if (profile === 'COLLOCATED') {
                return 'A free collocated indexer can only be deployed to the Playground. The Playground is an isolated space automatically created for each Cloud account. The deployments to the Playground are not billed'
            }
        }
    }

    const currentTotalPrice = () => {
        let sum = 0
        totalSum.forEach((item, _index) => {
            sum += item.currentPrice
        })
        newProcessors.state.forEach((item, _index) => {
            sum += item.price.value
        })
        return sum
    }

    const currentOldPrice = () => {
        let sum = 0
        totalSum.forEach((item, _index) => {
            sum += item.price
        })
        newProcessors.state.forEach((item, _index) => {
            sum += item.price.value
        })
        return sum
    }

    const setDetailProcessorsInfo = () => {
        return newProcessors.state.map((item, index) => {
            return (
                <div key={index} className={style["api-costs__result__list-item"]}>
                    <div className={style["api-costs__result__list-item__wrapper"]}>
                        <div className={style["api-costs__result__list-item__wrapper_left"]}>
                            <p>{item.fieldName}</p>
                            <p className={style["api-costs__result__list-item__select"]}>
                                {item.select} {item.fieldName === 'Postgres storage' ? 'Gb' : item.fieldName === 'RPC requests' ? 'M' : ''}
                            </p>
                        </div>
                        <p>${(item.price.value * 720).toFixed(2)}/mo</p>
                    </div>
                </div>
            )
        })
    }

    const setDetailInfo = () => {
        return selectValues.map((item, index) => {
            if (!item.isActive) return;
            return (
                <Fragment key={index}>
                    <div className={style["api-costs__result__list-item"]}>
                        <div className={style["api-costs__result__list-item__wrapper"]}>
                            <div className={style["api-costs__result__list-item__wrapper_left"]}>
                                <p>{item.fieldName === 'Processor profile' ? `${item.fieldName} 1` : item.fieldName}</p>
                                <p className={style["api-costs__result__list-item__select"]}>
                                    {item.select} {item.replicas ? `x ${item.replicas} replicas` : ''} {item.fieldName === 'Postgres storage' ? 'Gb' : item.fieldName === 'RPC requests' ? 'M' : ''}
                                </p>
                            </div>
                            <p>${(totalSum[index]?.price * 720).toFixed(2)}/mo</p>
                        </div>
                    </div>
                    {(newProcessors.state.length > 0 && index === 0) && setDetailProcessorsInfo()}
                </Fragment>
            )
        })
    }

    useEffect(() => {
        if (resultBlockRef.current) {
            if (isOpen && resultBlockRef.current.parentElement) {
                resultBlockRef.current.parentElement.style.height = `${resultBlockRef.current.getBoundingClientRect().height}px`
            }
            else if (!isOpen && resultBlockRef.current.parentElement) {
                resultBlockRef.current.parentElement.style.height = '0px'
            }
        }
    }, [resultBlockRef, selectValues, newProcessors, isOpen])

    return (
        <div
            className={
                isOpen ?
                    `${style["api-costs__result"]} ${style["api-costs__result_active"]}`
                    : style["api-costs__result"]
            }
            ref={totalBlockRef}
        >
            <div className={style["api-costs__result__wrapper"]}>
                { windowWidth > 768 && (
                    <p
                        className={
                            isOpen?
                            `${style["api-costs__result__info"]} ${style["api-costs__result__info_open"]}`
                            : style["api-costs__result__info"]
                        }
                        style={{opacity: `${activeTab === 'byResources' && tabsProfile[0].select === 'DEDICATED' ? 0 : 1}`}}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="white" />
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#CAE1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 16V12" stroke="#CAE1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 8H12.01" stroke="#CAE1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {setInfoText()}
                    </p>
                )}
                <div>
                    <p className={
                        currentTotalPrice() === 0 ?
                            `${style["api-costs__result__total"]} ${style["api-costs__result__total_free"]}`
                            : `${style["api-costs__result__total"]} ${style["api-costs__result__total_free"]} ${style["api-costs__result__total_free_disable"]}`
                    }>free</p>
                    <p
                        className={
                            currentTotalPrice() === 0 ?
                                `${style["api-costs__result__total"]} ${style["api-costs__result__total_month"]} ${style["api-costs__result__total_disable"]}`
                                : `${style["api-costs__result__total"]} ${style["api-costs__result__total_month"]}`
                        }
                    >
                        {`$${(currentOldPrice() * 720).toFixed(2)}/mo`}
                    </p>
                    <p
                        className={
                            currentTotalPrice() === 0 ?
                                `${style["api-costs__result__total"]} ${style["api-costs__result__total_hour"]} ${style["api-costs__result__total_disable"]}`
                                : `${style["api-costs__result__total"]} ${style["api-costs__result__total_hour"]}`
                        }
                    >
                        {`$${(currentOldPrice()).toFixed(2)}/h`}
                    </p>
                </div>
            </div>
            <button
                className={style["api-costs__result__more"]}
                onClick={() => setIsOpen(!isOpen)}
            >
                <p>See details</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 10L8 6L4 10" stroke="#3880EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className={style["api-costs__result__list"]}>
                <div ref={resultBlockRef} className={style["api-costs__result__list__wrapper"]}>
                    {setDetailInfo()}
                </div>
            </div>
            { windowWidth < 768 && (
                <p
                    className={
                        isOpen?
                        `${style["api-costs__result__info"]} ${style["api-costs__result__info_open"]}`
                        : style["api-costs__result__info"]
                    }
                    style={{display: `${activeTab === 'byResources' && tabsProfile[0].select === 'DEDICATED' ? 'none' : 'block'}`}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="24" rx="12" fill="white" />
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#CAE1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 16V12" stroke="#CAE1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 8H12.01" stroke="#CAE1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {setInfoText()}
                </p>
            )}
        </div>
    )
}
