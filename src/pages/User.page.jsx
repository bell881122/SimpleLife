import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

let imgUrl = "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"

const useStyles = makeStyles((theme) => ({
    heroContent: {
        // backgroundColor: theme.palette.background.paper,
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        padding: theme.spacing(8, 0, 6),
    },
    avatar: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        marginBottom: theme.spacing(3)
    },
}));

export default function User() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Box display="flex" justifyContent="center">
                    <Avatar alt="User Photo" src="https://i.imgur.com/Wpsd0Nk.jpg" className={classes.avatar} />
                    </Box>
                    <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                        笑笑Emi
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        每天一點點，邁向簡單幸福生活。
                    </Typography>
                </Container>
            </div>
        </>
    );
}