import { useEffect } from 'react';
import { IApiCostsState } from '@/_mock/apiCosts.mock';
import { SelectValues, SumState, Sum } from '../context';

type Props = {
    selectValuesResources: SelectValues['0'],
    tabsState: string,
    setTotalSum: SumState[1]
}

export const useTotalCalculator = ({ selectValuesResources, tabsState, setTotalSum }: Props) => {

    const fieldPrice = (item: IApiCostsState, newPrice: number): Sum => {
        let price = 0;
        let currentPrice = 0
        if (item.replicas) {
            if (Number(item.select)) {
                price = Number(item.select) * item.price.value * Number(item.replicas);
                currentPrice = Number(item.select) * newPrice * Number(item.replicas);
            } else {
                price = item.price.value * Number(item.replicas);
                currentPrice = newPrice * Number(item.replicas);
            }
        } else {
            if (Number(item.select)) {
                price = Number(item.select) * item.price.value;
                currentPrice = Number(item.select) * newPrice;
            } else {
                price = item.price.value;
                currentPrice = newPrice;
            }
        }
        return {
            fieldName: item.fieldName,
            price: price,
            currentPrice: currentPrice,
        };
    };

    const rangeFields = [
        selectValuesResources.find((el)=>el.fieldName=== 'rpsRequests'),
        selectValuesResources.find((el)=>el.fieldName=== 'postgresStorage'),
    ]

    const collocatedFreeRangeCondition = () =>{
        return rangeFields.every((field)=>{
            return Number(field?.select) <= Number(field?.limit) || !field?.isActive
        })
    }


    useEffect(() => {
        let totalArray : Sum[] = []
        selectValuesResources.forEach((item, _index) => {
            if (collocatedFreeRangeCondition() && tabsState === 'COLLOCATED') {
                totalArray.push(fieldPrice({...item, price: {...item.price, value: 0.0007}}, 0))
            }
            else if (tabsState === 'COLLOCATED') {
                if (!item.isActive) {
                    totalArray.push(fieldPrice(item, 0))
                }
                else totalArray.push(fieldPrice({...item, price: {...item.price, value: 0.0007}}, 0.0007))
            }
            else {
                if (item.isActive !== undefined && !item.isActive) {
                    totalArray.push(fieldPrice(item, 0))
                }
                else {
                    totalArray.push(fieldPrice(item, item.price.value))
                }
            }
        })
        return setTotalSum(totalArray)
    }, [selectValuesResources, tabsState]);

    return [];
};