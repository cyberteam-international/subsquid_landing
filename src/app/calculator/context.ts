import { Dispatch, SetStateAction, createContext, MutableRefObject } from "react";

import { IApiCostsState } from '@/_mock/apiCosts.mock'

export type ActiveTab = [string, Dispatch<SetStateAction<string>>]
export type SelectValues = [IApiCostsState[], Dispatch<SetStateAction<IApiCostsState[]>>]
export type SumState = [number, Dispatch<SetStateAction<number>>]
export type HelperState = [Helper, Dispatch<SetStateAction<Helper>>]

export type Helper = {
    index: number | 'manifest',
    value?: {
        title: string,
        description: string,
    }
}

const initialSelectValues: IApiCostsState[] = [
    {
        fieldName: '',
        select: null,
        price: {
            type: '',
            value: 0
        },
    }
]

export const ActiveTabContext = createContext<ActiveTab>(['', () => { }]);
export const SelectValuesUseCaseContext = createContext<SelectValues>([initialSelectValues, () => { }]);
export const SelectValuesResourcesContext = createContext<SelectValues>([initialSelectValues, () => { }]);
export const TotalSumContext = createContext<SumState>([0, () => { }]);
export const HelperContext = createContext<HelperState>([{index:-1}, () => { }]);
export const ScrollElementContext = createContext<MutableRefObject<HTMLDivElement | null> | null>(null);