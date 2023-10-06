'use client'

import { Fragment, RefObject, useContext, useEffect } from 'react';

import {
    ActiveTabContext,
    SelectValuesUseCaseContext,
    SelectValuesResourcesContext,
    TabsProfileContext,
    NewProcessorsContext
} from '@/app/subsquid-cloud/context';

import ApiCostsField from './ApiCostsField';
import ApiCostsResult from './ApiCostsResult';
import AddProcessor from './AddProcessor';

import { _apiCostsMock } from '@/_mock/apiCosts.mock'

import style from './ApiCosts.module.scss'
import ApiCostsFieldProcessor from './ApiCostsFields/ApiCostsFieldProcessor';
import { FadeInUp, FadeInUpFast } from '../Animation';

type Props = {
    refObj: RefObject<HTMLDivElement>
}

export default function ApiCosts({refObj}:Props) {

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
                                {newProcessors.render.length < 9 && (
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
        <section ref={refObj} className={style["api-costs"]}>
            <FadeInUp delay={500}>
                <div>
                    <h2 className="title_api-costs">Cost calculator</h2>
                    <h3 className={style["api-costs__subtitle"]}>Discover how to configure your squid in the <a href="https://docs.subsquid.io/deploy-squid/scale/" target="_blank" rel="noopener noreferrer">docs</a></h3>
                </div>
                <div className={
                    activeTab === 'byUseCase' ?
                        `${style["api-costs__tabs"]} ${style["api-costs__tabs_left"]}`
                        : `${style["api-costs__tabs"]} ${style["api-costs__tabs_right"]}`
                }>
                    {setTabNames()}
                </div>
                <div className={style["api-costs__list"]} >
                    <ApiCostsField
                        field={_apiCostsMock.profile[activeTab === 'byUseCase' ? 0 : 1]}
                        selectValuesState={[tabsProfile, setTabsProfile]}
                        activeTab={activeTab}
                    />
                    {setTabFields()}
                    <ApiCostsResult />
                </div>
            </FadeInUp>
        </section>
    )
}
