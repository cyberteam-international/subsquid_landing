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
            {setItems()}
        </section>
    )
}
