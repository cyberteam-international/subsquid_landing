'use client'

import { useContext } from 'react';

import ApiCostsField from './ApiCostsField';
import ApiCostsResult from './ApiCostsResult';

import { ActiveTabContext } from '@/app/calculator/layout';

import _apiCostsMock from '@/_mock/apiCosts.mock'

import style from './ApiCosts.module.scss'

export default function ApiCosts() {

    const [activeTab, setActiveTab] = useContext(ActiveTabContext);

    const setTabNames = () => {
        const objKeys = Object.keys(_apiCostsMock)
        return objKeys.map((_item, index) => {
            return (
                <button
                    className={
                        activeTab === objKeys[index] ?
                            `${style["api-costs__tabs-item"]} ${style["api-costs__tabs-item_active"]}`
                            : style["api-costs__tabs-item"]
                    }
                    key={index}
                    onClick={() => setActiveTab(objKeys[index])}
                >
                    {_apiCostsMock[objKeys[index]].title}
                </button>
            );
        });
    }

    const setTabFields = () => {
        return _apiCostsMock[activeTab].fields.map((item, index) => {
            return (
                <ApiCostsField key={index} field={item} listIndex={index} />
            )
        })
    }

    return (
        <section className={style["api-costs"]}>
            <h2 className="title_api-costs">Estimate indexing and API costs</h2>
            <div className={style["api-costs__tabs"]}>
                {setTabNames()}
            </div>
            <div className={style["api-costs__list"]}>
                {setTabFields()}
                <ApiCostsResult />
            </div>
        </section>
    )
}
