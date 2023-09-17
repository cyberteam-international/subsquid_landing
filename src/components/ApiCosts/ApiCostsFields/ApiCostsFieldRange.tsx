import {useContext} from "react";
import ReactSlider from 'react-slider'

import { SelectValues} from '@/app/calculator/context';

import { IApiCostsRange, IApiCostsState } from "@/_mock/apiCosts.mock";

import style from '../ApiCosts.module.scss'

type Props = {
    field: IApiCostsRange,
    updateState: (item: IApiCostsState)=>void,
    isActive: boolean,
    listIndex: number,
    value: string
};

export default function ApiCostsFieldRange({ field, updateState, isActive, listIndex, value }: Props) {

    return (
        <>
            <p className={style["api-costs__list-item__fields-item__label"]}>
                {field.label}
            </p>
            <p className={style["api-costs__list-item__fields-item__prefix"]}>
                {value} {field.prefix}
            </p>
            <ReactSlider
                className={style["api-costs__list-item__fields-item-range"]}
                disabled={!isActive}
                markClassName={style["api-costs__list-item__fields-item-range-mark"]}
                min={field.range[0]}
                max={field.range[1]}
                value={Number(value)}
                step={field.step}
                thumbClassName={style["api-costs__list-item__fields-item-range-thumb"]}
                trackClassName={style["api-costs__list-item__fields-item-range-track"]}
                renderThumb={(props, _state) =>
                    <div {...props}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" fill="white" stroke="#68BEFC" strokeWidth="4" />
                        </svg>
                    </div>
                }
                onChange={(value) => updateState({ price: field.price, fieldName: field.name, select: value.toString() })}
            />
        </>
    )
}
