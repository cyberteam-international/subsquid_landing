'use client'

import { useEffect, useRef, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';

// context
import { ActiveTabContext, TotalSumContext, HelperContext, ScrollElementContext, SelectValuesResourcesContext, SelectValuesUseCaseContext } from './context'

// context types
import { ActiveTab, HelperState, SelectValues, SumState } from './context'

import PayBenefits from '@/components/PayBenefits/PayBenefits';
import ApiCosts from '@/components/ApiCosts/ApiCosts';
import ScaleManifest from '@/components/ScaleManifest/ScaleManifest';
import EstimateCost from '@/components/EstimateCost/EstimateCost';

import _apiCostsMock, { IApiCostsState } from '@/_mock/apiCosts.mock'

import style from './style.module.scss'
import { useResourseCalculator } from '@/app/calculator/hooks/useResourseCalculator';

const setInitial = (tab: string): IApiCostsState[] => {
    return _apiCostsMock[tab].fields.map((item, _index) => {
        switch (item.type) {
            case 'radio':
                return {
                    fieldName: item.name,
                    select: item.values[0].value,
                    price: { type: item.values[0].price.type, value: item.values[0].price.value },
                    replicas: item.replicas ? 1 : null
                }
                break;
            case 'radio-input':
                return {
                    fieldName: item.name,
                    select: item.values[0].toString(),
                    price: { type: item.price.type, value: item.price.value },
                    replicas: item.replicas ? 1 : null
                }
                break;
            case 'range':
                return {
                    fieldName: item.name,
                    select: item.range[0].toString(),
                    price: { type: item.price.type, value: item.price.value },
                    replicas: item.replicas ? 1 : null
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
    const [activeTab, setActiveTab] = useState(Object.keys(_apiCostsMock)[0]) as ActiveTab;
    const [totalSum, setTotalSum] = useState(0) as SumState;
    const [helper, setHelper] = useState({ index: -1 }) as HelperState;

    const windowWidth = useWindowWidth()
    const totalBlockRef = useRef<HTMLDivElement | null>(null)

    const setTotalPrice = () => {
        let total = 10
        // selectValues.forEach((item, index) => {

        // })
        return setTotalSum(total)
    }

    useEffect(() => {
        console.log('selectValuesResources', selectValuesResources)
    }, [selectValuesResources])
    // useEffect(() => {
    //     console.log('selectValuesUseCase', selectValuesUseCase)
    // }, [selectValuesUseCase])

    useEffect(() => {
        if (helper.index !== 'manifest') {
            setHelper({ index: -1 })
        }
    }, [activeTab])

    useResourseCalculator({
        selectUseCaseState: [selectValuesUseCase, setSelectValuesUseCase],
        selectResourcesState: [selectValuesResources, setSelectValuesResources],
    })

    return (
        <SelectValuesUseCaseContext.Provider value={[selectValuesUseCase, setSelectValuesUseCase]}>
            <SelectValuesResourcesContext.Provider value={[selectValuesResources, setSelectValuesResources]}>
                <ActiveTabContext.Provider value={[activeTab, setActiveTab]}>
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
                                        {(windowWidth < 768 && totalSum > 0) && (
                                            <EstimateCost />
                                        )}
                                    </div>
                                </main>
                            </ScrollElementContext.Provider>
                        </HelperContext.Provider>
                    </TotalSumContext.Provider>
                </ActiveTabContext.Provider>
            </SelectValuesResourcesContext.Provider>
        </SelectValuesUseCaseContext.Provider>
    )
}
