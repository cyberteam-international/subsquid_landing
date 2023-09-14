import { useState, useContext } from "react";

import { TotalSumContext, SelectValuesContext, ScrollElementContext } from "@/app/calculator/layout";

import style from './ApiCosts.module.scss'

export default function ApiCostsResult() {

    const [totalSum, _setTotalSum] = useContext(TotalSumContext);
    const [selectValues, _setSelectValues] = useContext(SelectValuesContext);

    const totalBlockRef = useContext(ScrollElementContext)

    const [isOpen, setIsOpen] = useState(false);

    const setDetailInfo = () => {
        return selectValues.map((item, index) => {
            if (item.select) {
                return (
                    <div className={style["api-costs__result__list-item"]} key={index}>
                        <div className={style["api-costs__result__list-item__wrapper"]}>
                            <p>{item.fieldName}</p>
                            <p>
                                ${Number(item.select) ? Number(item.select) * item.price.value : item?.price.value}
                            </p>
                        </div>
                        <p className={style["api-costs__result__list-item__select"]}>{item.select}</p>
                    </div>
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
            <p className={style["api-costs__result__total"]}>${totalSum}/mo</p>
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
