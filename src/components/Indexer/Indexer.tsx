'use client'

import { useState } from 'react';

import style from './Indexer.module.scss'
import classNames from 'classnames';

type Props = {};

export default function Indexer({ }: Props) {

    const data = [
        {
            name: 'Indexing',
            image: '',
            without: {
                leftBlock: {
                    title: 'Subsquid Network',
                    image: ['']
                },
                center: {
                    title: 'Blazing fast up to 150k blocks/s',
                    image: ''
                }
            },
            with: {
                leftBlock: {
                    title: 'Indexer',
                    image: ['', '']
                },
                center: {
                    title: 'Days / Weeks',
                    image: ''
                },
                rightBlock: {
                    title: 'Indexer',
                    image: ['', '']
                }
            },
        }
    ]

    const [activeMode, setActiveMode] = useState<'Without' | 'With'>('With')

    return (
        <div className={style.indexer}>
            <div className={style.indexer__header}>
                <h2>Indexing that actually works</h2>
                <p className="subtitle">Guaranteed data availability for dApps. Low-cost and blazing-fast.</p>
            </div>
            <div className={classNames(style.indexer__radio, activeMode === 'Without'? style.indexer__radio_left : style.indexer__radio_right)}>
                <button 
                    className={classNames(style.indexer__radio__button, activeMode === 'Without' && style.indexer__radio__button_active)} 
                    onClick={()=>setActiveMode('Without')}
                >Without Subsquid</button>
                <button 
                    className={classNames(style.indexer__radio__button, activeMode === 'With' && style.indexer__radio__button_active)} 
                    onClick={()=>setActiveMode('With')}
                >With Subsquid</button>
            </div>
        </div>
    );
}
