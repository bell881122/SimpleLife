import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    btnBackground: {
        opacity: 0.25,
        backgroundColor: '#ffffff',
    },
    btnStyle: {
        color: '#000000',
    }
}));

export default function GoBackBotton() {
    const classes = useStyles();

    let history = useHistory();
    const goBack = () => {
        history.goBack()
    }

    return (
        <Box className={classes.btnBackground}>
            <Button onClick={goBack} className={classes.btnStyle}>
                <ArrowBackIcon />
            </Button>
        </Box>
    );
}