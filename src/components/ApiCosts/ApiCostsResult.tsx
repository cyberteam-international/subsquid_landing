import { useState } from "react";

import { AllowedFieldsNames, IApiCostsState } from "@/_mock/apiCosts.mock";
import { ISelectValues } from "./ApiCosts";

import style from './ApiCosts.module.scss'

type Props = {
    selectValues: ISelectValues
};

export default function ApiCostsResult({ selectValues }: Props) {

    const [isOpen, setIsOpen] = useState(false);


    const setTotalPrice = () => {
        let total = 0
        for (let [_key, value] of Object.entries(selectValues) as unknown as [key: AllowedFieldsNames, value: IApiCostsState][]) {
            if (value) {
                if (Number(value?.select)) {
                    total += Number(value?.select) * value.price
                }
                else {
                    total += value.price
                }
            }
        }
        return total
    }

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
            <p className={style["api-costs__result__total"]}>${setTotalPrice()}/mo</p>
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
