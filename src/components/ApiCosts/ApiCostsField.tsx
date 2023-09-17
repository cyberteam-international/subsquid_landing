import { useState, useEffect, useContext } from 'react'

import ApiCostsFieldRange from './ApiCostsFields/ApiCostsFieldRange'
import ApiCostsFieldRadio from './ApiCostsFields/ApiCostsFieldRadio'
import ApiCostsFieldRadioInput from './ApiCostsFields/ApiCostsFieldRadioInput'
import GlobalHelper from '../GlobalHelper/GlobalHelper'

import { SelectValuesContext, ActiveTabContext } from '@/app/calculator/context'

import {
    IApiCostsRadio,
    IApiCostsRadioInput,
    IApiCostsRange,
    IApiCostsState,
} from '@/_mock/apiCosts.mock'

import style from './ApiCosts.module.scss'

type Props = {
    field: IApiCostsRange | IApiCostsRadioInput | IApiCostsRadio
    listIndex: number
}

export default function ApiCostsField({ field, listIndex }: Props) {

    const [selectValues, setSelectValues] = useContext(SelectValuesContext)
    const [activeTab, _setActiveTab] = useContext(ActiveTabContext);

    const [activeitem, setActiveItem] = useState<number>()
    const [isActive, setIsActive] = useState<boolean>(true)

    const updateState = (item: IApiCostsState) => {
        const updateObj = [...selectValues]
        updateObj[listIndex] = updateObj[listIndex].replicas? {...item, replicas: updateObj[listIndex].replicas} : item
        setSelectValues([...updateObj])
    }

    const setClassName = (key: number,) => {
        if (field.type === 'radio-input') {
            return selectValues[listIndex]?.select === field.values[key].toString() ?
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
                        <ApiCostsFieldRadio
                            key={index}
                            field={field}
                            item={item}
                            className={setClassName(index)}
                            updateState={updateState}
                        />
                    )
                });
                break;
            case 'radio-input':
                return <ApiCostsFieldRadioInput field={field} updateState={updateState} setClassName={setClassName} />
                break;
            case 'range':
                return <ApiCostsFieldRange field={field} listIndex={listIndex} isActive={isActive} updateState={updateState} />
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (!isActive) {
            updateState(
                {
                    fieldName: selectValues[listIndex].fieldName,
                    price: {
                        type: selectValues[listIndex].price.type,
                        value: 0
                    },
                    select: null,
                    replicas: 1,
                },
            )
        }
    }, [isActive])

    useEffect(() => {
        if (field.type !== 'range') {
            const currentIndex: number = field.values.findIndex((item) => {
                if (typeof item === 'number') {
                    return item.toString() === selectValues[listIndex].select;
                } else {
                    return item.value === selectValues[listIndex].select;
                }
            });
            setActiveItem(currentIndex);
        }
    }, [selectValues]);

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
                <GlobalHelper helperObj={field.helper} listIndex={listIndex}/>
            </div>
            {field.subtitle && (
                <p className={style["api-costs__list-item__subtitle"]}>{field.subtitle}</p>
            )}
            <div
                className={
                    field.type !== 'range' ?
                        style["api-costs__list-item__fields"]
                        : `${style["api-costs__list-item__fields"]} ${style["api-costs__list-item__fields_range"]}`
                }
            >
                {setFields()}
            </div>
            {field.replicas && (
                <div className={style["api-costs__list-item__replicas"]}>
                    <p className={style["api-costs__list-item__replicas__title"]}>Replicas</p>
                    <input
                        type="number"
                        min={1}
                        value={
                            typeof selectValues[listIndex].replicas === 'number'? 
                            Number(selectValues[listIndex].replicas)
                            : ''
                        }
                        onChange={(e) => {
                            const updateObj = [...selectValues];
                            updateObj[listIndex] = { 
                                ...updateObj[listIndex], 
                                replicas: e.target.value !== '' ? Number(e.target.value) : null 
                            };
                            setSelectValues([...updateObj]);
                        }}
                    />
                </div>
            )}
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
