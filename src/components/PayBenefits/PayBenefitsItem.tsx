import { IPayBenefit } from "./PayBenefits";

import style from './PayBenefits.module.scss'

export default function PayBenefitsItem({ title, subtitle, items, buttonText, description }: IPayBenefit) {

    const setItems = () => {
        return items.map((item, index) => {
            return (
                <li key={index} className={style["pay-benefits__item__list-item"]}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_718_41027)">
                            <path d="M10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20Z" fill="#2B2B2B" />
                            <path d="M5.47461 10.6446L8.06062 13.2307L14.5257 6.76562" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_718_41027">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p>{item}</p>
                </li>
            )
        })
    }

    return (
        <div className={style["pay-benefits__item"]}>
            <h3 className="title">{title}</h3>
            {subtitle && (
                <p className={style["pay-benefits__item__subtitle"]}>{subtitle}</p>
            )}
            <p className={style["pay-benefits__item__description"]}>{description}</p>
            <ul className={style["pay-benefits__item__list"]}>
                {setItems()}
            </ul>
            <button className={style["pay-benefits__item__button"]}>{buttonText}</button>
        </div>
    )
}
