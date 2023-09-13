'use client'

import { useEffect, useState } from 'react';

import ApiCostsField from './ApiCostsField';
import ApiCostsResult from './ApiCostsResult';

import _apiCostsMock, { IApiCostsState } from '@/_mock/apiCosts.mock'

import style from './ApiCosts.module.scss'

export interface ISelectValues {
    squidProfile: null | IApiCostsState;
    processorProfile: null | IApiCostsState;
    apiService: null | IApiCostsState;
    dataBase: null | IApiCostsState;
    rpsRequests: null | IApiCostsState;
    databaseSize: null | IApiCostsState;
    dataIndex: null | IApiCostsState;
    apiRequests: null | IApiCostsState;
    queryComplexity: null | IApiCostsState;
    networks: null | IApiCostsState;
}

const initialValue : ISelectValues = {
    squidProfile: null,
    processorProfile: null,
    apiService: null,
    dataBase: null,
    rpsRequests: null,
    databaseSize: null,
    dataIndex: null,
    apiRequests: null,
    queryComplexity: null,
    networks: null,
}

export default function ApiCosts() {

    const [activeTab, setActiveTab] = useState<string>(Object.keys(_apiCostsMock)[0]);
    const [selectValues, setSelectValues] = useState<ISelectValues>(initialValue)
    const [helperOpen, setHelperOpen] = useState<number>(-1)

    useEffect(()=>{setSelectValues({...initialValue})}, [activeTab])
    useEffect(()=>{console.log(selectValues)}, [selectValues])

    const setTabNames = () => {
        const objKeys = Object.keys(_apiCostsMock)
        return objKeys.map((_item, index) => {
            return (
                <button
                    className={
                        activeTab === objKeys[index] ?
                            `${style["api-costs__tabs-item"]} ${style["api-costs__tabs-item_active"]}`
                            : style["api-costs__tabs-item"]
                    }
                    key={index}
                    onClick={() => setActiveTab(objKeys[index])}
                >
                    {_apiCostsMock[objKeys[index]].title}
                </button>
            );
        });
    }

    const setTabFields = () => {
        return _apiCostsMock[activeTab].fields.map((item, index) => {
            return (
                <ApiCostsField 
                    key={index} 
                    field={item} 
                    state={[selectValues, setSelectValues]} 
                    tabState={activeTab}
                    helperState={[helperOpen === index, ()=>setHelperOpen(helperOpen === index? -1 : index)]}
                />
            )
        })
    }

    return (
        <section className={style["api-costs"]}>
            <h2 className="title_api-costs">Estimate indexing and API costs</h2>
            <div className={style["api-costs__tabs"]}>
                {setTabNames()}
            </div>
            <div className={style["api-costs__list"]}>
                {setTabFields()}
                <ApiCostsResult selectValues={selectValues}/>
            </div>
        </section>
    )
}
