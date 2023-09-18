import { IApiCostsRadio, IApiCostsState, IApiCostsValueObject } from "@/_mock/apiCosts.mock";

type Props = {
    updateState: ( item: IApiCostsState)=>void,
    field: IApiCostsRadio,
    className: string
    item: IApiCostsValueObject,
};

export default function ApiCostsFieldRadio({item, updateState, field, className }: Props) {
    
    return(
        <button
            className={className}
            onClick={() => updateState({ fieldName: field.name, select: item.value, price: item.price })}
        >
            {item.value}
        </button>
    )

}
