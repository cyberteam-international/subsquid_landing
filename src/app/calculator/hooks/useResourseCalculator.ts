import { useEffect } from 'react';
import _apiCostsMock, { IApiCostsState } from '@/_mock/apiCosts.mock';
import { SelectValues } from '../context';

type Props = {
    selectUseCaseState: SelectValues,
    selectResourcesState: SelectValues,
}

export const useResourseCalculator = ({ selectUseCaseState, selectResourcesState }: Props) => {

    const [selectValuesUseCase, setSelectValuesUseCase] = selectUseCaseState
    const [selectValuesResources, setSelectValuesResources] = selectResourcesState

    let returnSelectValuesResources = selectValuesResources

    const listIndex = (fieldName: string): number => {
        const selectValuesUseCaseIndex = selectValuesUseCase.findIndex((el) => el.fieldName === fieldName)
        const selectValuesResourcesIndex = selectValuesResources.findIndex((el) => el.fieldName === fieldName)
        if (selectValuesUseCaseIndex !== -1) {
            return selectValuesUseCaseIndex
        }
        else if (selectValuesResourcesIndex !== -1) {
            return selectValuesResourcesIndex
        }
        else {
            throw new Error('Check apiCosts.mock.tsx fields')
        }
    };

    const updateState = (item: IApiCostsState, listIndex: number) => {
        const updateObj = [...returnSelectValuesResources];
        updateObj[listIndex] = !item.replicas ? { ...item, replicas: selectValuesResources[listIndex].replicas } : item
        returnSelectValuesResources = [...updateObj]
    };

    const currentInfo = (fieldName: string, selectValue: string | number, listIndex: number): IApiCostsState => {
        const mockField = _apiCostsMock[`byResources`].fields.find((el) => el.name === fieldName);
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
            ...selectValuesResources[listIndex],
            select: typeof selectValue === 'string' ? selectValue : selectValuesResources[listIndex].select,
            price: price(),
            replicas: typeof selectValue === 'number' ? selectValue : selectValuesResources[listIndex].replicas ?? null
        };
    };

    // processorProfile = Processor profile
    // networksCount = How many networks to index
    // dataSize = How much data to index
    // apiProfile = API service
    // queryComplexity = Query Complexity
    // apiReplicas = API service (replicas)
    // requestsPerSecond = API requests, per sec
    // postgresStorage = Database size
    // postgresProfile = Database
    // ??? = RPC requests (2M included)

    const tabConditions = [
        {
            name: 'processorProfile',
            conditions: () => {
                const indexProcessorProfile = listIndex('processorProfile')
                const indexNetworksCount = listIndex('networksCount')
                const indexDataSize = listIndex('dataSize')
                const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
                const selectValueDataSize = selectValuesUseCase[indexDataSize].select
                if ((selectValueNetworksCount === 1 && selectValueDataSize === 'Low') || (selectValueNetworksCount >= 2 && selectValueDataSize === 'Medium')) {
                    updateState(
                        currentInfo('processorProfile', 'Small', indexProcessorProfile), indexProcessorProfile
                    );
                }
                else if ((selectValueNetworksCount === 1 && selectValueDataSize === 'Medium') || (selectValueNetworksCount >= 2 && selectValueDataSize === 'Large')) {
                    updateState(
                        currentInfo('processorProfile', 'Medium', indexProcessorProfile), indexProcessorProfile
                    );
                }
                else if (selectValueNetworksCount === 1 && selectValueDataSize === 'Large') {
                    updateState(
                        currentInfo('processorProfile', 'Large', indexProcessorProfile), indexProcessorProfile
                    );
                }
            }
        },
        {
            name: 'apiProfile',
            conditions: () => {
                const indexApiProfile = listIndex('apiProfile')
                const indexQueryComplexity = listIndex('queryComplexity')
                const selectValue = selectValuesUseCase[indexQueryComplexity].select
                if (selectValue === 'Simple' || selectValue === 'Not sure') {
                    updateState(
                        currentInfo('apiProfile', 'Small', indexApiProfile), indexApiProfile
                    );
                }
                else if (selectValue === 'Mid') {
                    updateState(
                        currentInfo('apiProfile', 'Medium', indexApiProfile), indexApiProfile
                    );
                }
                else if (selectValue === 'Complex') {
                    updateState(
                        currentInfo('apiProfile', 'Large', indexApiProfile), indexApiProfile
                    );
                }
            }
        },
        {
            name: 'apiReplicas',
            conditions: () => {
                const indexApiReplicas = listIndex('apiProfile')
                const indexRequestsPerSecond = listIndex('requestsPerSecond')
                const selectValue = Number(selectValuesUseCase[indexRequestsPerSecond].select)
                if (0 <= selectValue && selectValue <= 1) {
                    updateState(
                        currentInfo('apiProfile', 1, indexApiReplicas), indexApiReplicas
                    );
                }
                else if (2 <= selectValue && selectValue <= 5) {
                    updateState(
                        currentInfo('apiProfile', 2, indexApiReplicas), indexApiReplicas
                    );
                }
                else if (6 <= selectValue) {
                    updateState(
                        currentInfo('apiProfile', Math.round(Math.log10(selectValue)), indexApiReplicas), indexApiReplicas
                    );
                }
            }
        },
        {
            name: 'postgresProfile',
            conditions: () => {
                const indexPostgresProfile = listIndex('postgresProfile')
                const indexQueryComplexity = listIndex('queryComplexity')
                const indexNetworksCount = listIndex('networksCount')
                const selectValueQueryComplexity = selectValuesUseCase[indexQueryComplexity].select
                const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
                if (selectValueQueryComplexity === 'Simple' || selectValueQueryComplexity === 'Not sure') {
                    updateState(
                        currentInfo('postgresProfile', 'Small', indexPostgresProfile), indexPostgresProfile
                    );
                } else if ((selectValueNetworksCount >= 2 && selectValueNetworksCount <= 9) || selectValueQueryComplexity === 'Mid') {
                    updateState(
                        currentInfo('postgresProfile', 'Medium', indexPostgresProfile), indexPostgresProfile
                    );
                } else if (selectValueNetworksCount >= 10 || selectValueQueryComplexity === 'Complex') {
                    updateState(
                        currentInfo('postgresProfile', 'Large', indexPostgresProfile), indexPostgresProfile
                    );
                }
            }
        },
        {
            name: 'postgresStorage',
            conditions: () => {
                const indexPostgresStorage = listIndex('postgresStorage')
                const indexDataSize = listIndex('dataSize')
                const selectValue = selectValuesUseCase[indexDataSize].select
                if (selectValue === 'Low') {
                    updateState(
                        currentInfo('postgresStorage', '50', indexPostgresStorage), indexPostgresStorage
                    );
                }
                else if (selectValue === 'Medium') {
                    updateState(
                        currentInfo('postgresStorage', '150', indexPostgresStorage), indexPostgresStorage
                    );
                }
                else if (selectValue === 'Large') {
                    updateState(
                        currentInfo('postgresStorage', '500', indexPostgresStorage), indexPostgresStorage
                    );
                }
            }
        },
    ]

    useEffect(() => {

        tabConditions.forEach((item, _index) => {
            item.conditions()
        })
        return setSelectValuesResources([...returnSelectValuesResources])

    }, [selectValuesUseCase]);

    return [];
};