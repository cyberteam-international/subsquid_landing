import { Fragment, useState, useEffect, useContext } from 'react'
import ReactSlider from 'react-slider'

import { SelectValuesContext, ActiveTabContext, HelperContext, WindowWidthContext } from '@/app/calculator/layout'

import {
    AllowedFieldsNames,
    IApiCostsRadio,
    IApiCostsRadioInput,
    IApiCostsRange,
    IApiCostsState,
} from '@/_mock/apiCosts.mock'

import style from './ApiCosts.module.scss'

type Props = {
    field: IApiCostsRange | IApiCostsRadioInput | IApiCostsRadio,
    listIndex: number
}

export default function ApiCostsField({ field, listIndex }: Props) {

    const [selectValues, setSelectValues] = useContext(SelectValuesContext)
    const [activeTab, _setActiveTab] = useContext(ActiveTabContext);
    const [helper, setHelper] = useContext(HelperContext)
    const windowWidth = useContext(WindowWidthContext)


    const [activeitem, setActiveItem] = useState<number>()
    const [isActive, setIsActive] = useState<boolean>(true)

    const updateState = (fieldName: AllowedFieldsNames, item: IApiCostsState | null, index: number) => {
        const updateObj = { ...selectValues }
        updateObj[fieldName] = isActive ? item : null;
        setSelectValues({ ...updateObj })
        setActiveItem(isActive ? index : -1)
    }

    const setClassName = (key: number,) => {
        if (field.type === 'radio-input') {
            return selectValues[field.name]?.select === field.values[key].toString() ?
                `${style["api-costs__list-item__fields-item"]} ${style["api-costs__list-item__fields-item_active"]} ${style["api-costs__list-item__fields-item_number"]}`
                : `${style["api-costs__list-item__fields-item"]} ${style["api-costs__list-item__fields-item_number"]}`
        }
        else return activeitem === key ?
            `${style["api-costs__list-item__fields-item"]} ${style["api-costs__list-item__fields-item_active"]}`
            : `${style["api-costs__list-item__fields-item"]}`
    }

    const setFields = () => {
        switch (field.type) {
            case 'radio':
                return field.values.map((item, index) => {
                    return (
                        <button
                            key={index}
                            className={setClassName(index)}
                            onClick={() => updateState(field.name, { fieldName: field.name, select: item.value, price: item.price }, index)}
                        >
                            {item.value}
                        </button>

                    );
                });
                break;
            case 'radio-input':
                const returnArray = field.values.map((item, index) => {
                    return (
                        <button
                            key={index}
                            className={setClassName(index)}
                            onClick={() => updateState(field.name, { price: field.price, fieldName: field.name, select: item.toString() }, index)}
                        >
                            {item}
                        </button>

                    );
                });
                return (
                    <Fragment>
                        <div className={style["api-costs__list-item__fields-wrapper"]}>
                            {returnArray}
                        </div>
                        <input
                            type="number"
                            min={1}
                            placeholder='Your value'
                            onChange={(e) => updateState(field.name, { price: field.price, fieldName: field.name, select: e.target.value }, -1)}
                        />
                    </Fragment>
                )
                break;
            case 'range':
                return (
                    <Fragment>
                        <p className={style["api-costs__list-item__fields-item__label"]}>
                            {field.label}
                        </p>
                        <p className={style["api-costs__list-item__fields-item__prefix"]}>
                            {selectValues[field.name]?.select} {field.prefix}
                        </p>
                        <ReactSlider
                            className={style["api-costs__list-item__fields-item-range"]}
                            marks
                            disabled={!isActive}
                            markClassName={style["api-costs__list-item__fields-item-range-mark"]}
                            min={field.range[0]}
                            max={field.range[1]}
                            thumbClassName={style["api-costs__list-item__fields-item-range-thumb"]}
                            trackClassName={style["api-costs__list-item__fields-item-range-track"]}
                            renderThumb={(props, state) =>
                                <div {...props}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <circle cx="8" cy="8" r="6" fill="white" stroke="#68BEFC" strokeWidth="4" />
                                    </svg>
                                </div>
                            }
                            onChange={(value) => updateState(field.name, { price: field.price, fieldName: field.name, select: value.toString() }, -1)}
                        />
                    </Fragment>
                )
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (!isActive) {
            updateState(field.name, null, -1)
        }
    }, [isActive])

    useEffect(() => {
        setActiveItem(-1)
        setIsActive(true)
    }, [activeTab])

    return (
        <div className={
            isActive ?
                style["api-costs__list-item"]
                : `${style["api-costs__list-item"]} ${style["api-costs__list-item_disable"]}`
        }>
            <div className={style["api-costs__list-item__header"]}>
                {field.canActive &&
                    <button
                        className={style["api-costs__list-item__header__button"]}
                        onClick={() => setIsActive(!isActive)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                }
                <p className={style["api-costs__list-item__header__title"]}>{field.title}</p>
                {field.helper && (
                    <div className={style["api-costs__list-item__header__helper"]}>
                        <span onClick={() => setHelper(helper === listIndex ? -1 : listIndex)}>?</span>
                        {(helper === listIndex && windowWidth > 768) && (
                            <div className={style["api-costs__list-item__header__helper__block"]}>
                                <p>{field.helper.description}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div
                className={
                    field.type !== 'range' ?
                        style["api-costs__list-item__fields"]
                        : `${style["api-costs__list-item__fields"]} ${style["api-costs__list-item__fields_range"]}`
                }
            >
                {setFields()}
            </div>
            {field.warning && (
                <div className={style["api-costs__list-item__warning"]}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.0499 12.4725L17.049 12.4709L12.3236 3.98237C12.3236 3.98227 12.3235 3.98217 12.3235 3.98207C11.3158 2.16124 8.67577 2.16653 7.67106 3.98213C7.67101 3.98222 7.67097 3.9823 7.67092 3.98238L2.9511 12.4768L2.95099 12.477C1.97086 14.2435 3.27048 16.3816 5.28008 16.3816H14.7201C16.7245 16.3816 18.0299 14.2532 17.0499 12.4725Z" fill="#FFDD29" stroke="#1D1D1F" strokeWidth="0.763121" />
                        <path d="M10 6.81641V10.8164" stroke="#1D1D1F" strokeWidth="1.06837" strokeLinecap="round" />
                        <circle cx="9.9873" cy="12.9062" r="0.75" fill="#1D1D1F" />
                    </svg>
                    <p>{field.warning}</p>
                </div>
            )}
        </div>
    )
}
