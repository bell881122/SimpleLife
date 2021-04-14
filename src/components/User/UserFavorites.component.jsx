import React from 'react';
import { Link as RouterLink } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

const Card = React.lazy(() => import('components/Card/Card.component.jsx'));

export default function UserFavorites(props) {
    const { goods } = props;

    return (
        <Grid container spacing={2}>
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
    );
}