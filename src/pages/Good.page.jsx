import React from 'react';
import { useParams } from "react-router-dom";

import GoodDataService from "services/good.service";
const GoodDetail = React.lazy(() => import('components/Good/GoodDetail.component.jsx'));

export default function Good() {
    let { id } = useParams();

    const [good, setGood] = React.useState();

    React.useEffect(() => {
        if (id !== "") {
            GoodDataService.getById(id, setGood);
        }
    }, [id]);

    return (
        <>
            {good &&
                <GoodDetail good={good} />
            }
        </>
    );
}