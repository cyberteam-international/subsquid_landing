export interface IApiCostsState {
    fieldName: string;
    select: string | null;
    price: IApiCostsPrice;
    replicas?: number | null;
}

interface IApiCostsPrice {
    type: string,
    value: number
}

export interface IApiCostsValueObject {
    value: string;
    price: IApiCostsPrice;
}

interface IApiCostSample {
    title: string,
    name: string,
    canActive: boolean,
    helper: {
        title: string,
        description: string,
    },
    warning?: string,
    subtitle?: string,
    replicas?: boolean
}

export interface IApiCostsRange extends IApiCostSample {
    type: 'range',
    label: string,
    price: IApiCostsPrice,
    prefix: string,
    range: number[],
    step: number
}

export interface IApiCostsRadioInput extends IApiCostSample {
    type: 'radio-input',
    values: number[],
    price: IApiCostsPrice,
}

// export interface IApiCostsRadioReplicas extends IApiCostSample {
//     type: 'radio-replicas',
//     values: IApiCostsValueObject[],
// }

export interface IApiCostsRadio extends IApiCostSample {
    type: 'radio',
    values: IApiCostsValueObject[],
}

export interface IApiCostsTabs {
    title: string;
    fields: IApiCostsRange[] | IApiCostsRadioInput[] | IApiCostsRadio[],
}

export type IApiCosts = {
    [key: string]: IApiCostsTabs;
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
                            type: "h",
                            value: 0 
                        },
                    },
                    {
                        value: 'Dedicated',
                        price: {
                            type: "h",
                            value: 0
                        },
                    },
                ],
            },
            {
                title: 'How many networks to index',
                name: 'networksCount',
                type: 'radio-input',
                canActive: false,
                price: {
                    type: "h",
                    value: 0 
                },
                values: [1, 2, 3, 4],
                helper: {
                    title: 'How many networks to index',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'How much data to index',
                name: 'dataSize',
                type: 'radio',
                canActive: false,
                values: [
                    {
                        value: 'Low',
                        price: {
                            type: "h",
                            value: 0 
                        },
                    },
                    {
                        value: 'Medium',
                        price: {
                            type: "h",
                            value: 0 
                        },
                    },
                    {
                        value: 'Large',
                        price: {
                            type: "h",
                            value: 0 
                        },
                    },
                ],
                helper: {
                    title: 'How much data to index',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'API requests, per sec',
                name: 'requestsPerSecond',
                type: 'radio-input',
                canActive: false,
                price: {
                    type: "h",
                    value: 0 
                },
                values: [1, 2, 3, 4],
                helper: {
                    title: 'API requests',
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
                            type: "h",
                            value: 0 
                        },
                    },
                    {
                        value: 'Mid',
                        price: {
                            type: "h",
                            value: 0 
                        },
                    },
                    {
                        value: 'Complex',
                        price: {
                            type: "h",
                            value: 0 
                        },
                    },
                    {
                        value: 'Not sure',
                        price: {
                            type: "h",
                            value: 0 
                        },
                    },
                ],
                helper: {
                    title: 'Query Complexity',
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
                            type: "h",
                            value: 0 
                        },
                    },
                    {
                        value: 'Dedicated',
                        price: {
                            type: "h",
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
                        value: 'Small',
                        price: {
                            type: "h",
                            value: 0.04 
                        },
                    },
                    {
                        value: 'Medium',
                        price: {
                            type: "h",
                            value: 0.08 
                        },
                    },
                    {
                        value: 'Large',
                        price: {
                            type: "h",
                            value: 0.15 
                        },
                    }
                ],
                helper: {
                    title: 'Processor profile',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'API service',
                name: 'apiProfile',
                type: 'radio',
                canActive: true,
                replicas: true,
                values: [
                    {
                        value: 'Small',
                        price: {
                            type: "h",
                            value: 0.04 
                        },
                    },
                    {
                        value: 'Medium',
                        price: {
                            type: "h",
                            value: 0.08 
                        },
                    },
                    {
                        value: 'Large',
                        price: {
                            type: "h",
                            value: 0.15 
                        },
                    }
                ],
                helper: {
                    title: 'API service',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'Database',
                name: 'postgresProfile',
                subtitle: 'Postgres profile',
                type: 'radio',
                canActive: true,
                values: [
                    {
                        value: 'Small',
                        price: {
                            type: "h",
                            value: 0.08 
                        },
                    },
                    {
                        value: 'Medium',
                        price: {
                            type: "h",
                            value: 0.16 
                        },
                    },
                    {
                        value: 'Large',
                        price: {
                            type: "h",
                            value: 0.33 
                        },
                    }
                ],
                helper: {
                    title: 'Database',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'RPC requests (2M included)',
                name: 'rpsRequests',
                type: 'range',
                canActive: true,
                label: 'RPC requests, M',
                prefix: 'M',
                price: {
                    type: "h",
                    value: 0.0028 
                },
                range: [2, 500],
                step: 1,
                helper: {
                    title: 'RPC requests',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
            {
                title: 'Database size',
                name: 'postgresStorage',
                type: 'range',
                canActive: true,
                label: 'Storage, Gb',
                prefix: 'GB',
                price: {
                    type: "h",
                    value: 0.0007 
                },
                range: [10, 5000],
                step: 10,
                helper: {
                    title: 'Database size',
                    description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                }
            },
        ]
    }
} as IApiCosts