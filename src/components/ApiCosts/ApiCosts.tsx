'use client'

import { useContext } from 'react';

import ApiCostsField from './ApiCostsField';
import ApiCostsResult from './ApiCostsResult';

import { ActiveTabContext, SelectValuesUseCaseContext, SelectValuesResourcesContext, TabsProfileContext } from '@/app/calculator/context';

import { _apiCostsMock } from '@/_mock/apiCosts.mock'

import style from './ApiCosts.module.scss'

export default function ApiCosts() {

    const [activeTab, setActiveTab] = useContext(ActiveTabContext);
    const [tabsProfile, setTabsProfile] = useContext(TabsProfileContext);
    const [selectValues, setSelectValues] = useContext(
        activeTab === 'byUseCase'? SelectValuesUseCaseContext : SelectValuesResourcesContext
    )

    const setTabNames = () => {
        const objKeys = Object.entries(_apiCostsMock.tabs)
        return objKeys.map((item, index) => {
            return (
                <button
                    className={
                        activeTab === item[1].name ?
                            `${style["api-costs__tabs-item"]} ${style["api-costs__tabs-item_active"]}`
                            : style["api-costs__tabs-item"]
                    }
                    key={index}
                    onClick={() => setActiveTab(item[1].name)}
                >
                    {item[1].title}
                </button>
            );
        });
    }

    const currentFields = () => {
        if (activeTab === 'byResources') {
            return _apiCostsMock.tabs['byResources'].fields
        }
        return _apiCostsMock.tabs['byUseCase'].fields
    }

    const setTabFields = () => {
        return currentFields().map((item, index) => {
            return (
                <ApiCostsField 
                    key={index} 
                    field={item} 
                    selectValuesState={[selectValues, setSelectValues]}
                    activeTab={activeTab}
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
                <ApiCostsField 
                    field={_apiCostsMock.profile} 
                    selectValuesState={[tabsProfile, setTabsProfile]}
                    activeTab={activeTab} 
                />
                {setTabFields()}
                <ApiCostsResult />
            </div>
        </section>
    )
}
