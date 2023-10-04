import PayBenefitsItem from "./PayBenefitsItem"

import _payBenefitsMock from "@/_mock/payBenefits.mock"

import style from './PayBenefits.module.scss'

export default function PayBenefits() {

    const setItems = () => {
        return _payBenefitsMock.map((item, index)=> {
            return <PayBenefitsItem key={index} {...item} />
        })
    }

    return (
        <section className={style["pay-benefits"]}>
            <div className="">
                <h2 className="title">Pricing</h2>
                <p className={style["pay-benefits__subtitle"]}>Simple and transparent for projects and companies of all sizes</p>
            </div>
            <div className={style["pay-benefits__wrapper"]}>
                {setItems()}
            </div>
        </section>
    )
}
