import { StaticImageData } from "next/image"

import point_1 from '@/../public/diagrams/point_1.svg'
import point_1_disable from '@/../public/diagrams/point_1_disable.svg'
import point_2 from '@/../public/diagrams/point_2.svg'
import point_2_disable from '@/../public/diagrams/point_2_disable.svg'
import point_3 from '@/../public/diagrams/point_3.svg'
import point_3_disable from '@/../public/diagrams/point_3_disable.svg'

import img_1_left_without from '@/../public/diagrams/img_1_left_without.svg'
import img_2_left_without from '@/../public/diagrams/img_2_left_without.svg'
import img_1_right_without from '@/../public/diagrams/img_1_right_without.png'
import img_2_right_without from '@/../public/diagrams/img_2_right_without.png'
import img_1_left_with from '@/../public/diagrams/img_1_left_with.png'
import img_1_center_without from '@/../public/diagrams/img_1_center_without.png'
import img_1_center_with from '@/../public/diagrams/img_1_center_with.png'
import img_1_right_with from '@/../public/diagrams/img_1_right_with.png'
import img_2_right_with from '@/../public/diagrams/img_2_right_with.png'
import img_3_right_with from '@/../public/diagrams/img_3_right_with.png'

import img_1_1_left_with from '@/../public/diagrams/img_1_1_left_with.png'
import img_1_1_center_with from '@/../public/diagrams/img_1_1_center_with.png'
import img_1_1_right_with from '@/../public/diagrams/img_1_1_right_with.png'
import img_1_2_right_with from '@/../public/diagrams/img_1_2_right_with.png'
import img_1_3_right_with from '@/../public/diagrams/img_1_3_right_with.png'
import img_1_4_right_with from '@/../public/diagrams/img_1_4_right_with.png'
import img_1_1_left_without from '@/../public/diagrams/img_1_1_left_without.png'
import img_1_2_left_without from '@/../public/diagrams/img_1_2_left_without.png'
import img_1_1_center_without from '@/../public/diagrams/img_1_1_center_without.png'
import img_1_1_right_without from '@/../public/diagrams/img_1_1_right_without.png'
import img_1_2_right_without from '@/../public/diagrams/img_1_2_right_without.png'
import img_1_3_right_without from '@/../public/diagrams/img_1_3_right_without.png'
import img_1_4_right_without from '@/../public/diagrams/img_1_4_right_without.png'

import img_2_1_left_with from '@/../public/diagrams/img_2_1_left_with.svg'
import img_2_1_center_with from '@/../public/diagrams/img_2_1_center_with.png'
import img_2_1_right_with from '@/../public/diagrams/img_2_1_right_with.png'
import img_2_1_left_without from '@/../public/diagrams/img_2_1_left_without.svg'
import img_2_1_center_without from '@/../public/diagrams/img_2_1_center_without.png'


export interface IIndexerDataLeftBlock{
    title: string,
    images?: StaticImageData[],
    image?: {
        src: StaticImageData,
        type: 'logo' | 'img'
    }
}

interface IIndexerDataCenterBlock{
    title: string,
    image: StaticImageData
}

export interface IIndexerDataRightBlock{
    title: string,
    items?: {
        title: string,
        image: StaticImageData
    }[],
    image?: StaticImageData
}

export type IIndexerTabName = 'Indexing' | 'Decentralized Analytics' | 'Data Availability'

export interface IIndexerData{
    header: {
        without:{
            title: string,
            subtitle: string
        },
        with: {
            title: string,
            subtitle: string
        },
    }[],
    diagrams: {
        name: IIndexerTabName,
        images: StaticImageData[],
        without: {
            leftBlock: IIndexerDataLeftBlock,
            center: IIndexerDataCenterBlock,
            rightBlock: IIndexerDataRightBlock
        },
        with: {
            leftBlock: IIndexerDataLeftBlock,
            center: IIndexerDataCenterBlock,
            rightBlock: IIndexerDataRightBlock
        },
    }[]
}

