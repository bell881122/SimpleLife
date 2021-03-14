import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',// theme.spacing(18),
        position: 'relative',
    },
    image: good => ({
        // [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        paddingBottom: '100%',
        // },
        backgroundImage: good.imgURL !== undefined ? `url(${good.imgURL})` : "",
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    }),
}));

export default function Card(props) {
    const { good } = props;

    let classes = useStyles(good);

    return (
        <>
            {good &&
                <Box className={classes.root}>
                    <Paper 
                        className={classes.image}
                        elevation={1}
                    />
                </Box>
            }
        </>
    );
}