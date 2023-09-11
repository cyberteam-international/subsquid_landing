import PayBenefits from '@/components/PayBenefits/PayBenefits';

import style from './style.module.scss'

export default function CalculatorPage() {

    return (
        <main className={`main ${style['calculator']}`}>
			<div className="container">
				<div className="sections">
					<section className={style['calculator__header']}>
						<h1 className="calculator__title">Pricing that fits your <i>needs</i></h1>
						<p className={style['calculator__header__subtitle']}>
							Empowering your data access with flexible pricing.
						</p>
					</section>
					<PayBenefits />
				</div>
			</div>
		</main>
	)
}
