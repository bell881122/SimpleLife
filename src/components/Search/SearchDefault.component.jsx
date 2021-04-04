import React from 'react';

import GoodDataService from "services/good.service";
const CardList = React.lazy(() => import('components/Card/CardList.component.jsx'));

export default function SearchDefault() {
    const [goods, setGoods] = React.useState();

    React.useEffect(() => {
        GoodDataService.query("published", "==", true, ["registerTimestamp", "desc"], setGoods);
    }, []);

    return (
        <>
            <CardList
                goods={goods}
            />
        </>
    );
}