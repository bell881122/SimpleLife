import React from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';

import Box from '@material-ui/core/Box';

import GoodDataService from "services/good.service";
const SearchInput = React.lazy(() => import('components/Search/SearchInput.component.jsx'));
const CardList = React.lazy(() => import('components/Card/CardList.component.jsx'));

export default function Search() {
    const { kw } = useParams();
    const searchString = kw;
    const [allPublishedGoods, setAllPublishedGoods] = React.useState();
    const [searchGoods, setSearchGoods] = React.useState();

    React.useEffect(() => {
        let data = localStorage.getItem('SimpleLifeGoods');

        if (data === null) {
            setData();
        } else {
            let expireTime = JSON.parse(data)['expireTime'];
            let now = moment(Date.now()).toDate();
            let compare = moment(now, 'h:mma').isBefore(expireTime, 'h:mma');
            if (compare) {
                getData();
            } else {
                setData();
            }
        }

        function setData() {
            if (!allPublishedGoods) {
                GoodDataService.query([{ key: "published", operation: "==", condition: true }], ["registerTimestamp", "desc"], setAllPublishedGoods);
            } else {
                let allGoods = {};
                allPublishedGoods.forEach(good => {
                    const arr1 = good.title.split(" ");
                    const arr2 = good.tags;
                    const keywords = arr1.concat(arr2);
                    allGoods[good.id] = keywords;
                });

                let expireTime = moment(Date.now()).add(5, 'm').toDate();
                localStorage.setItem('SimpleLifeGoods', JSON.stringify({
                    'expireTime': expireTime,
                    'allGoods': allGoods
                }));

                getData();
            }
        }

        function getData() {
            let cacheData = JSON.parse(localStorage.getItem('SimpleLifeGoods'))['allGoods'];
            let searchKwArr = searchString.split(" ");
            let goodIds = Object.keys(cacheData).filter(key => searchKwArr.every(skr => cacheData[key].some(kw => kw.indexOf(skr) > -1)));
            GoodDataService.getByIds(goodIds, setSearchGoods);
        }

    }, [allPublishedGoods, searchString]);

    return (
        <Box pt={3} pb={8}>
            <SearchInput searchString={searchString} />
            <Box mt={3}>
                <CardList
                    title={`搜尋:${searchString}`}
                    goods={searchGoods}
                />
            </Box>
        </Box>
    );
}