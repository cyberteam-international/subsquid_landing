import {useContext} from 'react'

import { TotalSumContext, ScrollElementContext } from '@/app/calculator/context';

import style from './EstimateCost.module.scss'

type Props = {};

export default function EstimateCost({ }: Props) {

    const [totalSum, _setTotalSum] = useContext(TotalSumContext);
    const totalBlockRef = useContext(ScrollElementContext)

    const scroll = () =>{
        if (totalBlockRef?.current) {
            return window.scrollTo({
                top: totalBlockRef?.current.getBoundingClientRect().top + window.scrollY - 52 - 16,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div 
            className={style["total"]} 
            onClick={()=>scroll()}
        >
            <p>Estimate cost:</p>
            <p>{totalSum? `${totalSum}$` : 'free'}</p>
        </div>
    )
}
