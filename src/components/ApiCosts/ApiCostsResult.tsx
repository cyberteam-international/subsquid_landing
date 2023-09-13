import { useState, useContext } from "react";

import { TotalSumContext, SelectValuesContext } from "@/app/calculator/layout";

import { AllowedFieldsNames, IApiCostsState } from "@/_mock/apiCosts.mock";

import style from './ApiCosts.module.scss'

export default function ApiCostsResult() {

    const [totalSum, _setTotalSum] = useContext(TotalSumContext);
    const [selectValues, _setSelectValues] = useContext(SelectValuesContext);

    const [isOpen, setIsOpen] = useState(false);

    const setDetailInfo = () => {
        const entries = Object.entries(selectValues) as [key: AllowedFieldsNames, value: IApiCostsState][]
        return entries.map((item, index) => {
            if (item[1]) {
                return (
                    <div className={style["api-costs__result__list-item"]} key={index}>
                        <div className={style["api-costs__result__list-item__wrapper"]}>
                            <p>{item[1]?.fieldName}</p>
                            <p>
                                ${Number(item[1]?.select) ? Number(item[1].select) * item[1].price : item[1]?.price}
                            </p>
                        </div>
                        <p className={style["api-costs__result__list-item__select"]}>{item[1]?.select}</p>
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
