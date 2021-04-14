import React from 'react';
import { Link as RouterLink } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const AddGoodButton = React.lazy(() => import('tools/AddGoodButton.tool.jsx'));
const Card = React.lazy(() => import('components/Card/Card.component.jsx'));

export default function UserGoods(props) {
    const { goods, goodsCount } = props;

    return (
        <>
            <Grid container spacing={2}>
                {goodsCount <= 50 &&
                    <Grid item xs={6} sm={4} md={3}>
                        <Box height={1} display="flex" justifyContent="center" alignItems="center">
                            <AddGoodButton />
                        </Box>
                    </Grid>
                }
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
        </>
    );
}