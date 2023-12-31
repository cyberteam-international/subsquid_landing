'use client'

import { ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import { useWindowWidth } from '@react-hook/window-size';
import { FadeInUp } from '../Animation';

import { indexerData, IIndexerDataRightBlock, IIndexerDataLeftBlock } from '@/_mock/indexer.mock';

const background_with = 'diagrams/background_with.svg'
const background_without = 'diagrams/background_without.svg'
const background_with_mobile = 'diagrams/background_with_mobile.svg'
const background_without_mobile = 'diagrams/background_without_mobile.svg'

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

    const [scrollValue, setScrollValue] = useState<number>(0)

    const blockRef = useRef<HTMLDivElement>(null)

    const windowWidth = useWindowWidth()

    const setHeader = () => {
        const title = activeMode === 'With' ? indexerData.header[activeTab].with.title : indexerData.header[activeTab].without.title
        const subtitle = activeMode === 'With' ? indexerData.header[activeTab].with.subtitle : indexerData.header[activeTab].without.subtitle

        return (
            <>
                <h2>{title}</h2>
                <p className={classNames('subtitle', style.indexer__header__subtitle)}>{subtitle}</p>
            </>
        )
    }

    const setTabs = () => {
        return indexerData.diagrams.map((item, index) => {
            return (
                <div key={index} className={classNames(style.indexer__tabs__item, activeTab === index && style.indexer__tabs__item_active)} onClick={() => setActiveTab(index)}>
                    <p>{item.name}</p>
                    <div className={style.indexer__tabs__item__images}>
                        <img src={item.images[0]} alt={item.name} />
                        <img src={item.images[1]} alt={item.name} />
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
                        <img key={key} src={target.image} alt={target.title} />
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
                    <div className={style.indexer__block__inner__image}><img src={rightItem.image} alt={rightItem.title} /></div>
                )}
            </>
        )
    }

    const setLeftBlock = (leftItem: IIndexerDataLeftBlock) => {
        const setImages = () => {
            return leftItem.images?.map((target, key) =>
                <div className={style.indexer__block__inner__images_item}>
                    <img key={key} src={target} alt={leftItem.title} />
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
                            <div className={classNames(style.indexer__block__inner__image)}><img src={leftItem.image.src} alt={leftItem.title} /></div>
                        )}
                        {leftItem.image.type === 'img' && (
                            <img src={leftItem.image.src} alt={leftItem.title} />
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
                    <div className={style.indexer__block__inner__wrapper} style={{ transform: `translate(-${(activeMode === 'With' ? 0 : 1) * 100}%)` }}>
                        <div className={style.indexer__block__inner__with}>
                            <div className={style.indexer__block__inner__left}>
                                {setLeftBlock(item.with.leftBlock)}
                            </div>
                            <div className={style.indexer__block__inner__center}>
                                {windowWidth < 767.999 ? (
                                    <img src={background_with_mobile} className={style.indexer__block__inner__center_arrow} alt={item.with.center.title} />
                                ) : (
                                    <img src={background_with} className={style.indexer__block__inner__center_arrow} alt={item.with.center.title} />
                                )}
                                <div className={style.indexer__block__inner__center__wrapper}>
                                    <img src={item.with.center.image} alt={item.with.center.title} />
                                    <p>{item.with.center.title}</p>
                                </div>
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
                                    <img src={background_without_mobile} className={style.indexer__block__inner__center_arrow} alt={item.with.center.title} />
                                ) : (
                                    <img src={background_without} className={style.indexer__block__inner__center_arrow} alt={item.with.center.title} />
                                )}
                                <div className={style.indexer__block__inner__center__wrapper}>
                                    <img src={item.without.center.image} alt={item.without.center.title} />
                                    <p>{item.without.center.title}</p>
                                </div>
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

    let startX: number,
        startY: number,
        endX: number,
        endY: number;

    let swipePosition: 'left' | 'right'

    const touchStartEvent = (e: React.TouchEvent<HTMLDivElement>) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }

    const touchMoveEvent = (e: React.TouchEvent<HTMLDivElement>) => {
        // if (blockRef.current) {
        //     const blockPositionX: number = blockRef.current.getBoundingClientRect().x;
        //     console.log(e.touches[0].clientX, blockPositionX);
        //     console.log(e.touches[0].clientX - blockPositionX);
        //     // return (blockRef.current.firstElementChild as HTMLElement).style.transform = `translate(-${e.touches[0].clientX > blockPositionX? e.touches[0].clientX - blockPositionX : blockPositionX - e.touches[0].clientX }px)`
        //     (blockRef.current.firstElementChild as HTMLElement).style.transform = `translate(-${blockPositionX - e.touches[0].clientX}px)`
        // }
    }

    const touchEndEvent = (e: React.TouchEvent<HTMLDivElement>) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                swipePosition = 'right'
            } else {
                swipePosition = 'left'
            }
        }
        if (swipePosition === 'left' || swipePosition === 'right') {
            // console.log(`Пройденное расстояние: ${distance}`);
            if (blockRef.current && blockRef.current.getBoundingClientRect().width / 3 < distance) {
                // console.log(`Пройдено больше чем ширина блока`);
                if (swipePosition === 'right') {
                    if (activeTab !== 0 ) {
                        // setScrollValue(0)
                        return setActiveTab((prev) => prev - 1)
                    }
                } else if (swipePosition === 'left') {
                    if (activeTab < indexerData.diagrams.length && activeTab + 1 < indexerData.diagrams.length) {
                        // setScrollValue(0)
                        return setActiveTab((prev) => prev + 1)
                    }
                }
            }
        }
        // setScrollValue(0)
    }

    return (
        <FadeInUp delay={600}>
            <div className={style.indexer}>
                <div className={classNames(style.indexer__container, 'container')}>
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
                        <div className={style.indexer__block} ref={blockRef} onTouchStart={touchStartEvent} onTouchMove={touchMoveEvent} onTouchEnd={touchEndEvent}>
                            {/* <div className={style.indexer__block__wrapper} style={{ left: `-${(activeTab) * 100}%` }}>{setBlock()}</div> */}
                            <div className={style.indexer__block__wrapper} style={{ transform: `translate(-${(activeTab) * 100}%)` }}>{setBlock()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeInUp>
    );
}