import { IApiCostsRadioInput, IApiCostsState } from "@/_mock/apiCosts.mock";

import style from '../ApiCosts.module.scss'

type Props = {
    updateState: ( item: IApiCostsState)=>void,
    field: IApiCostsRadioInput,
    setClassName: (key: number) => string,
    value: string
};

export default function ApiCostsFieldRadioInput({updateState, field, setClassName, value }: Props) {

    const updateObj = (item: number | string): IApiCostsState => {
        return {
            price: {
                type: field.price.type,
                value: field.price.value
            },
            fieldName: field.name, 
            select: item.toString(),
        }
    }

    const setItems = field.values.map((item, index) => {

        return (
            <button
                key={index}
                className={setClassName(index)}
                onClick={() => updateState(updateObj(item))}
            >
                {item}
            </button>

        );
    });
    
    return(
        <>
            <div className={style["api-costs__list-item__fields-wrapper"]}>
                {setItems}
            </div>
            <input
                type="number"
                min={1}
                placeholder='Your value'
                value={value}
                onChange={(e) => updateState(updateObj(e.target.value))}
            />
        </>
    )

}