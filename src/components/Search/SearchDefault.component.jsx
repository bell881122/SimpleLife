import React from 'react';

import Box from '@material-ui/core/Box';

import GoodDataService from "services/good.service";
const CardList = React.lazy(() => import('components/Card/CardList.component.jsx'));

export default function SearchDefault() {
    const [allPublishedGoods, setAllPublishedGoods] = React.useState();
    const [allFreeGoods, setAllFreeGoods] = React.useState();

    React.useEffect(() => {
        GoodDataService.query([{ key: "published", operation: "==", condition: true }], ["registerTimestamp", "desc"], setAllPublishedGoods);
        GoodDataService.query([{ key: "published", operation: "==", condition: true }, { key: "price", operation: "==", condition: 0 }], ["registerTimestamp", "desc"], setAllFreeGoods);
    }, []);

    return (
        <Box py={5}>
            {allFreeGoods &&
                <Box>
                    <CardList
                        title="免費結緣"
                        goods={allFreeGoods}
                    />
                </Box>
            }
            {allPublishedGoods &&
                <Box mt={10}>
                    <CardList
                        title="最新物品"
                        goods={allPublishedGoods}
                    />
                </Box>
            }
        </Box>
    );
}