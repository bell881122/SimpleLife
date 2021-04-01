import React from 'react';
import { Link as RouterLink } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import GoodDataService from "services/good.service";
const AddGoodBotton = React.lazy(() => import('tools/AddGoodBotton.tool.jsx'));
const Card = React.lazy(() => import('components/Card/Card.component.jsx'));

export default function UserGoods() {
    const [goods, setGoods] = React.useState();
    const [currentMemberContext] = React.useContext(CurrentMemberContext);

    React.useEffect(() => {
        if (currentMemberContext) {
            GoodDataService.query("memberId", "==", currentMemberContext.uid, ["registerTimestamp", "desc"], setGoods);
        }
    }, [currentMemberContext]);

    return (
        <>
            { goods ?
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={4} md={3}>
                        <Box height={1} display="flex" justifyContent="center" alignItems="center">
                            <AddGoodBotton />
                        </Box>
                    </Grid>
                    {goods && goods.map((good, index) => (
                        <Grid item key={index} xs={6} sm={4} md={3}>
                            <RouterLink
                                basename="/good"
                                to={`/good/${good.id}`}
                                display="block"
                            >
                                <Card good={good} />
                            </RouterLink>
                        </Grid>
                    ))}
                </Grid>
                :
                <h3> 趕快來刊登物品吧！</h3>
            }
        </>
    );
}