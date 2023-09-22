import { useEffect } from 'react';
import { _apiCostsMock, IApiCostsState } from '@/_mock/apiCosts.mock';
import { SelectValues } from '../context';

type Props = {
    selectUseCaseState: SelectValues,
    selectResourcesState: SelectValues,
    tabsProfileState: SelectValues,
}

export const useResourseCalculator = ({ selectUseCaseState, selectResourcesState, tabsProfileState }: Props) => {

    const [selectValuesUseCase, _setSelectValuesUseCase] = selectUseCaseState
    const [selectValuesResources, setSelectValuesResources] = selectResourcesState
    const [tabsProfile, _setTabsProfile] = tabsProfileState

    let returnSelectValuesResources = selectValuesResources

    const listIndex = (fieldName: string): number => {
        const selectValuesUseCaseIndex = selectValuesUseCase.findIndex((el) => el.fieldName === fieldName)
        const selectValuesResourcesIndex = returnSelectValuesResources.findIndex((el) => el.fieldName === fieldName)
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
        updateObj[listIndex] = !item.replicas ? { ...item, replicas: returnSelectValuesResources[listIndex].replicas } : item
        returnSelectValuesResources = [...updateObj]
    };

    const currentInfo = (fieldName: string, selectValue: string | number, listIndex: number): IApiCostsState => {
        const mockField = _apiCostsMock.tabs.byResources.fields.find((el) => el.name === fieldName);
        if (!mockField) {
            throw new Error('fieldName in _apiCostsMock not found. Add fieldName in _apiCostsMock or use correct fieldName');
        }
        const select = typeof selectValue === 'string' ? selectValue : returnSelectValuesResources[listIndex].select
        const price = (): IApiCostsState["price"] => {
            return mockField?.type === 'radio'
                ? {
                    type: mockField.values.find((el) => el.value === select)?.price.type ?? 'h',
                    value: mockField.values.find((el) => el.value === select)?.price.value ?? 0
                }
                : {
                    type: mockField.price.type ?? '',
                    value: mockField.price.value ?? 0
                };
        };
        return {
            ...returnSelectValuesResources[listIndex],
            select: select,
            price: price(),
            replicas: typeof selectValue === 'number' ? selectValue.toString() : returnSelectValuesResources[listIndex].replicas
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
    // squidProfile = Squid profile
    // ??? = RPC requests (2M included)

    // const indexSquidProfileUseCase = selectValuesUseCase.findIndex((el) => el.fieldName === 'squidProfile')
    // const indexSquidProfileResources = returnSelectValuesResources.findIndex((el) => el.fieldName === 'squidProfile')
    const indexProcessorProfile = listIndex('processorProfile')
    const indexApiProfile = listIndex('apiProfile')
    const indexPostgresProfile = listIndex('postgresProfile')
    const indexPostgresStorage = listIndex('postgresStorage')
    const indexDataSize = listIndex('dataSize')
    const indexQueryComplexity = listIndex('queryComplexity')
    const indexNetworksCount = listIndex('networksCount')
    const indexApiReplicas = listIndex('apiProfile')
    const indexRequestsPerSecond = listIndex('requestsPerSecond')

    const selectTabsProfile = tabsProfile[0].select

    // const selectValueUseCase = selectValuesUseCase[indexSquidProfileUseCase].select
    // const selectValueResources = selectValuesResources[indexSquidProfileResources].select

    const tabConditions = [
        {
            name: 'squidProfile',
            conditions: () => {
                if (selectTabsProfile === 'COLLOCATED'){
                    updateState(
                        currentInfo('processorProfile', 'DEFAULT', indexProcessorProfile), indexProcessorProfile
                    );
                    updateState(
                        currentInfo('apiProfile', 'DEFAULT', indexApiProfile), indexApiProfile
                    );
                    updateState(
                        currentInfo('postgresProfile', 'DEFAULT', indexPostgresProfile), indexPostgresProfile
                    );
                    updateState(
                        currentInfo('postgresStorage', '10', indexPostgresStorage), indexPostgresStorage
                    );
                    updateState(
                        currentInfo('apiProfile', 1, indexApiReplicas), indexApiReplicas
                    );
                }
            },
        },
        {
            name: 'processorProfile',
            conditions: () => {
                const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
                const selectValueDataSize = selectValuesUseCase[indexDataSize].select
                if ((selectValueNetworksCount === 1 && selectValueDataSize === 'LOW') || (selectValueNetworksCount >= 2 && selectValueDataSize === 'MEDIUM')) {
                    updateState(
                        currentInfo('processorProfile', 'SMALL', indexProcessorProfile), indexProcessorProfile
                    );
                }
                else if ((selectValueNetworksCount === 1 && selectValueDataSize === 'MEDIUM') || (selectValueNetworksCount >= 2 && selectValueDataSize === 'LARGE')) {
                    updateState(
                        currentInfo('processorProfile', 'MEDIUM', indexProcessorProfile), indexProcessorProfile
                    );
                }
                else if (selectValueNetworksCount === 1 && selectValueDataSize === 'LARGE') {
                    updateState(
                        currentInfo('processorProfile', 'LARGE', indexProcessorProfile), indexProcessorProfile
                    );
                }
            }
        },
        {
            name: 'apiProfile',
            conditions: () => {
                const selectValue = selectValuesUseCase[indexQueryComplexity].select
                if (selectValue === 'SIMPLE' || selectValue === 'NOT_SURE') {
                    updateState(
                        currentInfo('apiProfile', 'SMALL', indexApiProfile), indexApiProfile
                    );
                }
                else if (selectValue === 'MID') {
                    updateState(
                        currentInfo('apiProfile', 'MEDIUM', indexApiProfile), indexApiProfile
                    );
                }
                else if (selectValue === 'COMPLEX') {
                    updateState(
                        currentInfo('apiProfile', 'LARGE', indexApiProfile), indexApiProfile
                    );
                }
            }
        },
        {
            name: 'apiReplicas',
            conditions: () => {
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
                        currentInfo('apiProfile', 2 + Math.round(Math.log10(selectValue)), indexApiReplicas), indexApiReplicas
                    );
                }
            }
        },
        {
            name: 'postgresProfile',
            conditions: () => {
                const selectValueQueryComplexity = selectValuesUseCase[indexQueryComplexity].select
                const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
                if (selectValueQueryComplexity === 'SIMPLE' || selectValueQueryComplexity === 'NOT_SURE') {
                    updateState(
                        currentInfo('postgresProfile', 'SMALL', indexPostgresProfile), indexPostgresProfile
                    );
                } else if ((selectValueNetworksCount >= 2 && selectValueNetworksCount <= 9) || selectValueQueryComplexity === 'MID') {
                    updateState(
                        currentInfo('postgresProfile', 'MEDIUM', indexPostgresProfile), indexPostgresProfile
                    );
                } else if (selectValueNetworksCount >= 10 || selectValueQueryComplexity === 'COMPLEX') {
                    updateState(
                        currentInfo('postgresProfile', 'LARGE', indexPostgresProfile), indexPostgresProfile
                    );
                }
            }
        },
        {
            name: 'postgresStorage',
            conditions: () => {
                const selectValue = selectValuesUseCase[indexDataSize].select
                if (selectValue === 'LOW') {
                    updateState(
                        currentInfo('postgresStorage', '50', indexPostgresStorage), indexPostgresStorage
                    );
                }
                else if (selectValue === 'MEDIUM') {
                    updateState(
                        currentInfo('postgresStorage', '150', indexPostgresStorage), indexPostgresStorage
                    );
                }
                else if (selectValue === 'LARGE') {
                    updateState(
                        currentInfo('postgresStorage', '500', indexPostgresStorage), indexPostgresStorage
                    );
                }
            }
        },
    ]

    useEffect(() => {

        tabConditions.forEach((item, _index) => {
            if (item.name === 'squidProfile' || selectTabsProfile === 'DEDICATED') {
                item.conditions()
            }
        })
        return setSelectValuesResources([...returnSelectValuesResources])

    }, [selectValuesUseCase, tabsProfile, ]);

    return [];
};