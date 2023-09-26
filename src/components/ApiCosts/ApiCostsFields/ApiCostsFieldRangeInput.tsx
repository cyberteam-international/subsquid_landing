import { useEffect, useRef, useState } from 'react';
import ReactSlider from 'react-slider'

import { IApiCostsRangeInput, IApiCostsState } from "@/_mock/apiCosts.mock";

import style from '../ApiCosts.module.scss'

type Props = {
    field: IApiCostsRangeInput,
    updateState: (item: IApiCostsState) => void,
    isActive: boolean,
    value: string
};

export default function ApiCostsFieldRangeInput({ field, updateState, isActive, value }: Props) {

    const [sliderValue, setSliderValue] = useState(value)
    const [inputActive, setInputActive] = useState(false)
    // const [sliderThumb, setSliderThumb] = useState<string>(`0px`)
    const [focuse, setFocuse] = useState(false)

    // const ref = useRef<SVGSVGElement | null>(null)
    const x = useRef<any | null>(null)

    const updateObj = (item: string): IApiCostsState => {
        return {
            price: {
                type: field.price.type,
                value: field.price.value
            },
            fieldName: field.name,
            select: item,
            isActive: isActive,
            limit: field.limit
        }
    }

    useEffect(() => {
        setSliderValue(value)
    }, [value])

    // useEffect(()=>{
    //     setSliderThumb(ref.current?.parentElement?.style.left?? '0px')
    // }, [ref.current?.parentElement?.style.left, sliderValue])

    return (
        <div
            className={
                focuse ?
                    `${style["api-costs__list-item__fields_range_input__wrapper"]} ${style["api-costs__list-item__fields_range_input__wrapper_active"]}`
                    : style["api-costs__list-item__fields_range_input__wrapper"]
            }
        >
            <p className={style["api-costs__list-item__fields-item__label"]}>
                {field.label}
            </p>
            <label
                className={
                    inputActive ?
                        `${style["api-costs__list-item__fields-item__wrapper"]} ${style["api-costs__list-item__fields-item__wrapper_active"]}`
                        : style["api-costs__list-item__fields-item__wrapper"]
                }
                onClick={() => setInputActive(true)}
            >
                <input
                    type="number"
                    min={0}
                    value={sliderValue}
                    onChange={(e) => updateState(updateObj(e.target.value.toString()))}
                    onFocus={() => { setFocuse(true) }}
                    onBlur={() => {
                        if (Number(value) < field.range[0]) {
                            setFocuse(false)
                            setInputActive(false)
                            updateState(updateObj(field.range[0].toString()))
                        }
                        else if (Number(value) > field.range[1]) {
                            setFocuse(false)
                            setInputActive(false)
                            updateState(updateObj(field.range[1].toString()))
                        }
                        else {
                            setFocuse(false)
                            setInputActive(false)
                            updateState(updateObj(sliderValue.toString()))
                        }
                    }}
                />
                <p className={style["api-costs__list-item__fields-item__prefix"]}>
                    {sliderValue} {field.prefix}
                </p>
            </label>
            <svg
                {...x.current}
                className={style["api-costs__list-item__fields-item-range-thumb_fake"]}
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
            >
                <circle cx="8" cy="8" r="6" fill="white" stroke="#68BEFC" strokeWidth="4" />
            </svg>
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
                renderThumb={(props, _state) => {
                    x.current = props
                    return (
                        <div {...props}>
                            {/* <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6" fill="white" stroke="#68BEFC" strokeWidth="4" />
                            </svg>
                        </div>
                    )
                }
                }
                onChange={(val) => { setSliderValue(val.toString()) }}
                onAfterChange={(val) => {
                    updateState(
                        {
                            price: field.price,
                            fieldName: field.name,
                            select: val.toString(),
                            limit: field.limit,
                            isActive: isActive
                        }
                    )
                }}
            />
        </div>
    )
}
