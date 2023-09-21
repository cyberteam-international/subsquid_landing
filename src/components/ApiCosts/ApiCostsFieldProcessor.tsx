import { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'

import ApiCostsFieldRadio from './ApiCostsFields/ApiCostsFieldRadio'
import GlobalHelper from '../GlobalHelper/GlobalHelper'

import { SelectValues, TabsProfileContext } from '@/app/calculator/context'

import {
    IApiCostsRadio,
    IApiCostsState,
} from '@/_mock/apiCosts.mock'

import style from './ApiCosts.module.scss'

type Props = {
    field: IApiCostsRadio
    selectValuesState: SelectValues,
    activeTab: string
}

export default function ApiCostsField({ field, selectValuesState, activeTab }: Props) {

    const [selectValues, setSelectValues] = selectValuesState
    const [tabsProfileState, setTabsProfileState] = useContext(TabsProfileContext);
    const tabsProfile = tabsProfileState[0].select

    const [activeitem, setActiveItem] = useState<number>()
    const [isActive, setIsActive] = useState<boolean>(true)
    const [replicasActive, setReplicasActive] = useState<boolean>(false)

    const currentStateIndex = selectValues.findIndex((el) => el.fieldName === field.name)

    const updateState = (item: IApiCostsState, isActiveChange: boolean = false) => {
        // if (tabsProfileState[0].select === 'COLLOCATED' && !isActiveChange) {
        //     if (item.select !== 'DEFAULT' && !item.replicas) {
        //         const newTabsProfileSelect = [...tabsProfileState]
        //         newTabsProfileSelect[0] = { ...tabsProfileState[0], select: 'DEDICATED' }
        //         setTabsProfileState([...newTabsProfileSelect])
        //     }
        // }
        const updateObj = [...selectValues]
        // updateObj[currentStateIndex] = !item.replicas ? { ...item, replicas: selectValues[currentStateIndex].replicas } : item
        updateObj[currentStateIndex] = item
        setSelectValues([...updateObj])
    }

    const setClassName = (key: number,) => {
        return activeitem === key ?
            `${style["api-costs__list-item__fields-item"]} ${style["api-costs__list-item__fields-item_active"]}`
            : `${style["api-costs__list-item__fields-item"]}`
    }

    const setFields = () => {
        if (tabsProfile !== 'COLLOCATED' && activeTab === 'byResources') {
            return field.values.map((item, index) => {
                return (
                    <ApiCostsFieldRadio
                        key={index}
                        fieldName={field.name}
                        item={item}
                        className={setClassName(index)}
                        updateState={updateState}
                    />
                    // <button
                    //     className={setClassName(index)}
                    //     onClick={() => updateState({ fieldName: field.name, select: item.value, price: item.price })}
                    // >
                    //     {item.title}
                    // </button>
                )
            });
        }
    }

    // useEffect(() => {
    //     updateState({ ...selectValues[currentStateIndex], isActive: isActive, }, true)
    // }, [isActive])

    useEffect(() => {
        const currentIndex: number = field.values.findIndex((item) => {
            return item.value === selectValues[currentStateIndex].select;
        });
        setActiveItem(currentIndex);
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
                <p className={style["api-costs__list-item__header__title"]}>{field.title}</p>
                {field.helper && (
                    <GlobalHelper helperObj={field.helper} listIndex={currentStateIndex} />
                )}
            </div>
            {field.subtitle && (
                <p className={style["api-costs__list-item__subtitle"]}>{field.subtitle}</p>
            )}
            <div className={style["api-costs__list-item__fields"]}>
                <div className={style["api-costs__list-item__fields_processor"]}>
                    {setFields()}
                </div>
                <div className={style["api-costs__list-item__fields__remove"]}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="38" viewBox="0 0 24 38" fill="none">
                        <path d="M3 13H5H21" stroke="#DF022A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 13V27C19 27.5304 18.7893 28.0391 18.4142 28.4142C18.0391 28.7893 17.5304 29 17 29H7C6.46957 29 5.96086 28.7893 5.58579 28.4142C5.21071 28.0391 5 27.5304 5 27V13M8 13V11C8 10.4696 8.21071 9.96086 8.58579 9.58579C8.96086 9.21071 9.46957 9 10 9H14C14.5304 9 15.0391 9.21071 15.4142 9.58579C15.7893 9.96086 16 10.4696 16 11V13" stroke="#DF022A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 18V24" stroke="#DF022A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 18V24" stroke="#DF022A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            {field.replicas && (
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
