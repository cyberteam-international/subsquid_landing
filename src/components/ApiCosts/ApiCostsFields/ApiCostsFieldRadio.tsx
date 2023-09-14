import { AllowedFieldsNames, IApiCostsRadio, IApiCostsState, IApiCostsValueObject } from "@/_mock/apiCosts.mock";

type Props = {
    updateState: (fieldName: AllowedFieldsNames, item: IApiCostsState | null, index: number)=>void,
    field: IApiCostsRadio,
    setClassName: (key: number) => string
    item: IApiCostsValueObject,
    index: number
};

export default function ApiCostsFieldRadio({item, index, updateState, field, setClassName }: Props) {
    
    return(
        <button
            key={index}
            className={setClassName(index)}
            onClick={() => updateState(field.name, { fieldName: field.name, select: item.value, price: item.price }, index)}
        >
            {item.value}
        </button>
    )

}
