import { useState, useContext, Fragment } from "react";

import {
    TotalSumContext,
    ScrollElementContext,
    SelectValuesResourcesContext,
} from "@/app/calculator/context";

import style from './ApiCosts.module.scss'

export default function ApiCostsResult() {

    const [totalSum, _setTotalSum] = useContext(TotalSumContext);
    const [selectValues, _setSelectValues] = useContext(SelectValuesResourcesContext)

    const totalBlockRef = useContext(ScrollElementContext)

    const [isOpen, setIsOpen] = useState(false);

    const setDetailInfo = () => {
        return selectValues?.map((item, index) => {
            if (item.select && item.fieldName !== 'squidProfile') {
                return (
                    <Fragment key={index}>
                        <div className={style["api-costs__result__list-item"]}>
                            <div className={style["api-costs__result__list-item__wrapper"]}>
                                <p>{item.fieldName}</p>
                                <p>
                                    ${item.replicas? 
                                        Number(item.select) ? (Number(item.select) * item.price.value * item.replicas).toFixed(2) : (item?.price.value * item.replicas).toFixed(2)
                                        : Number(item.select) ? (Number(item.select) * item.price.value).toFixed(2) : (item?.price.value).toFixed(2)
                                    }/h
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
                    </Fragment>
                )
            }
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
            {selectValues[0].select === 'Collocated' && (
                <p className={style["api-costs__result__total"]}>free</p>
            )}
            <p 
                className={
                    selectValues[0].select === 'Collocated'?
                    `${style["api-costs__result__total"]} ${style["api-costs__result__total_disable"]}`
                    :style["api-costs__result__total"]
                }
            >
                ${(totalSum * 720).toFixed(2)}/mo
            </p>
            <p 
                className={
                    selectValues[0].select === 'Collocated'?
                    `${style["api-costs__result__total"]} ${style["api-costs__result__total_disable"]}`
                    :style["api-costs__result__total"]
                }
            >
                ${totalSum.toFixed(2)}/h
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
