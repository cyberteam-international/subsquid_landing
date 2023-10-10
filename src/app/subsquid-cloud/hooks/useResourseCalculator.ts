import { useEffect } from 'react';
import { _apiCostsMock, IApiCostsRadio, IApiCostsState } from '@/_mock/apiCosts.mock';
import { NewProcessors, SelectValues } from '../context';

type Props = {
    selectUseCaseState: SelectValues,
    selectResourcesState: SelectValues,
    tabsProfileState: SelectValues,
    selectNewProcessors: NewProcessors
}

export const useResourseCalculator = ({ selectUseCaseState, selectResourcesState, tabsProfileState, selectNewProcessors }: Props) => {

    const [selectValuesUseCase, _setSelectValuesUseCase] = selectUseCaseState
    const [selectValuesResources, setSelectValuesResources] = selectResourcesState
    const [newProcessors, setNewProcessors] = selectNewProcessors
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
            const currentValue = () => {
                if (mockField?.type === 'radio') {
                    return mockField.values.find((el) => el.value === select)?.price.value ?? 0.0069
                }
                else {
                    if (Array.isArray(mockField.price.value)) {
                        if (tabsProfile[0].select === 'COLLOCATED') {
                            return mockField.price.value[0]
                        }
                        else {
                            return mockField.price.value[1]
                        }
                    }
                    else return mockField.price.value ?? 0.069
                }
            }
            return mockField?.type === 'radio'
                ? {
                    type: mockField.values.find((el) => el.value === select)?.price.type ?? 'h',
                    value: currentValue()
                }
                : {
                    type: mockField.price.type ?? 'h',
                    // value: mockField.price.value ?? 0.069
                    value: currentValue()
                };
        };

        const limit = () =>{
            if (mockField?.type === 'range' && mockField.limit) {
                return mockField.limit
            }
            else if (mockField.type === 'range-input' && mockField.limit) {
                return tabsProfile[0].select === 'COLLOCATED'? mockField.limit[0] : mockField.limit[1]
            }
        }

        return {
            ...returnSelectValuesResources[listIndex],
            select: select,
            price: price(),
            replicas: typeof selectValue === 'number' ? selectValue.toString() : returnSelectValuesResources[listIndex].replicas,
            limit: limit()
        };
    };

    const indexProcessorProfile = listIndex('Processor profile')
    const indexApiProfile = listIndex('API profile')
    const indexPostgresProfile = listIndex('Postgres profile')
    const indexPostgresStorage = listIndex('Postgres storage')
    const indexDataSize = listIndex('dataSize')
    const indexQueryComplexity = listIndex('queryComplexity')
    const indexNetworksCount = listIndex('networksCount')
    const indexApiReplicas = listIndex('API profile')
    const indexRequestsPerSecond = listIndex('requestsPerSecond')
    const indexRPCrequests = listIndex('RPC requests')

    const selectTabsProfile = tabsProfile[0].select

    const tabConditions = [
        {
            name: 'squidProfile',
            conditions: () => {
                if (selectTabsProfile === 'COLLOCATED') {
                    updateState(
                        currentInfo('Processor profile', 'default', indexProcessorProfile), indexProcessorProfile
                    );
                    updateState(
                        currentInfo('API profile', 'default', indexApiProfile), indexApiProfile
                    );
                    updateState(
                        currentInfo('Postgres profile', 'default', indexPostgresProfile), indexPostgresProfile
                    );
                    updateState(
                        currentInfo('Postgres storage', '10', indexPostgresStorage), indexPostgresStorage
                    );
                    updateState(
                        currentInfo('API profile', 1, indexApiReplicas), indexApiReplicas
                    );
                    updateState(
                        currentInfo('RPC requests', '0.5', indexRPCrequests), indexRPCrequests
                    );
                }
                else if (selectTabsProfile === 'DEDICATED') {
                    updateState(
                        currentInfo('RPC requests', '2', indexRPCrequests), indexRPCrequests
                    );
                }
            },
        },
        // {
        //     name: 'Processor profile',
        //     conditions: () => {
        //         const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
        //         const selectValueDataSize = selectValuesUseCase[indexDataSize].select
        //         if ((selectValueNetworksCount === 1 && selectValueDataSize === 'low') || (selectValueNetworksCount >= 2 && selectValueDataSize === 'medium')) {
        //             updateState(
        //                 currentInfo('Processor profile', 'small', indexProcessorProfile), indexProcessorProfile
        //             );
        //         }
        //         else if ((selectValueNetworksCount === 1 && selectValueDataSize === 'medium') || (selectValueNetworksCount >= 2 && selectValueDataSize === 'large')) {
        //             updateState(
        //                 currentInfo('Processor profile', 'medium', indexProcessorProfile), indexProcessorProfile
        //             );
        //         }
        //         else if (selectValueNetworksCount === 1 && selectValueDataSize === 'large') {
        //             updateState(
        //                 currentInfo('Processor profile', 'large', indexProcessorProfile), indexProcessorProfile
        //             );
        //         }
        //     }
        // },
        {
            name: 'New processors',
            conditions: () => {
                const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
                const newState: NewProcessors['0'] = {
                    render: [],
                    state: []
                }
                for (let index = 0; index < selectValueNetworksCount-1; index++) {
                    const renderItem: IApiCostsRadio = {
                        title: `Processor profile ${newState.state.length + 2}`,
                        name: `Processor profile ${newState.state.length + 2}`,
                        type: 'radio',
                        canActive: false,
                        values: [
                            {
                                title: 'Small',
                                value: 'small',
                                price: {
                                    type: "h",
                                    value: 0.04
                                },
                            },
                            {
                                title: 'Medium',
                                value: 'medium',
                                price: {
                                    type: "h",
                                    value: 0.08
                                },
                            },
                            {
                                title: 'Large',
                                value: 'large',
                                price: {
                                    type: "h",
                                    value: 0.15
                                },
                            }
                        ],
                        helper: {
                            title: `Processor profile ${newProcessors.render.length + 1}`,
                            description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                        }
                    }
                    const renderState = {
                        fieldName: `Processor profile ${newState.state.length + 2}`,
                        price: {
                            type: "h",
                            value: 0.04
                        },
                        select: 'small',
                    }
                    newState.render.push(renderItem)
                    newState.state.push(renderState)
                }
                setNewProcessors({...newState})
            }
        },
        {
            name: 'Processor profile',
            conditions: () => {
                // const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
                const selectValueDataSize = selectValuesUseCase[indexDataSize].select
                if (selectValueDataSize === 'small' || selectValueDataSize === 'not sure') {
                    updateState(
                        currentInfo('Processor profile', 'small', indexProcessorProfile), indexProcessorProfile
                    );
                }
                else if (selectValueDataSize === 'medium') {
                    updateState(
                        currentInfo('Processor profile', 'medium', indexProcessorProfile), indexProcessorProfile
                    );
                }
                else if (selectValueDataSize === 'large') {
                    updateState(
                        currentInfo('Processor profile', 'large', indexProcessorProfile), indexProcessorProfile
                    );
                }
            }
        },
        {
            name: 'API profile',
            conditions: () => {
                const selectValue = selectValuesUseCase[indexQueryComplexity].select
                if (selectValue === 'simple' || selectValue === 'not sure') {
                    updateState(
                        currentInfo('API profile', 'small', indexApiProfile), indexApiProfile
                    );
                }
                else if (selectValue === 'medium') {
                    updateState(
                        currentInfo('API profile', 'medium', indexApiProfile), indexApiProfile
                    );
                }
                else if (selectValue === 'complex') {
                    updateState(
                        currentInfo('API profile', 'large', indexApiProfile), indexApiProfile
                    );
                }
            }
        },
        {
            name: 'apiReplicas',
            conditions: () => {
                const selectValue = Number(selectValuesUseCase[indexRequestsPerSecond].select)
                // if (0 <= selectValue && selectValue <= 1) {
                //     updateState(
                //         currentInfo('API profile', 1, indexApiReplicas), indexApiReplicas
                //     );
                // }
                // else if (2 <= selectValue && selectValue <= 5) {
                //     updateState(
                //         currentInfo('API profile', 2, indexApiReplicas), indexApiReplicas
                //     );
                // }
                // else if (6 <= selectValue) {
                //     updateState(
                //         currentInfo('API profile', Math.floor(Math.log10(Math.floor(selectValue/720))), indexApiReplicas), indexApiReplicas
                //     );
                // }
                updateState(
                    currentInfo('API profile', Math.floor(Math.log10(Math.floor(selectValue/1420))), indexApiReplicas), indexApiReplicas
                );
            }
        },
        {
            name: 'Postgres profile',
            conditions: () => {
                const selectValueQueryComplexity = selectValuesUseCase[indexQueryComplexity].select
                const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
                if (selectValueQueryComplexity === 'simple' || selectValueQueryComplexity === 'not sure') {
                    updateState(
                        currentInfo('Postgres profile', 'small', indexPostgresProfile), indexPostgresProfile
                    );
                } else if ((selectValueNetworksCount >= 2 && selectValueNetworksCount <= 9) || selectValueQueryComplexity === 'medium') {
                    updateState(
                        currentInfo('Postgres profile', 'medium', indexPostgresProfile), indexPostgresProfile
                    );
                } else if (selectValueNetworksCount >= 10 || selectValueQueryComplexity === 'complex') {
                    updateState(
                        currentInfo('Postgres profile', 'large', indexPostgresProfile), indexPostgresProfile
                    );
                }
            }
        },
        {
            name: 'Postgres storage',
            conditions: () => {
                const selectValue = selectValuesUseCase[indexDataSize].select
                if (selectValue === 'small') {
                    updateState(
                        currentInfo('Postgres storage', '50', indexPostgresStorage), indexPostgresStorage
                    );
                }
                else if (selectValue === 'medium') {
                    updateState(
                        currentInfo('Postgres storage', '150', indexPostgresStorage), indexPostgresStorage
                    );
                }
                else if (selectValue === 'large') {
                    updateState(
                        currentInfo('Postgres storage', '500', indexPostgresStorage), indexPostgresStorage
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

    }, [selectValuesUseCase, tabsProfile]);

    return [];
};