import { useState, useContext, Fragment } from "react";

import {
    TotalSumContext,
    ScrollElementContext,
    SelectValuesResourcesContext,
    NewProcessorsContext,
} from "@/app/calculator/context";

import style from './ApiCosts.module.scss'

export default function ApiCostsResult() {

    const [totalSum, _setTotalSum] = useContext(TotalSumContext);
    const [selectValues, _setSelectValues] = useContext(SelectValuesResourcesContext)
    const [newProcessors, _setNewProcessors] = useContext(NewProcessorsContext)

    const totalBlockRef = useContext(ScrollElementContext)

    const [isOpen, setIsOpen] = useState(false);

    const currentTotalPrice = () => {
        let sum = 0
        totalSum.forEach((item, _index)=>{
            sum += item.currentPrice
        })
        newProcessors.state.forEach((item, _index)=>{
            sum += item.price.value
        })
        return sum
    }

    const currentOldPrice = () => {
        let sum = 0
        totalSum.forEach((item, _index)=>{
            sum += item.price
        })
        return sum
    }

    const setDetailProcessorsInfo = () => {
        return newProcessors.state.map((item, index)=>{
            return (
                <div className={style["api-costs__result__list-item"]}>
                    <div className={style["api-costs__result__list-item__wrapper"]}>
                        <p>{item.fieldName}</p>
                        <p>
                            ${item.price.value}/h
                        </p>
                    </div>
                    <p className={style["api-costs__result__list-item__select"]}>
                        {item.select} {item.fieldName === 'postgresStorage'? 'Gb' : item.fieldName === 'rpsRequests'? 'M' : ''}
                    </p>
                </div>
            )
        })
    }

    const setDetailInfo = () => {
        return selectValues.map((item, index) => {
            return (
                <Fragment key={index}>
                    <div className={style["api-costs__result__list-item"]}>
                        <div className={style["api-costs__result__list-item__wrapper"]}>
                            <p>{item.fieldName}</p>
                            <p>
                                ${totalSum[index]?.currentPrice}/h
                            </p>
                        </div>
                        <p className={style["api-costs__result__list-item__select"]}>
                            {item.select} {item.fieldName === 'postgresStorage'? 'Gb' : item.fieldName === 'rpsRequests'? 'M' : ''}
                        </p>
                    </div>
                    {item.replicas && (
                        <div className={style["api-costs__result__list-item"]}>
                            <div className={style["api-costs__result__list-item__wrapper"]}>
                                <p>{item.fieldName} replicas</p>
                                <p>
                                    ${0}/h
                                </p>
                            </div>
                            <p className={style["api-costs__result__list-item__select"]}>{item.replicas}</p>
                        </div>
                    )}
                    {(newProcessors.state.length > 0 && index === 0) && (
                        <>{setDetailProcessorsInfo()}</>
                    )}
                </Fragment>
            )
        })
    }

    return (
        <div
            className={
                isOpen ?
                    `${style["api-costs__result"]} ${style["api-costs__result_active"]}`
                    : style["api-costs__result"]
            }
            ref={totalBlockRef}
        >
            {currentTotalPrice() === 0 && (
                <p className={style["api-costs__result__total"]}>free</p>
            )}
            <p 
                className={
                    currentTotalPrice() === 0?
                    `${style["api-costs__result__total"]} ${style["api-costs__result__total_disable"]}`
                    :style["api-costs__result__total"]
                }
            >
                {currentTotalPrice() !== 0? `${(currentTotalPrice() * 720).toFixed(2)}/mo` : `${(currentOldPrice() * 720).toFixed(2)}/mo`}
                
            </p>
            <p 
                className={
                    currentTotalPrice() === 0?
                    `${style["api-costs__result__total"]} ${style["api-costs__result__total_disable"]}`
                    :style["api-costs__result__total"]
                }
            >
                {currentTotalPrice() !== 0? `${currentTotalPrice().toFixed(2)}/mo` : `${currentOldPrice().toFixed(2)}/mo`}
            </p>
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
                {setDetailInfo()}
            </div>
        </div>
    )
}
