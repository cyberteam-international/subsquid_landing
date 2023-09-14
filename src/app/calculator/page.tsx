'use client'

import { useContext } from 'react';

import PayBenefits from '@/components/PayBenefits/PayBenefits';
import ApiCosts from '@/components/ApiCosts/ApiCosts';
import ScaleManifest from '@/components/ScaleManifest/ScaleManifest';
import EstimateCost from '@/components/EstimateCost/EstimateCost';

import { HelperContext, TotalSumContext, WindowWidthContext } from './layout';

import style from './style.module.scss'

export default function CalculatorPage() {

	const windowWidth = useContext(WindowWidthContext)
	const [totalSum, _setTotalSum] = useContext(TotalSumContext)
	const [helper, setHelper] = useContext(HelperContext)

	return (
		<main className={`main ${style['calculator']}`}>
			<div className="container">
				<section className={style['calculator__header']}>
					<h1 className="calculator__title">Pricing that fits your <i>needs</i></h1>
					<p className={style['calculator__header__subtitle']}>
						Empowering your data access with flexible pricing.
					</p>
				</section>
				<PayBenefits />
				<ApiCosts />
				<ScaleManifest />
				{(windowWidth < 768 && totalSum > 0) && (
					<EstimateCost />
				)}
				{(windowWidth < 768 && helper > 0) && (
					<EstimateCost />
				)}
			</div>
		</main>
	)
}
