import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    btnBackground: {
        opacity: 1,
    },
    btnStyle: {
        color: '#000000',
    }
}));

export default function AddGoodBotton() {
    const classes = useStyles();

    let history = useHistory();
    const goBack = () => {
        history.push("good/add")
    }

    return (
        <Box className={classes.btnBackground}>
            <Button onClick={goBack} className={classes.btnStyle}>
                <AddCircleIcon style={{ fontSize: 50}}/>
            </Button>
        </Box>
    );
}