// import { useContext } from 'react'
// import { ActiveTabContext, SelectValuesContext } from "@/app/calculator/context";
// import _apiCostsMock, { IApiCostsState } from '@/_mock/apiCosts.mock';

// const [selectValues, setSelectValues] = useContext(SelectValuesContext)
// const [activeTab, _setActiveTab] = useContext(ActiveTabContext);

// const updateState = (item: IApiCostsState, listIndex: number) => {
//     const updateObj = [...selectValues]
//     updateObj[listIndex] = updateObj[listIndex].replicas ? { ...item, replicas: updateObj[listIndex].replicas } : item
//     setSelectValues([...updateObj])
// }

// // const processorProfile_x = (networksCount, dataSize) => {
// //     if ((networksCount === 1 && dataSize === 'LOW') || (networksCount >= 2 && dataSize === 'MEDIUM')) {
// //         return 'SMALL';
// //     } else if ((networksCount === 1 && dataSize === 'MEDIUM') || (networksCount >= 2 && dataSize === 'LARGE')) {
// //         return 'MEDIUM';
// //     } else if (networksCount === 1 && dataSize === 'LARGE') {
// //         return 'LARGE';
// //     }
// // };

// // const apiProfile_x = (queryComplexity) => {
// //     if (queryComplexity === 'SIMPLE' || queryComplexity === 'NOT_SURE') {
// //         return 'SMALL';
// //     } else if (queryComplexity === 'MID') {
// //         return 'MEDIUM';
// //     } else if (queryComplexity === 'COMPLEX') {
// //         return 'LARGE';
// //     }
// // };

// const currentInfo = (fieldName: string, selectValue: string, listIndex: number): IApiCostsState => {
//     const mockField = _apiCostsMock[`${activeTab}`].fields.find((el) => el.name === fieldName)
//     if (!mockField) {
//         throw new Error('fieldName in _apiCostsMock not found. Add fieldName in _apiCostsMock or use corrrect fieldName')
//     }
//     const price = (): IApiCostsState["price"] => {
//         return mockField?.type === 'radio'
//             ? {
//                 type: mockField.values.find((el) => el.value === selectValue)?.price.type ?? '',
//                 value: mockField.values.find((el) => el.value === selectValue)?.price.value ?? 0
//             }
//             : {
//                 type: mockField.price.type ?? '',
//                 value: mockField.price.value ?? 0
//             };
//     }
//     return {
//         ...selectValues[listIndex],
//         select: selectValue,
//         price: price(),
//         replicas: selectValues[listIndex].replicas?? null
//     }

// }

// export const apiProfile_x = () => {
//     const listIndex = (fieldName: string):number => selectValues.findIndex((el)=>el.fieldName == 'queryComplexity')
//     if (selectValues[listIndex('queryComplexity')].select === 'Simple' || selectValues[listIndex('queryComplexity')].select === 'Small') {
//         updateState(
//             currentInfo('queryComplexity', selectValues[listIndex('queryComplexity')].select === 'Simple' ? 'Simple' : 'Small', listIndex('queryComplexity')), 
//             listIndex('queryComplexity')
//         )
//         updateState(
//             currentInfo('apiProfile', 'Small', listIndex('apiProfile')),
//             listIndex('apiProfile')
//         )
//     } else if (selectValues[listIndex('queryComplexity')].select === 'Mid') {
//         updateState(
//             currentInfo('queryComplexity', 'Mid', listIndex('queryComplexity')), 
//             listIndex('queryComplexity')
//         )
//         updateState(
//             currentInfo('apiProfile', 'Medium', listIndex('apiProfile')),
//             listIndex('apiProfile')
//         )
//     } else if (selectValues[listIndex('queryComplexity')].select === 'Complex') {
//         updateState(
//             currentInfo('queryComplexity', 'Complex', listIndex('queryComplexity')), 
//             listIndex('queryComplexity')
//         )
//         updateState(
//             currentInfo('apiProfile', 'Large', listIndex('apiProfile')),
//             listIndex('apiProfile')
//         )
//     }
// };

// // const apiReplicas = (requestsPerSecond) => {
// //     if (requestsPerSecond >= 0 && requestsPerSecond <= 1) {
// //         return 1;
// //     } else if (requestsPerSecond >= 2 && requestsPerSecond <= 5) {
// //         return 2;
// //     } else if (requestsPerSecond >= 6) {
// //         return 2 + Math.round(Math.log10(requestsPerSecond));
// //     }
// // };

