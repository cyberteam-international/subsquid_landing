import { useState, useEffect, useContext } from 'react'
import { useWindowWidth } from '@react-hook/window-size'

import ApiCostsFieldRangeInput from './ApiCostsFields/ApiCostsFieldRangeInput'
import ApiCostsFieldRadio from './ApiCostsFields/ApiCostsFieldRadio'
import ApiCostsFieldRadioInput from './ApiCostsFields/ApiCostsFieldRadioInput'
import GlobalHelper from '../GlobalHelper/GlobalHelper'

import { SelectValues, TabsProfileContext, TotalSumContext } from '@/app/subsquid-cloud/context'

import {
    IApiCostsRadio,
    IApiCostsRadioInput,
    IApiCostsRange,
    IApiCostsRangeInput,
    IApiCostsState,
} from '@/_mock/apiCosts.mock'

import style from './ApiCosts.module.scss'
import ApiCostsFieldRange from './ApiCostsFields/ApiCostsFieldRange'

type Props = {
    field: IApiCostsRange | IApiCostsRadioInput | IApiCostsRadio | IApiCostsRangeInput
    selectValuesState: SelectValues,
    activeTab: string,
}

export default function ApiCostsField({ field, selectValuesState, activeTab }: Props) {

    const [selectValues, setSelectValues] = selectValuesState
    const [tabsProfileState, setTabsProfileState] = useContext(TabsProfileContext);
    const [totalSum, _setTotalSum] = useContext(TotalSumContext)
    const tabsProfile = tabsProfileState[0].select

    const [activeitem, setActiveItem] = useState<number>()
    const [isActive, setIsActive] = useState<boolean>(true)
    const [replicasActive, setReplicasActive] = useState<boolean>(false)

    const windowWidth = typeof window !== 'undefined' ? useWindowWidth() : 1920;

    const currentStateIndex = selectValues.findIndex((el) => el.fieldName === field.name)

    const updateState = (item: IApiCostsState, isActiveChange: boolean = false) => {
        if (tabsProfile === 'COLLOCATED' && !isActiveChange) {
            if (item.select !== 'default' && !item.replicas && item.fieldName !== 'squidProfile' && (activeTab === 'byUseCase' || (field.type !== 'range-input' && field.type !== 'range'))) {
                const newTabsProfileSelect = [...tabsProfileState]
                newTabsProfileSelect[0] = { ...tabsProfileState[0], select: 'DEDICATED' }
                setTabsProfileState([...newTabsProfileSelect])
            }
        }
        const updateObj = [...selectValues]
        updateObj[currentStateIndex] = !item.replicas ? { ...item, replicas: selectValues[currentStateIndex].replicas, isActive: isActive } : { ...item, isActive: isActive }
        setSelectValues([...updateObj])
    }

    const setClassName = (key: number,) => {
        if (field.type === 'radio-input') {
            return selectValues[currentStateIndex]?.select === field.values[key].toString() ?
                `${style["api-costs__list-item__fields-item"]} ${style["api-costs__list-item__fields-item_active"]} ${style["api-costs__list-item__fields-item_number"]}`
                : `${style["api-costs__list-item__fields-item"]} ${style["api-costs__list-item__fields-item_number"]}`
        }
        else return activeitem === key ?
            `${style["api-costs__list-item__fields-item"]} ${style["api-costs__list-item__fields-item_active"]}`
            : `${style["api-costs__list-item__fields-item"]}`
    }

    const setFields = () => {
        if (tabsProfile !== 'COLLOCATED' || activeTab !== 'byResources') {
            switch (field.type) {
                case 'radio':
                    return field.values.map((item, index) => {
                        return (
                            <ApiCostsFieldRadio
                                key={index}
                                fieldName={field.name}
                                item={item}
                                className={setClassName(index)}
                                updateState={updateState}
                            />
                        )
                    });
                    break;
                case 'radio-input':
                    return (
                        <ApiCostsFieldRadioInput
                            field={field}
                            updateState={updateState}
                            setClassName={setClassName}
                            value={selectValues[currentStateIndex]?.select}
                            isActive={isActive}
                        />
                    )
                    break;
                case 'range-input':
                    return (
                        <ApiCostsFieldRangeInput
                            field={field}
                            isActive={isActive}
                            updateState={updateState}
                            tabsProfile={tabsProfile}
                            value={isActive ? selectValues[currentStateIndex].select ?? field.range[0].toString() : field.range[0].toString()}
                        />
                    )
                    break;
                case 'range':
                    return (
                        <ApiCostsFieldRange
                            field={field}
                            isActive={isActive}
                            updateState={updateState}
                            value={isActive ? selectValues[currentStateIndex].select ?? field.range[0].toString() : field.range[0].toString()}
                        />
                    )
                    break;
                default:
                    break;
            }
        }
        else if (field.type !== 'range-input' && field.type !== 'range') {
            if (field.name !== 'squidProfile') {
                return <ApiCostsFieldRadio
                    fieldName={field.name}
                    item={
                        {
                            title: 'Default',
                            value: 'default',
                            price: {
                                type: "h",
                                value: 0.0069
                            },
                        }
                    }
                    className={setClassName(0)}
                    updateState={updateState}
                />
            }
            else if (field.type === 'radio') {
                return field.values.map((item, index) => {
                    return (
                        <ApiCostsFieldRadio
                            key={index}
                            fieldName={field.name}
                            item={item}
                            className={setClassName(index)}
                            updateState={updateState}
                        />
                    )
                });
            }
        }
        else if (field.type !== 'range-input') {
            return (
                <ApiCostsFieldRange
                    field={field}
                    isActive={isActive}
                    updateState={updateState}
                    value={isActive ? selectValues[currentStateIndex].select ?? field.range[1].toString() : field.range[1].toString()}
                />
            )
        }
        else {
            return (
                <ApiCostsFieldRangeInput
                    field={field}
                    isActive={isActive}
                    updateState={updateState}
                    tabsProfile={tabsProfile}
                    value={isActive ? selectValues[currentStateIndex].select ?? field.range[1].toString() : field.range[1].toString()}
                />
            )
        }
    }

    const setClassNameField = () => {
        if (field.type === 'range-input') {
            return `${style["api-costs__list-item__fields"]} ${style["api-costs__list-item__fields_range_input"]}`
        }
        else if (field.type === 'range') {
            return `${style["api-costs__list-item__fields"]} ${style["api-costs__list-item__fields_range"]}`
        }
        else return style["api-costs__list-item__fields"]
    }

    useEffect(() => {
        updateState({ ...selectValues[currentStateIndex], isActive: isActive, }, true)
    }, [isActive])

    useEffect(() => {
        if (field.type !== 'range-input' && field.type !== 'range') {
            const currentIndex: number = field.values.findIndex((item) => {
                if (typeof item === 'number') {
                    return item.toString() === selectValues[currentStateIndex].select;
                } else {
                    return item.value === selectValues[currentStateIndex].select;
                }
            });
            if (selectValues[currentStateIndex].select !== 'default') {
                setActiveItem(currentIndex);
            }
            else setActiveItem(0);
        }
    }, [selectValues]);

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
                <p className={style["api-costs__list-item__header__title"]}>
                    {field.type === 'range-input'? field.title[tabsProfile === 'COLLOCATED'? 0 : 1]: field.title}
                </p>
                {/* {field.helper && (
                    <GlobalHelper helperObj={field.helper} listIndex={currentStateIndex} />
                )} */}
                {(windowWidth > 768 && field.name !== 'squidProfile' && activeTab === 'byResources') && (
                    <p className={style["api-costs__list-item__header__price"]}>
                        ${(totalSum[currentStateIndex].price * 720).toFixed(2)}/mo
                    </p>
                )}
            </div>
            {field.subtitle && (
                <p className={style["api-costs__list-item__subtitle"]}>{field.subtitle}</p>
            )}
            <div
                className={setClassNameField()}
            >
                {setFields()}
            </div>
            {(windowWidth < 768 && field.name !== 'squidProfile' && activeTab === 'byResources') && (
                <p className={style["api-costs__list-item__price"]}>
                    ${(totalSum[currentStateIndex].price * 720).toFixed(2)}/mo
                </p>
            )}
            {(field.replicas && tabsProfile !== 'COLLOCATED') && (
                <label
                    onClick={() => setReplicasActive(true)}
                    className={
                        replicasActive ?
                            `${style["api-costs__list-item__replicas"]} ${style["api-costs__list-item__replicas_active"]}`
                            : style["api-costs__list-item__replicas"]
                    }
                >
                    <p className={style["api-costs__list-item__replicas__title"]}>Replicas</p>
                    <input
                        type="number"
                        min={1}
                        max={tabsProfile !== 'COLLOCATED' ? 1000 : 1}
                        value={selectValues[currentStateIndex].replicas}
                        onChange={(e) => updateState({ ...selectValues[currentStateIndex], replicas: e.target.value })}
                        onBlur={() => {
                            // Number(selectValues[currentStateIndex].replicas) > 0? null : updateState({ ...selectValues[currentStateIndex], replicas: '1' })
                            if (Number(selectValues[currentStateIndex].replicas) <= 0 || tabsProfile === 'COLLOCATED') {
                                updateState({ ...selectValues[currentStateIndex], replicas: '1' })
                            }
                            setReplicasActive(false)
                        }}
                    />
                </label>
            )}
            {field.warning && (
                <div className={style["api-costs__list-item__warning"]}>
                    {tabsProfile === 'COLLOCATED' && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0499 12.4725L17.049 12.4709L12.3236 3.98237C12.3236 3.98227 12.3235 3.98217 12.3235 3.98207C11.3158 2.16124 8.67577 2.16653 7.67106 3.98213C7.67101 3.98222 7.67097 3.9823 7.67092 3.98238L2.9511 12.4768L2.95099 12.477C1.97086 14.2435 3.27048 16.3816 5.28008 16.3816H14.7201C16.7245 16.3816 18.0299 14.2532 17.0499 12.4725Z" fill="#FFDD29" stroke="#1D1D1F" strokeWidth="0.763121" />
                            <path d="M10 6.81641V10.8164" stroke="#1D1D1F" strokeWidth="1.06837" strokeLinecap="round" />
                            <circle cx="9.9873" cy="12.9062" r="0.75" fill="#1D1D1F" />
                        </svg>
                    )}
                    <p>{tabsProfile === 'COLLOCATED' ? field.warning[0] : field.warning[1]}</p>
                </div>
            )}
        </div>
    )
}
