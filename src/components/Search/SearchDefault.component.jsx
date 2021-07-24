import React from 'react';

import Box from '@material-ui/core/Box';

import GoodDataService from "services/good.service";
const CardSlider = React.lazy(() => import('components/Card/CardSlider.component.jsx'));
const CardList = React.lazy(() => import('components/Card/CardList.component.jsx'));
const SearchInput = React.lazy(() => import('components/Search/SearchInput.component.jsx'));

export default function SearchDefault() {
    const [allPublishedGoods, setAllPublishedGoods] = React.useState();
    const [allFreeGoods, setAllFreeGoods] = React.useState();

    React.useEffect(() => {
        GoodDataService.query({
            where: [{ key: "published", operation: "==", condition: true }],
            orderby: ["registerTimestamp", "desc"],
            limit: 48
        }, setAllPublishedGoods);
        GoodDataService.query({
            where: [{ key: "published", operation: "==", condition: true }, { key: "price", operation: "==", condition: 0 }],
            orderby: ["registerTimestamp", "desc"],
            limit: 12
        }, setAllFreeGoods);
    }, []);

    return (
        <Box pt={3} pb={8}>
            <SearchInput />
            {allFreeGoods &&
                <Box mt={5}>
                    <CardSlider
                        title="免費結緣"
                        goods={allFreeGoods}
                    />
                </Box>
            }
            {allPublishedGoods &&
                <Box mt={8}>
                    <CardList
                        title="最新物品"
                        goods={allPublishedGoods}
                    />
                </Box>
            }
        </Box>
    );
}