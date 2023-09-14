import { IApiCostsRadio, IApiCostsState, IApiCostsValueObject } from "@/_mock/apiCosts.mock";

type Props = {
    updateState: ( item: IApiCostsState, index: number)=>void,
    field: IApiCostsRadio,
    className: string
    item: IApiCostsValueObject,
    index: number
};

export default function ApiCostsFieldRadio({item, index, updateState, field, className }: Props) {
    
    return(
        <button
            key={index}
            className={className}
            onClick={() => updateState({ fieldName: field.name, select: item.value, price: item.price }, index)}
        >
            {item.value}
        </button>
    )

}
