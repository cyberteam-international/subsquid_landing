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

    const collocatedFreeCondition = () =>{
        const rangeFields = [
            selectValuesResources.find((el)=>el.fieldName=== 'rpsRequests'),
            selectValuesResources.find((el)=>el.fieldName=== 'postgresStorage'),
        ]
        return rangeFields.every((field)=>{
            if (field?.limit) {
                return Number(field.select) <= field?.limit
            }
        })
    } 


    useEffect(() => {
        let totalArray : Sum[] = []
        selectValuesResources.forEach((item, _index) => {
            if (collocatedFreeCondition()) {
                if (tabsState === 'COLLOCATED') {
                    totalArray.push(fieldPrice({...item, price: {...item.price, value: 0.0007}}, 0))
                }
                else{
                    totalArray.push(fieldPrice(item, item.price.value))
                }
            }
            else if (tabsState === 'COLLOCATED') {
                totalArray.push(fieldPrice({...item, price: {...item.price, value: 0.0007}}, 0.0007))
            }
            else {
                totalArray.push(fieldPrice(item, item.price.value))
            }
        })
        console.log('totalArray', totalArray)
        return setTotalSum([...totalArray])
    }, [selectValuesResources]);

    return [];
};