// // const postgresProfile = (queryComplexity, networksCount) => {
// //     if (queryComplexity === 'SIMPLE' || queryComplexity === 'NOT_SURE') {
// //         return 'SMALL';
// //     } else if (queryComplexity === 'MID' || (networksCount >= 2 && networksCount <= 9)) {
// //         return 'MEDIUM';
// //     } else if (queryComplexity === 'COMPLEX' || networksCount >= 10) {
// //         return 'LARGE';
// //     }
// // };

// // const postgresStorage = (dataSize) => {
// //     if (dataSize === 'LOW') {
// //         return 50;
// //     } else if (dataSize === 'MEDIUM') {
// //         return 150;
// //     } else if (dataSize === 'LARGE') {
// //         return 500;
// //     }
// // };

// // const x = [
// //     {
// //         fields: ['']
// //     }
// // ]

import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import _apiCostsMock, { IApiCostsState } from '@/_mock/apiCosts.mock';

type Props = {
    selectState: [IApiCostsState[], Dispatch<SetStateAction<IApiCostsState[]>>],
    activeTab: string,
}

export const useResourseCalculator = ({selectState, activeTab}: Props) => {
    
    const [selectValues, setSelectValues] = selectState

    useEffect(() => {
        // Функция, которая будет выполняться при изменении selectValues
        const updateState = (item: IApiCostsState, listIndex: number) => {
            const updateObj = [...selectValues];
            updateObj[listIndex] = updateObj[listIndex].replicas ? { ...item, replicas: updateObj[listIndex].replicas } : item;
            setSelectValues([...updateObj]);
        };

        const currentInfo = (fieldName: string, selectValue: string, listIndex: number): IApiCostsState => {
            console.log('props', fieldName, selectValue, listIndex)
            const mockField = _apiCostsMock[`${activeTab}`].fields.find((el) => el.name === fieldName);
            if (!mockField) {
                throw new Error('fieldName in _apiCostsMock not found. Add fieldName in _apiCostsMock or use correct fieldName');
            }
            const price = (): IApiCostsState["price"] => {
                return mockField?.type === 'radio'
                    ? {
                        type: mockField.values.find((el) => el.value === selectValue)?.price.type ?? '',
                        value: mockField.values.find((el) => el.value === selectValue)?.price.value ?? 0
                    }
                    : {
                        type: mockField.price.type ?? '',
                        value: mockField.price.value ?? 0
                    };
            };
            return {
                ...selectValues[listIndex],
                select: selectValue,
                price: price(),
                replicas: selectValues[listIndex].replicas ?? null
            };
        };

        const listIndex = (fieldName: string): number => selectValues.findIndex((el) => el.fieldName === fieldName);

        const apiProfile_x = () => {
            if (selectValues[listIndex('queryComplexity')].select === 'Simple' || selectValues[listIndex('queryComplexity')].select === 'Small') {
                updateState(
                    currentInfo('queryComplexity', selectValues[listIndex('queryComplexity')].select === 'Simple' ? 'Simple' : 'Small', listIndex('queryComplexity')),
                    listIndex('queryComplexity')
                );
                updateState(
                    currentInfo('apiProfile', 'Small', listIndex('apiProfile')),
                    listIndex('apiProfile')
                );
            } else if (selectValues[listIndex('queryComplexity')].select === 'Mid') {
                updateState(
                    currentInfo('queryComplexity', 'Mid', listIndex('queryComplexity')),
                    listIndex('queryComplexity')
                );
                updateState(
                    currentInfo('apiProfile', 'Medium', listIndex('apiProfile')),
                    listIndex('apiProfile')
                );
            } else if (selectValues[listIndex('queryComplexity')].select === 'Complex') {
                updateState(
                    currentInfo('queryComplexity', 'Complex', listIndex('queryComplexity')),
                    listIndex('queryComplexity')
                );
                updateState(
                    currentInfo('apiProfile', 'Large', listIndex('apiProfile')),
                    listIndex('apiProfile')
                );
            }
        };

        // Вызов функции apiProfile_x при изменении selectValues
        apiProfile_x();
    }, [selectValues]);

    // Возвращаем пустой массив, так как хук useEffect не требует очистки
    return [];
};