export const indexerData: IIndexerData = {
    header: [
        {
            without:{
                title: 'Indexing without Subsquid',
                subtitle: 'Slow, unreliable and expensive dApp development.'
            },
            with: {
                title: 'Indexing that actually works',
                subtitle: 'Guaranteed data availability for dApps. Low-cost and blazing-fast.'
            },
        },
        {
            without:{
                title: 'Analytics without Subsquid',
                subtitle: 'Gatekeeping. Expensive. Limited network support.'
            },
            with: {
                title: 'Decentralized Analytics',
                subtitle: 'Open. Community-owned. Extremely cost-efficient.'
            },
        },
        {
            without:{
                title: 'Data Availability without Subsquid',
                subtitle: 'With EIP-4844 the historical data is pruned after a few weeks.'
            },
            with: {
                title: 'Guaranteed Data Availability',
                subtitle: 'Query any amount of historical data up to the genesis block with Subsquid. '
            },
        },
    ],
    diagrams: [
        {
            name: 'Indexing',
            images: [point_1, point_1_disable],
            without: {
                leftBlock: {
                    title: 'Indexer',
                    images: [
                        img_1_left_without,
                        img_2_left_without
                    ]
                },
                center: {
                    title: 'Days / Weeks',
                    image: img_1_center_without
                },
                rightBlock: {
                    title: 'Indexer',
                    items: [
                        {
                            title: 'Subgraph SDK',
                            image: img_1_right_without
                        },
                        {
                            title: 'DipDup SDK',
                            image: img_2_right_without
                        },
                    ]
                }
            },
            with: {
                leftBlock: {
                    title: 'Subsquid Network',
                    image: {
                        type: 'logo',
                        src: img_1_left_with
                    }
                },
                center: {
                    title: 'Blazing fast up to\n150k blocks/s',
                    image: img_1_center_with
                },
                rightBlock: {
                    title: 'Indexer',
                    items: [
                        {
                            title: 'Squid SDK',
                            image: img_1_right_with
                        },
                        {
                            title: 'Subgraph SDK',
                            image: img_2_right_with
                        },
                        {
                            title: 'DipDup SDK',
                            image: img_3_right_with
                        },
                    ]
                }
            },
        },
        {
            name: 'Decentralized Analytics',
            images: [point_2, point_2_disable],
            without: {
                leftBlock: {
                    title: 'Centralized Service',
                    images: [
                        img_1_1_left_without,
                        img_1_2_left_without
                    ]
                },
                center: {
                    title: 'Closed\nGatekeeped',
                    image: img_1_1_center_without
                },
                rightBlock: {
                    title: 'Analytics',
                    items: [
                        {
                            title: 'CSV',
                            image: img_1_1_right_without
                        },
                        {
                            title: 'BigQuery',
                            image: img_1_2_right_without
                        },
                        {
                            title: 'Athena',
                            image: img_1_3_right_without
                        },
                        {
                            title: 'SQL',
                            image: img_1_4_right_without
                        },
                    ]
                }
            },
            with: {
                leftBlock: {
                    title: 'Subsquid Network',
                    image: {
                        type: 'logo',
                        src: img_1_1_left_with
                    }
                },
                center: {
                    title: 'Permissionless\n& Open',
                    image: img_1_1_center_with
                },
                rightBlock: {
                    title: 'Analytics',
                    items: [
                        {
                            title: 'CSV',
                            image: img_1_1_right_with
                        },
                        {
                            title: 'BigQuery',
                            image: img_1_2_right_with
                        },
                        {
                            title: 'Athena',
                            image: img_1_3_right_with
                        },
                        {
                            title: 'SQL',
                            image: img_1_4_right_with
                        },
                    ]
                }
            },
        },
        {
            name: 'Data Availability',
            images: [point_3, point_3_disable],
            without: {
                leftBlock: {
                    title: 'Blockchain',
                    image: {
                        src: img_2_1_left_without,
                        type: "img"
                    }
                },
                center: {
                    title: 'No historical data',
                    image: img_2_1_center_without
                },
                rightBlock: {
                    title: 'No solution',
                }
            },
            with: {
                leftBlock: {
                    title: 'Blockchain',
                    image: {
                        src: img_2_1_left_with,
                        type: 'img'
                    }
                },
                center: {
                    title: 'All historical data',
                    image: img_2_1_center_with
                },
                rightBlock: {
                    title: 'Subsquid Network',
                    image: img_2_1_right_with
                }
            },
        }
    ]
}