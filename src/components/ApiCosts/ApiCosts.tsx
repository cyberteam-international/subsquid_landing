'use client'

import { Fragment, useContext } from 'react';

import {
    ActiveTabContext,
    SelectValuesUseCaseContext,
    SelectValuesResourcesContext,
    TabsProfileContext,
    NewProcessorsContext
} from '@/app/calculator/context';

import ApiCostsField from './ApiCostsField';
import ApiCostsResult from './ApiCostsResult';
import AddProcessor from './AddProcessor';

import { _apiCostsMock } from '@/_mock/apiCosts.mock'

import style from './ApiCosts.module.scss'
import ApiCostsFieldProcessor from './ApiCostsFields/ApiCostsFieldProcessor';

export default function ApiCosts() {

    const [activeTab, setActiveTab] = useContext(ActiveTabContext);
    const [tabsProfile, setTabsProfile] = useContext(TabsProfileContext);
    const [newProcessors, setNewProcessors] = useContext(NewProcessorsContext)
    const [selectValues, setSelectValues] = useContext(
        activeTab === 'byUseCase' ? SelectValuesUseCaseContext : SelectValuesResourcesContext
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

    const setNewProfiles = () => {
        return newProcessors.render.map((item, index) => {
            return (
                <ApiCostsFieldProcessor
                    key={index}
                    field={item}
                    selectValuesState={[newProcessors, setNewProcessors]}
                    tabsProfile={tabsProfile[0].select}
                />
            )
        })
    }

    const currentFields = () => {
        if (activeTab === 'byResources') {
            return _apiCostsMock.tabs['byResources'].fields
        }
        return _apiCostsMock.tabs['byUseCase'].fields
    }

    const setTabFields = () => {
        return currentFields().map((item, index) => {
            if (index === 0) {
                return (
                    <Fragment key={index}>
                        <ApiCostsField
                            field={item}
                            selectValuesState={[selectValues, setSelectValues]}
                            activeTab={activeTab}
                        />
                        {activeTab === 'byResources' && (
                            <>
                                {newProcessors.render.length > 0 && setNewProfiles()}
                                {newProcessors.render.length < 10 && (
                                    <AddProcessor tabsProfile={tabsProfile[0].select} />
                                )}
                            </>
                        )}
                    </Fragment>
                )
            }
            else return (
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
