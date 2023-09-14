'use client'

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useEffect,
    useState,
    useRef,
    MutableRefObject,
} from 'react';
import { useWindowWidth } from '@react-hook/window-size';

import EstimateCost from '@/components/EstimateCost/EstimateCost';

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

const setInitial = (fieldName: AllowedFieldsNames) => {
    // const x = Object.entries(_apiCostsMock).map((item, index) => {
    const x = Object.entries(_apiCostsMock).map((item, index) => {
        const currentField = item[1].fields.filter((item) => item.name === fieldName)[0]
        if (!currentField) return;
        switch (currentField.type) {
            case 'radio':
                return {
                    fieldName: fieldName,
                    select: currentField.values[0].value,
                    price: { type: currentField.values[0].price.type, value: currentField.values[0].price.value }
                }
                break;
            case 'radio-input':
                return {
                    fieldName: fieldName,
                    select: currentField.values[0].toString(),
                    price: { type: currentField.price.type, value: currentField.price.value }
                }
                break;
            case 'range':
                return {
                    fieldName: fieldName,
                    select: currentField.range[0].toString(),
                    price: { type: currentField.price.type, value: currentField.price.value }
                }
                break;
            case 'radio-replicas':
                return {
                    fieldName: fieldName,
                    select: currentField.values[0].value,
                    price: { type: currentField.values[0].price.type, value: currentField.values[0].price.value }
                }
                break;

            default:
                return null
        }
    })
    console.log('xxxxxxxxxxxxxxxxxxxxxxxx', x)
}

const initialValue: ISelectValues = {
    processorProfile: setInitial(AllowedFieldsNames.processorProfile),
    squidProfile: setInitial(AllowedFieldsNames.squidProfile),
    apiService: setInitial(AllowedFieldsNames.apiService),
    dataBase: setInitial(AllowedFieldsNames.dataBase),
    rpsRequests: setInitial(AllowedFieldsNames.rpsRequests),
    databaseSize: setInitial(AllowedFieldsNames.databaseSize),
    dataIndex: setInitial(AllowedFieldsNames.dataIndex),
    apiRequests: setInitial(AllowedFieldsNames.apiRequests),
    queryComplexity: setInitial(AllowedFieldsNames.queryComplexity),
    networks: setInitial(AllowedFieldsNames.networks),
}

type ActiveTab = [string, Dispatch<SetStateAction<string>>]
type SelectValues = [ISelectValues, Dispatch<SetStateAction<ISelectValues>>]
type SumState = [number | null, Dispatch<SetStateAction<number | null>>]
type HelperState = [number, Dispatch<SetStateAction<number>>]

export const ActiveTabContext = createContext<ActiveTab>(['', () => { }]);
export const SelectValuesContext = createContext<SelectValues>([initialValue, () => { }]);
export const TotalSumContext = createContext<SumState>([null, () => { }]);
export const HelperContext = createContext<HelperState>([-1, () => { }]);
export const WindowWidthContext = createContext<number>(0);
export const ScrollElementContext = createContext<MutableRefObject<HTMLDivElement | null> | null>(null);

export default function layout({ children }: Props) {

    const [selectValues, setSelectValues] = useState(initialValue) as SelectValues;
    const [activeTab, setActiveTab] = useState(Object.keys(_apiCostsMock)[0]) as ActiveTab;
    const [totalSum, setTotalSum] = useState(null) as SumState;
    const [helper, setHelper] = useState(-1) as HelperState;

    const windowWidth = useWindowWidth()
    const totalBlockRef = useRef<HTMLDivElement | null>(null)

    const setTotalPrice = () => {
        let total = 0
        for (let [_key, value] of Object.entries(selectValues) as unknown as [key: AllowedFieldsNames, value: IApiCostsState][]) {
            if (value) {
                // if (Number(value?.select)) {
                //     total += Number(value?.select) * value.price
                // }
                // else {
                //     total += value.price
                // }
            }
        }
        return setTotalSum(total)
    }

    useEffect(() => {
        setSelectValues({ ...initialValue })
        setHelper(-1)
    }, [activeTab])
    useEffect(() => {
        console.log(selectValues)
        setTotalPrice()
    }, [selectValues])

    return (
        <SelectValuesContext.Provider value={[selectValues, setSelectValues]}>
            <ActiveTabContext.Provider value={[activeTab, setActiveTab]}>
                <TotalSumContext.Provider value={[totalSum, setTotalSum]}>
                    <HelperContext.Provider value={[helper, setHelper]}>
                        <WindowWidthContext.Provider value={windowWidth}>
                            <ScrollElementContext.Provider value={totalBlockRef}>
                                {children}
                                {(windowWidth < 768 && totalSum) && (
                                    <EstimateCost />
                                )}
                            </ScrollElementContext.Provider>
                        </WindowWidthContext.Provider>
                    </HelperContext.Provider>
                </TotalSumContext.Provider>
            </ActiveTabContext.Provider>
        </SelectValuesContext.Provider>
    )
}
