import React from 'react';
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const CardDetail = React.lazy(() => import('components/Card/CardDetail.component.jsx'));
const Card = React.lazy(() => import('components/Card/Card.component.jsx'));

const useStyles = makeStyles((theme) => ({
    textDecorationNone: {
        textDecoration: 'none',
    },
}));

export default function CardList(props) {
    const { goods, title } = props;
    const [showDetail, setShowDetail] = React.useState(false);
    const classes = useStyles();

    const handleChange = () => {
        setShowDetail(!showDetail);
    };

    return (
        <>
            <Box display="flex" mb={1}>
                {title &&
                    <Typography variant="h5" component="h2" mb={5}>
                        {title}
                    </Typography>
                }
                <FormControlLabel
                    display="block" style={{ marginLeft: "auto" }}
                    control={
                        <Switch
                            checked={showDetail}
                            onChange={handleChange}
                            name="showDetail"
                            color="primary"
                        />
                    }
                    label="顯示詳情"
                />
            </Box>
            <Grid container spacing={2}>
                {goods && goods.map((good, index) => (
                    <Grid item key={index} xs={6} sm={4} md={3}>
                        <RouterLink
                            basename="/good"
                            to={`/good/${good.id}`}
                            display="block"
                            className={classes.textDecorationNone}
                        >
                            {showDetail ?
                                <CardDetail good={good} />
                                :
                                <Card good={good} />
                            }
                        </RouterLink>
                    </Grid>
                ))}
            </Grid>
        </ >
    );
}