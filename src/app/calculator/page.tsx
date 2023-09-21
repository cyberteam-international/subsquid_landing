'use client'

import { useEffect, useRef, useState } from 'react';

// context
import {
    ActiveTabContext,
    TotalSumContext,
    HelperContext,
    ScrollElementContext,
    SelectValuesResourcesContext,
    SelectValuesUseCaseContext,
    TabsProfileContext
} from './context'

// context types
import { ActiveTab, HelperState, SelectValues, SumState } from './context'

import PayBenefits from '@/components/PayBenefits/PayBenefits';
import ApiCosts from '@/components/ApiCosts/ApiCosts';
import ScaleManifest from '@/components/ScaleManifest/ScaleManifest';
import EstimateCost from '@/components/EstimateCost/EstimateCost';

import { useResourseCalculator } from '@/app/calculator/hooks/useResourseCalculator';
import { useTotalCalculator } from './hooks/useTotalPrice';

import { _apiCostsMock, IApiCostsState } from '@/_mock/apiCosts.mock'

import style from './style.module.scss'

const setInitial = (tab: string = 'byResources', isProfile: boolean = false): IApiCostsState[] => {
    const currentFields = tab === 'byResources' ? _apiCostsMock.tabs['byResources'].fields : _apiCostsMock.tabs['byUseCase'].fields
    if (isProfile) {
        return [
            {
                fieldName: _apiCostsMock.profile.name,
                select: _apiCostsMock.profile.values[0].value,
                price: { type: _apiCostsMock.profile.values[0].price.type, value: _apiCostsMock.profile.values[0].price.value },
                replicas: _apiCostsMock.profile.replicas ?? undefined,
                isActive: true,
            }
        ]
    }
    return currentFields.map((item, _index): IApiCostsState => {
        switch (item.type) {
            case 'radio':
                return {
                    fieldName: item.name,
                    select: item.values[0].value,
                    price: { type: item.values[0].price.type, value: item.values[0].price.value },
                    replicas: item.replicas ?? undefined,
                    isActive: true,
                }
                break;
            case 'radio-input':
                return {
                    fieldName: item.name,
                    select: item.values[0].toString(),
                    price: { type: item.price.type, value: item.price.value },
                    replicas: item.replicas ?? undefined,
                    isActive: true,
                }
                break;
            case 'range':
                return {
                    fieldName: item.name,
                    select: item.range[0].toString(),
                    price: { type: item.price.type, value: item.price.value },
                    replicas: item.replicas ?? undefined,
                    limit: item.limit,
                    isActive: true,
                }
                break;
            default:
                throw new Error('Uncorrected field type. Update setInitial() or add field current type.')
        }
    })
}

export default function CalculatorPage() {
    const [selectValuesUseCase, setSelectValuesUseCase] = useState(setInitial('byUseCase')) as SelectValues;
    const [selectValuesResources, setSelectValuesResources] = useState(setInitial('byResources')) as SelectValues;
    const [activeTab, setActiveTab] = useState(Object.keys(_apiCostsMock.tabs)[0]) as ActiveTab;
    const [tabsProfile, setTabsProfile] = useState(setInitial('byUseCase', true)) as SelectValues;
    const [totalSum, setTotalSum] = useState([{ fieldName: '', price: 0, currentPrice: 0 }]) as SumState;
    const [helper, setHelper] = useState({ index: -1 }) as HelperState;

    const totalBlockRef = useRef<HTMLDivElement | null>(null)

    useResourseCalculator({
        selectUseCaseState: [selectValuesUseCase, setSelectValuesUseCase],
        selectResourcesState: [selectValuesResources, setSelectValuesResources],
        tabsProfileState: [tabsProfile, setTabsProfile],
    })

    useTotalCalculator({
        selectValuesResources: selectValuesResources,
        tabsState: tabsProfile[0].select,
        setTotalSum: setTotalSum
    })

    useEffect(() => {
        console.log('totalSum', totalSum)
    }, [totalSum])

    useEffect(() => {
        console.log('selectValuesResources', selectValuesResources)
    }, [selectValuesResources])

    useEffect(() => {
        console.log('selectValuesUseCase', selectValuesUseCase)
    }, [selectValuesUseCase])

    useEffect(() => {
        console.log('tabsProfile', tabsProfile)
        if (tabsProfile[0].select === 'COLLOCATED') {
            setSelectValuesUseCase([...setInitial('byUseCase')])
        }
    }, [tabsProfile])

    useEffect(() => {
        if (helper.index !== 'manifest') {
            setHelper({ index: -1 })
        }
    }, [activeTab])

    return (
        <SelectValuesUseCaseContext.Provider value={[selectValuesUseCase, setSelectValuesUseCase]}>
            <SelectValuesResourcesContext.Provider value={[selectValuesResources, setSelectValuesResources]}>
                <ActiveTabContext.Provider value={[activeTab, setActiveTab]}>
                    <TabsProfileContext.Provider value={[tabsProfile, setTabsProfile]}>
                        <TotalSumContext.Provider value={[totalSum, setTotalSum]}>
                            <HelperContext.Provider value={[helper, setHelper]}>
                                <ScrollElementContext.Provider value={totalBlockRef}>
                                    <main className={`main ${style['calculator']}`}>
                                        <div className="container">
                                            <section className={style['calculator__header']}>
                                                <h1 className="calculator__title">Pricing that fits your <i>needs</i></h1>
                                                <p className={style['calculator__header__subtitle']}>
                                                    Empowering your data access with flexible pricing.
                                                </p>
                                            </section>
                                            <PayBenefits />
                                            <ApiCosts />
                                            <ScaleManifest />
                                            <EstimateCost />
                                        </div>
                                    </main>
                                </ScrollElementContext.Provider>
                            </HelperContext.Provider>
                        </TotalSumContext.Provider>
                    </TabsProfileContext.Provider>
                </ActiveTabContext.Provider>
            </SelectValuesResourcesContext.Provider>
        </SelectValuesUseCaseContext.Provider>
    )
}
