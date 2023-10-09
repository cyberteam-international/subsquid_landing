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

export interface IApiCostsRangeInput extends IApiCostSample {
    type: 'range-input',
    label: string,
    price: IApiCostsPrice,
    prefix: string,
    range: number[][],
    limit: number[],
    step: number[],
    title: string[]
}

export interface IApiCostsRange extends IApiCostSample {
    title: string,
    type: 'range',
    label: string,
    price: IApiCostsPrice,
    prefix: string,
    range: number[],
    limit?: number,
    step: number
}

export interface IApiCostsRadioInput extends IApiCostSample {
    title: string,
    type: 'radio-input',
    values: number[],
    price: IApiCostsPrice,
    limit?: number
}

export interface IApiCostsRadio extends IApiCostSample {
    title: string,
    type: 'radio',
    values: IApiCostsValueObject[],
}

export interface IApiCostsTabs {
    title: string;
    name: string,
    fields: (IApiCostsRange | IApiCostsRadioInput | IApiCostsRadio | IApiCostsRangeInput)[],
}

export type IApiCosts = {
    profile: IApiCostsRadio[],
    tabs: {
        byUseCase: IApiCostsTabs,
        byResources: IApiCostsTabs,
    };
}

export const _apiCostsMock: IApiCosts = {
    profile: [
        {
            title: 'Squid profile',
            name: 'squidProfile',
            warning: ['For development environment you can use collocated squids profile.', 'Dedicated VM resources for reliability in production.'],
            type: 'radio',
            canActive: false,
            values: [
                {
                    title: 'Development',
                    value: 'COLLOCATED',
                    price: {
                        type: "h",
                        value: 0
                    },
                },
                {
                    title: 'Production',
                    value: 'DEDICATED',
                    price: {
                        type: "h",
                        value: 0
                    },
                },
            ],
        },
        {
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
        }
    ],
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
                    limit: 10,
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
                            value: 'low',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Medium',
                            value: 'medium',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Large',
                            value: 'large',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Not sure',
                            value: 'not sure',
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
                    title: 'API requests, per month',
                    name: 'requestsPerSecond',
                    type: 'range',
                    label: 'API requests, per month',
                    prefix: '/month',
                    canActive: false,
                    price: {
                        type: "h",
                        value: 0
                    },
                    range: [100000, 10000000],
                    step: 10,
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
                            value: 'simple',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Mid',
                            value: 'mid',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Complex',
                            value: 'complex',
                            price: {
                                type: "h",
                                value: 0
                            },
                        },
                        {
                            title: 'Not sure',
                            value: 'not sure',
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
                    name: 'Processor profile',
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
                        title: 'Processor profile',
                        description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                    }
                },
                {
                    title: 'API service',
                    name: 'API profile',
                    type: 'radio',
                    canActive: true,
                    replicas: '1',
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
                        title: 'API service',
                        description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                    }
                },
                {
                    title: 'Database',
                    name: 'Postgres profile',
                    subtitle: 'Postgres profile',
                    type: 'radio',
                    canActive: true,
                    values: [
                        {
                            title: 'Small',
                            value: 'small',
                            price: {
                                type: "h",
                                value: 0.08,
                            },
                        },
                        {
                            title: 'Medium',
                            value: 'medium',
                            price: {
                                type: "h",
                                value: 0.16,
                            },
                        },
                        {
                            title: 'Large',
                            value: 'large',
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
                    title: ['RPC requests', 'RPC requests (2M included)'],
                    name: 'RPC requests',
                    type: 'range-input',
                    canActive: false,
                    label: 'RPC requests, M',
                    prefix: 'M',
                    price: {
                        type: "h",
                        value: 0.0028
                    },
                    range: [[0.5, 500], [2, 500]],
                    step: [0.5, 1],
                    limit: [0.5, 2],
                    helper: {
                        title: 'RPC requests',
                        description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                    }
                },
                {
                    title: ['Database size', 'Database size'],
                    name: 'Postgres storage',
                    type: 'range-input',
                    canActive: false,
                    label: 'Storage, Gb',
                    prefix: 'GB',
                    price: {
                        type: "h",
                        value: 0.0007
                    },
                    range: [[1, 5000], [1, 5000]],
                    step: [10, 10],
                    limit: [1, -1],
                    helper: {
                        title: 'Database size',
                        description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                    }
                },
            ]
        }
    },
}