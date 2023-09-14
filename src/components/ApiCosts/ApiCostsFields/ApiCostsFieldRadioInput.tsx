import { AllowedFieldsNames, IApiCostsRadioInput, IApiCostsState } from "@/_mock/apiCosts.mock";

import style from '../ApiCosts.module.scss'

type Props = {
    updateState: (fieldName: AllowedFieldsNames, item: IApiCostsState | null, index: number)=>void,
    field: IApiCostsRadioInput,
    setClassName: (key: number) => string
};

export default function ApiCostsFieldRadioInput({updateState, field, setClassName }: Props) {

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
                onClick={() => updateState(field.name, updateObj(item), index)}
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
                onChange={(e) => updateState(field.name, updateObj(e.target.value), -1)}
            />
        </>
    )

}