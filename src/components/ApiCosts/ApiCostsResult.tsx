import { useState, useContext, Fragment } from "react";
import { useWindowWidth } from "@react-hook/window-size";

import {
    TotalSumContext,
    ScrollElementContext,
    SelectValuesResourcesContext,
    NewProcessorsContext,
} from "@/app/pricing/context";

import style from './ApiCosts.module.scss'

export default function ApiCostsResult() {

    const [totalSum, _setTotalSum] = useContext(TotalSumContext);
    const [selectValues, _setSelectValues] = useContext(SelectValuesResourcesContext)
    const [newProcessors, _setNewProcessors] = useContext(NewProcessorsContext)

    const totalBlockRef = useContext(ScrollElementContext)

    const windowWidth = typeof window !== 'undefined' ? useWindowWidth() : 1920;

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
                <div key={index} className={style["api-costs__result__list-item"]}>
                    <div className={style["api-costs__result__list-item__wrapper"]}>
                        <div className={style["api-costs__result__list-item__wrapper_left"]}>
                            <p>{item.fieldName}</p>
                            <p className={style["api-costs__result__list-item__select"]}>
                                {item.select} {item.fieldName === 'Postgres storage'? 'Gb' : item.fieldName === 'RPC requests'? 'M' : ''}
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
                                <p>{item.fieldName === 'Processor profile'? `${item.fieldName} 1` : item.fieldName}</p>
                                <p className={style["api-costs__result__list-item__select"]}>
                                {item.select} {item.replicas? `x ${item.replicas} replicas`: ''} {item.fieldName === 'Postgres storage'? 'Gb' : item.fieldName === 'RPC requests'? 'M' : ''}
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
                {windowWidth > 768 && (
                    <p className={style["api-costs__result__title"]}>Estimate cost</p>
                )}
                <div>
                    {currentTotalPrice() === 0 && (
                        <p className={`${style["api-costs__result__total"]} ${style["api-costs__result__total_free"]}`}>free</p>
                    )}
                    <p 
                        className={
                            currentTotalPrice() === 0?
                            `${style["api-costs__result__total"]} ${style["api-costs__result__total_month"]} ${style["api-costs__result__total_disable"]}`
                            :`${style["api-costs__result__total"]} ${style["api-costs__result__total_month"]}`
                        }
                    >
                        {`$${(currentOldPrice() * 720).toFixed(2)}/mo`}
                    </p>
                    <p 
                        className={
                            currentTotalPrice() === 0?
                            `${style["api-costs__result__total"]} ${style["api-costs__result__total_hour"]} ${style["api-costs__result__total_disable"]}`
                            :`${style["api-costs__result__total"]} ${style["api-costs__result__total_hour"]}`
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
                {setDetailInfo()}
            </div>
        </div>
    )
}
