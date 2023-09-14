export interface IApiCostsState {
    fieldName: AllowedFieldsNames;
    select: string;
    price: IApiCostsPrice;
}

interface IApiCostsPrice {
    type: 'hr',
    value: number
}

export interface IApiCostsValueObject {
    value: string;
    price: IApiCostsPrice;
}

interface IApiCostSample {
    title: string,
    name: AllowedFieldsNames,
    canActive: boolean,
    helper: {
        title: string,
        description: string,
    },
    warning?: string,
    subtitle?: string,
}

export interface IApiCostsRange extends IApiCostSample {
    type: 'range',
    label: string,
    price: IApiCostsPrice,
    prefix: string,
    range: number[]
}

export interface IApiCostsRadioInput extends IApiCostSample {
    type: 'radio-input',
    values: number[],
    price: IApiCostsPrice,
}

export interface IApiCostsRadioReplicas extends IApiCostSample {
    type: 'radio-replicas',
    values: IApiCostsValueObject[],
}

export interface IApiCostsRadio extends IApiCostSample {
    type: 'radio',
    values: IApiCostsValueObject[],
}

export interface IApiCostsTabs {
    title: string;
    fields: IApiCostsRange[] | IApiCostsRadioInput[] | IApiCostsRadio[] | IApiCostsRadioReplicas[];
}

export type IApiCosts = {
    [key: string]: IApiCostsTabs;
}

//fieldName
export enum AllowedFieldsNames {
    'squidProfile' = 'squidProfile',
    'networks' = 'networks',
    'dataIndex' = 'dataIndex',
    'apiRequests' = 'apiRequests',
    'queryComplexity' = 'queryComplexity',
    'processorProfile' = 'processorProfile',
    'apiService' = 'apiService',
    'dataBase' = 'dataBase',
    'rpsRequests' = 'rpsRequests',
    'databaseSize' = 'databaseSize'
}

export default {
    byUseCase: {
        title: 'By use-case',
        fields: [
            {
                title: 'Squid profile',
                name: 'squidProfile',
                warning: 'Collocated squids are recommended only for development and prototyping',
                type: 'radio',
                canActive: false,
                values: [
                    {
                        value: 'Collocated',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: 'Dedicated',
                        price: {
                            type: "hr",
                            value: 0
                        },
                    },
                ],
            },
            {
                title: 'How many networks to index',
                name: 'networks',
                type: 'radio-input',
                canActive: false,
                price: {
                    type: "hr",
                    value: 0 
                },
                values: [1, 2, 3, 4],
                helper: {
                    title: '',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'How much data to index',
                name: 'dataIndex',
                type: 'radio',
                canActive: false,
                values: [
                    {
                        value: 'Low',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: 'Mid',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: 'High',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: 'Not sure',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                ],
                helper: {
                    title: '',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'API requests, per sec',
                name: 'apiRequests',
                type: 'radio',
                canActive: false,
                values: [
                    {
                        value: '0-5',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: '5-100',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: '100-1000',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: '100-1000',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                ],
                helper: {
                    title: '',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'Query Complexity',
                name: 'queryComplexity',
                type: 'radio',
                canActive: false,
                values: [
                    {
                        value: 'Simple',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: 'Mid',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: 'Complex',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: 'Not sure',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                ],
                helper: {
                    title: '',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
        ]
    },
    byResources: {
        title: 'By resources',
        fields: [
            {
                title: 'Squid profile',
                name: 'squidProfile',
                warning: 'Collocated squids are recommended only for development and prototyping',
                type: 'radio',
                canActive: false,
                values: [
                    {
                        value: 'Collocated',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                    {
                        value: 'Dedicated',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                ],
            },
            {
                title: 'Processor profile',
                name: 'processorProfile',
                type: 'radio',
                canActive: true,
                values: [
                    {
                        value: 'Default',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    }
                ],
                helper: {
                    title: '',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'API service',
                name: 'apiService',
                type: 'radio-replicas',
                canActive: true,
                values: [
                    {
                        value: 'Default',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                ],
                helper: {
                    title: '',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'Database',
                name: 'dataBase',
                subtitle: 'Postgres profile',
                type: 'radio',
                canActive: true,
                values: [
                    {
                        value: 'Default',
                        price: {
                            type: "hr",
                            value: 0 
                        },
                    },
                ],
                helper: {
                    title: '',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'RPC requests',
                name: 'rpsRequests',
                type: 'range',
                canActive: true,
                label: 'RPC requests, M',
                prefix: 'M',
                price: {
                    type: "hr",
                    value: 0 
                },
                range: [0.5, 10],
                helper: {
                    title: '',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'Database size',
                name: 'databaseSize',
                type: 'range',
                canActive: true,
                label: 'Storage, Gb',
                prefix: 'GB',
                price: {
                    type: "hr",
                    value: 0 
                },
                range: [5, 30],
                helper: {
                    title: '',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
        ]
    }
} as IApiCosts