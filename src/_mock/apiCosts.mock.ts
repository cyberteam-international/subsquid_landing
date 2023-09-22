export interface IApiCostsState {
    fieldName: string;
    select: string;
    price: IApiCostsPrice;
    replicas?: string;
    limit?: number,
    isActive?: boolean
}

interface IApiCostsPrice {
    type: string,
    value: number
}

export interface IApiCostsValueObject {
    title: string,
    value: string,
    price: IApiCostsPrice,
}

interface IApiCostSample {
    title: string,
    name: string,
    canActive: boolean,
    helper?: {
        title: string,
        description: string,
    },
    warning?: string | string[],
    subtitle?: string,
    replicas?: string,
}

export interface IApiCostsRange extends IApiCostSample {
    type: 'range',
    label: string,
    price: IApiCostsPrice,
    prefix: string,
    range: number[],
    limit: number,
    step: number
}

export interface IApiCostsRadioInput extends IApiCostSample {
    type: 'radio-input',
    values: number[],
    price: IApiCostsPrice,
}

export interface IApiCostsRadio extends IApiCostSample {
    type: 'radio',
    values: IApiCostsValueObject[],
}

export interface IApiCostsTabs {
    title: string;
    name: string,
    fields: (IApiCostsRange | IApiCostsRadioInput | IApiCostsRadio)[],
}

export type IApiCosts = {
    profile: IApiCostsRadio,
    tabs: {
        byUseCase: IApiCostsTabs,
        byResources: IApiCostsTabs,
    };
}

export const _apiCostsMock: IApiCosts = {
    profile: {
        title: 'Squid profile',
        name: 'squidProfile',
        warning: ['Collocated squids are recommended only for development and prototyping', 'Dedicated VM resources for reliability in production.'],
        type: 'radio',
        canActive: false,
        values: [
            {
                title: 'Collocated',
                value: 'COLLOCATED',
                price: {
                    type: "h",
                    value: 0
                },
            },
            {
                title: 'Dedicated',
                value: 'DEDICATED',
                price: {
                    type: "h",
                    value: 0
                },
            },
        ],
    },
    tabs: {
        byUseCase: {
            title: 'By use-case',
            name: 'byUseCase',
            fields: [
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
                            title: 'Low',
                            value: 'LOW',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Medium',
                            value: 'MEDIUM',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Large',
                            value: 'LARGE',
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
                            title: 'Simple',
                            value: 'SIMPLE',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Mid',
                            value: 'MID',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Complex',
                            value: 'COMPLEX',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Not sure',
                            value: 'NOT_SURE',
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
            name: 'byResources',
            fields: [
                {
                    title: 'Processor profile',
                    name: 'processorProfile',
                    type: 'radio',
                    canActive: false,
                    values: [
                        {
                            title: 'Small',
                            value: 'SMALL',
                            price: {
                                type: "h",
                                value: 0.04
                            },
                        },
                        {
                            title: 'Medium',
                            value: 'MEDIUM',
                            price: {
                                type: "h",
                                value: 0.08
                            },
                        },
                        {
                            title: 'Large',
                            value: 'LARGE',
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
                    replicas: '1',
                    values: [
                        {
                            title: 'Small',
                            value: 'SMALL',
                            price: {
                                type: "h",
                                value: 0.04
                            },
                        },
                        {
                            title: 'Medium',
                            value: 'MEDIUM',
                            price: {
                                type: "h",
                                value: 0.08
                            },
                        },
                        {
                            title: 'Large',
                            value: 'LARGE',
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
                            title: 'Small',
                            value: 'SMALL',
                            price: {
                                type: "h",
                                value: 0.08,
                            },
                        },
                        {
                            title: 'Medium',
                            value: 'MEDIUM',
                            price: {
                                type: "h",
                                value: 0.16,
                            },
                        },
                        {
                            title: 'Large',
                            value: 'LARGE',
                            price: {
                                type: "h",
                                value: 0.33,
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
                    canActive: false,
                    label: 'RPC requests, M',
                    prefix: 'M',
                    price: {
                        type: "h",
                        value: 0.0028
                    },
                    range: [2, 500],
                    step: 1,
                    limit: 2,
                    helper: {
                        title: 'RPC requests',
                        description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                    }
                },
                {
                    title: 'Database size',
                    name: 'postgresStorage',
                    type: 'range',
                    canActive: false,
                    label: 'Storage, Gb',
                    prefix: 'GB',
                    price: {
                        type: "h",
                        value: 0.0007
                    },
                    range: [10, 5000],
                    step: 10,
                    limit: 10,
                    helper: {
                        title: 'Database size',
                        description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                    }
                },
            ]
        }
    },
}