'use client'

import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { useWindowWidth } from '@react-hook/window-size';
import { FadeInUp } from '../Animation';

import { indexerData, IIndexerDataRightBlock, IIndexerDataLeftBlock } from '@/_mock/indexer.mock';

import background_with from '@/../../public/diagrams/background_with.svg'
import background_without from '@/../../public/diagrams/background_without.svg'
import background_with_mobile from '@/../../public/diagrams/background_with_mobile.svg'
import background_without_mobile from '@/../../public/diagrams/background_without_mobile.svg'

import style from './Indexer.module.scss'

type Props = {};

type PropsBlock = {
    Indexing: ReactNode[]
    decentralizedAnalytics: ReactNode[]
    dataAvailability: ReactNode[]
}

export default function Indexer({ }: Props) {

    const [activeMode, setActiveMode] = useState<'Without' | 'With'>('With')
    const [activeTab, setActiveTab] = useState<number>(0)

    const windowWidth = useWindowWidth()

    const setHeader = () => {
        const title = activeMode === 'With' ? indexerData.header[activeTab].with.title : indexerData.header[activeTab].without.title
        const subtitle = activeMode === 'With' ? indexerData.header[activeTab].with.subtitle : indexerData.header[activeTab].without.subtitle

        return (
            <>
                <h2>{title}</h2>
                <p className="subtitle">{subtitle}</p>
            </>
        )
    }

    const setTabs = () => {
        return indexerData.diagrams.map((item, index) => {
            return (
                <div key={index} className={classNames(style.indexer__tabs__item, activeTab === index && style.indexer__tabs__item_active)} onClick={() => setActiveTab(index)}>
                    <p>{item.name}</p>
                    <div className={style.indexer__tabs__item__images}>
                        <Image {...item.images[0]} alt={item.name} />
                        <Image {...item.images[1]} alt={item.name} />
                    </div>
                </div>
            )
        })
    }

    const setRigthBlock = (rightItem: IIndexerDataRightBlock) => {
        const setItems = () => {
            return rightItem.items?.map((target, key) =>
                <div className={style.indexer__block__inner__item} key={key}>
                    <div className={style.indexer__block__inner__item_img}>
                        <Image key={key} {...target.image} alt={target.title} />
                    </div>
                    <p>{target.title}</p>
                </div>
            )
        }
        return (
            <>
                <p className={style.indexer__block__inner__header}>{rightItem.title}</p>
                {rightItem.items && (
                    <div className={style.indexer__block__inner__items}>
                        {setItems()}
                    </div>
                )}
                {rightItem.image && (
                    <div className={style.indexer__block__inner__image}><Image {...rightItem.image} alt={rightItem.title} /></div>
                )}
            </>
        )
    }

    const setLeftBlock = (leftItem: IIndexerDataLeftBlock) => {
        const setImages = () => {
            return leftItem.images?.map((target, key) =>
                <div className={style.indexer__block__inner__images_item}>
                    <Image key={key} {...target} alt={leftItem.title} />
                </div>
            )
        }
        return (
            <>
                <p className={style.indexer__block__inner__header}>{leftItem.title}</p>
                {leftItem.images && (
                    <div className={style.indexer__block__inner__images}>{setImages()}</div>
                )}
                {leftItem.image && (
                    <>
                        {leftItem.image.type === 'logo' && (
                            <div className={classNames(style.indexer__block__inner__image)}><Image {...leftItem.image} alt={leftItem.title} /></div>
                        )}
                        {leftItem.image.type === 'img' && (
                            <Image {...leftItem.image} alt={leftItem.title} />
                        )}
                    </>
                )}
            </>
        )
    }

    const setBlock = () => {
        return indexerData.diagrams.map((item, index) => {
            return (
                <div key={index} className={style.indexer__block__inner}>
                    <div className={style.indexer__block__inner__wrapper} style={{ left: `-${(activeMode === 'With' ? 0 : 1) * 100}%` }}>
                        <div className={style.indexer__block__inner__with}>
                            <div className={style.indexer__block__inner__left}>
                                {setLeftBlock(item.with.leftBlock)}
                            </div>
                            <div className={style.indexer__block__inner__center}>
                                {windowWidth < 767.999 ? (
                                    <Image {...background_with_mobile} className={style.indexer__block__inner__center_arrow} alt={item.with.center.title} />
                                ) : (
                                    <Image {...background_with} className={style.indexer__block__inner__center_arrow} alt={item.with.center.title} />
                                )}
                                <Image {...item.with.center.image} alt={item.with.center.title} />
                                <p>{item.with.center.title}</p>
                            </div>
                            <div className={style.indexer__block__inner__right}>
                                {setRigthBlock(item.with.rightBlock)}
                            </div>
                        </div>
                        <div className={style.indexer__block__inner__without}>
                            <div className={style.indexer__block__inner__left}>
                                {setLeftBlock(item.without.leftBlock)}
                            </div>
                            <div className={style.indexer__block__inner__center}>
                                {windowWidth < 767.999 ? (
                                    <Image {...background_without_mobile} className={style.indexer__block__inner__center_arrow} alt={item.with.center.title} />
                                ) : (
                                    <Image {...background_without} className={style.indexer__block__inner__center_arrow} alt={item.with.center.title} />
                                )}
                                <Image {...item.without.center.image} alt={item.without.center.title} />
                                <p>{item.without.center.title}</p>
                            </div>
                            <div className={classNames(style.indexer__block__inner__right, !item.without.rightBlock.items && !item.without.rightBlock.image && style.indexer__block__inner__right_center)}>
                                {setRigthBlock(item.without.rightBlock)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <FadeInUp delay={600}>
            <div className={style.indexer}>
                <div className={style.indexer__header}>
                    {setHeader()}
                </div>
                <div className={classNames(style.indexer__radio, activeMode === 'Without' ? style.indexer__radio_left : style.indexer__radio_right)}>
                    <button
                        className={classNames(style.indexer__radio__button, activeMode === 'Without' && style.indexer__radio__button_active)}
                        onClick={() => setActiveMode('Without')}
                    >Without Subsquid</button>
                    <button
                        className={classNames(style.indexer__radio__button, activeMode === 'With' && style.indexer__radio__button_active)}
                        onClick={() => setActiveMode('With')}
                    >With Subsquid</button>
                </div>
                <div className={style.indexer__wrapper}>
                    <div className={style.indexer__tabs}>{setTabs()}</div>
                    <div className={style.indexer__block}>
                        <div className={style.indexer__block__wrapper} style={{ left: `-${(activeTab) * 100}%` }}>{setBlock()}</div>
                    </div>
                </div>
            </div>
        </FadeInUp>
    );
}
