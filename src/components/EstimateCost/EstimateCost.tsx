import { useContext } from 'react'

import { TotalSumContext, ScrollElementContext } from '@/app/pricing/context';

import style from './EstimateCost.module.scss'

export default function EstimateCost() {

    const [totalSum, _setTotalSum] = useContext(TotalSumContext);
    const totalBlockRef = useContext(ScrollElementContext)

    const currentTotalPrice = () => {
        let sum = 0
        totalSum.forEach((item, _index) => {
            sum += item.currentPrice
        })
        return sum
    }

    const scroll = () => {
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
            onClick={() => scroll()}
        >
            <p>Estimate cost:</p>
            <p>{currentTotalPrice() > 0 ? `$${(currentTotalPrice() * 720).toFixed(2)}/mo` : 'free'}</p>
        </div>

    )
}
