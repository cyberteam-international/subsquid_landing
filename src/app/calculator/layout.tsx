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

const setInitial = (tab: string): IApiCostsState[] => {
    return _apiCostsMock[tab].fields.map((item, _index) => {
        switch (item.type) {
            case 'radio':
                return {
                    fieldName: item.name,
                    select: item.values[0].value,
                    price: { type: item.values[0].price.type, value: item.values[0].price.value }
                }
                break;
            case 'radio-input':
                return {
                    fieldName: item.name,
                    select: item.values[0].toString(),
                    price: { type: item.price.type, value: item.price.value }
                }
                break;
            case 'range':
                return {
                    fieldName: item.name,
                    select: item.range[0].toString(),
                    price: { type: item.price.type, value: item.price.value }
                }
                break;
            case 'radio-replicas':
                return {
                    fieldName: item.name,
                    select: item.values[0].value,
                    price: { type: item.values[0].price.type, value: item.values[0].price.value }
                }
                break;

            default:
                return {
                    fieldName: '',
                    select: '',
                    price: { type: "hr", value: 0 }
                }
        }
    })
}

type ActiveTab = [string, Dispatch<SetStateAction<string>>]
type SelectValues = [IApiCostsState[], Dispatch<SetStateAction<IApiCostsState[]>>]
type SumState = [number | null, Dispatch<SetStateAction<number | null>>]
type HelperState = [number, Dispatch<SetStateAction<number>>]

export const ActiveTabContext = createContext<ActiveTab>(['', () => { }]);
export const SelectValuesContext = createContext<SelectValues>([setInitial(Object.keys(_apiCostsMock)[0]), () => { }]);
export const TotalSumContext = createContext<SumState>([null, () => { }]);
export const HelperContext = createContext<HelperState>([-1, () => { }]);
export const WindowWidthContext = createContext<number>(0);
export const ScrollElementContext = createContext<MutableRefObject<HTMLDivElement | null> | null>(null);

export default function layout({ children }: Props) {

    const [selectValues, setSelectValues] = useState(setInitial(Object.keys(_apiCostsMock)[0])) as SelectValues;
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
        setSelectValues(setInitial(activeTab))
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
