'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

import _apiCostsMock, { AllowedFieldsNames, IApiCostsState } from '@/_mock/apiCosts.mock'

type Props = {
    children: ReactNode
};

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

const initialValue: ISelectValues = {
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

type ActiveTab = [string, Dispatch<SetStateAction<string>>]
type SelectValues = [ISelectValues, Dispatch<SetStateAction<ISelectValues>>]
type SumState = [number | null, Dispatch<SetStateAction<number | null>>]
type HelperState = [number, Dispatch<SetStateAction<number>>]

export const SelectValuesContext = createContext<SelectValues>([initialValue, () => { }]);
export const ActiveTabContext = createContext<ActiveTab>(['', () => { }]);
export const TotalSumContext = createContext<SumState>([null, () => { }]);
export const HelperContext = createContext<HelperState>([-1, () => { }]);

export default function layout({ children }: Props) {

    const [selectValues, setSelectValues] = useState(initialValue) as SelectValues;
    const [activeTab, setActiveTab] = useState(Object.keys(_apiCostsMock)[0]) as ActiveTab;
    const [totalSum, setTotalSum] = useState(null) as SumState;
    const [helper, setHelper] = useState(-1) as HelperState

    const setTotalPrice = () => {
        let total = 0
        for (let [_key, value] of Object.entries(selectValues) as unknown as [key: AllowedFieldsNames, value: IApiCostsState][]) {
            if (value) {
                if (Number(value?.select)) {
                    total += Number(value?.select) * value.price
                }
                else {
                    total += value.price
                }
            }
        }
        return setTotalSum(total)
    }

    useEffect(()=>{setSelectValues({...initialValue})}, [activeTab])
    useEffect(()=>{
        console.log(selectValues)
        setTotalPrice()
    }, [selectValues])

    return (
        <SelectValuesContext.Provider value={[selectValues, setSelectValues]}>
            <ActiveTabContext.Provider value={[activeTab, setActiveTab]}>
                <TotalSumContext.Provider value={[totalSum, setTotalSum]}>
                    <HelperContext.Provider value={[helper, setHelper]}>
                        {children}
                    </HelperContext.Provider>
                </TotalSumContext.Provider>
            </ActiveTabContext.Provider>
        </SelectValuesContext.Provider>
    )
}
