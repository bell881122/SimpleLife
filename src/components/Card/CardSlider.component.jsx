import React from 'react';
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import { primaryColor } from "material-ui/custom.js";

const Card = React.lazy(() => import('components/Card/Card.component.jsx'));

const useStyles = makeStyles((theme) => ({
    textDecorationNone: {
        textDecoration: 'none',
    },
}));

export default function CardSlider(props) {
    const { goods, title } = props;
    const classes = useStyles();
    const theme = useTheme();
    const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));
    const matchesMedium = useMediaQuery(theme.breakpoints.up('md'));
    const [startIndex, setStartIndex] = React.useState(0);
    const [endIndex, setEndIndex] = React.useState(2);
    const [goodList, setGoodList] = React.useState(goods.slice(startIndex, endIndex));

    React.useEffect(() => {
        setGoodList(goods.slice(startIndex, endIndex))
    }, [goods, startIndex, endIndex]);

    React.useEffect(() => {
        setEndIndex(matchesMedium ? startIndex + 4 : matchesSmall ? startIndex + 3 : startIndex + 2)
    }, [startIndex, setEndIndex, matchesSmall, matchesMedium]);

    const clickLeftButton = () => {
        setStartIndex(state => state - 1)
        setEndIndex(state => state - 1)
    }

    const clickRightButton = () => {
        setStartIndex(state => state + 1)
        setEndIndex(state => state + 1)
    }

    return (
        <Box position="relative">
            <Box display="flex" mb={1}>
                {title &&
                    <Typography variant="h5" component="h2" mb={5}>
                        {title}
                    </Typography>
                }
            </Box>
            <Grid container spacing={2}>
                {goodList && goodList.map((good, index) => (
                    <Grid item key={index} xs={6} sm={4} md={3}>
                        <RouterLink
                            basename="/good"
                            to={`/good/${good.id}`}
                            display="block"
                            className={classes.textDecorationNone}
                        >
                            <Card good={good} />
                        </RouterLink>
                    </Grid>
                ))}
            </Grid>
            {['left', 'right'].map((item, index) => (
                <Box position="absolute" key={index}
                    style={{
                        top: '50%',
                        left: item === 'left' ? '-10px' : '',
                        right: item === 'right' ? '-10px' : '',
                        opacity: item === 'left' ?
                            startIndex === 0 ? 0.3 : 0.8 :
                            endIndex === goods.length ? 0.3 : 0.8
                    }}>
                    <IconButton
                        aria-label={item === 'left' ? "LeftIconButton" : "RightIconButton"}
                        style={{
                            color: 'white',
                            backgroundColor: primaryColor,
                            padding: '4px',
                        }}
                        onClick={() => item === 'left' ? clickLeftButton() : clickRightButton()}
                        disabled={item === 'left' ? startIndex === 0 : endIndex === goods.length}
                    >{item === 'left' ?
                        <ChevronLeftRoundedIcon /> :
                        <ChevronRightRoundedIcon />
                        }</IconButton>
                </Box>
            ))}
        </Box >
    );
}