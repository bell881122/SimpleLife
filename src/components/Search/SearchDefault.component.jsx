import React from 'react';

import GoodDataService from "services/good.service";
const CardList = React.lazy(() => import('components/Card/CardList.component.jsx'));

export default function SearchDefault() {
    const [goods, setGoods] = React.useState();

    React.useEffect(() => {
        GoodDataService.getAll(setGoods);
    }, []);

    return (
        <>
            <CardList
                goods={goods}
            />
        </>
    );
}